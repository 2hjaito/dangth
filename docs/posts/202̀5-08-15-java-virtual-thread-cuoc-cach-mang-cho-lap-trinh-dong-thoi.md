---
layout: Post
title: Java Virtual Thread - Cuộc cách mạng cho lập trình đồng thời
subtitle: Đa luồng trong Java
author: Trần Hữu Đang
date: "2025-08-15"
image: /images/post/2024-04-11-laravel-socketio/1.png
tags:
  - Lập trình
  - Lịch sử công nghệ
  - Java
published: false

---


# Java Virtual Thread: Cuộc cách mạng cho lập trình đồng thời

Bạn đã bao giờ viết một ứng dụng xử lý hàng ngàn request cùng lúc, và cảm thấy như mình đang *chiến đấu với chính Java*?


Bạn từng dùng ThreadPoolExecutor và vắt óc cân chỉnh số lượng thread cho "vừa đủ dùng", tránh thiếu nhưng cũng không dám dư vì sợ *OutOfMemoryError*?

Bạn từng nhăn mặt khi phải viết những dòng code callback chằng chịt, chỉ để tránh block một luồng? Và rồi đau đầu gỡ bug vì stacktrace rối như tơ vò?

Nếu câu trả lời là "có", thì bạn không đơn độc. Và bạn cũng sắp có một giải pháp: Virtual Thread – một trong những bước nhảy vọt quan trọng nhất của Java trong thập kỷ qua.

Ra mắt như một phần của Project Loom, virtual thread mở ra một cách tiếp cận hoàn toàn mới: viết code đồng bộ như bình thường, nhưng hiệu năng gần như bất đồng bộ. Không còn callback hell, không cần reactive framework phức tạp, và đặc biệt là, bạn có thể tạo hàng triệu luồng mà JVM vẫn mỉm cười nhẹ nhàng.

Trong bài viết này, chúng ta sẽ khám phá:
- Virtual thread là gì và tại sao nó thay đổi cuộc chơi?
- Cách JVM "ảo thuật" để luồng block không còn tốn kém.
- Những khác biệt then chốt giữa virtual thread và platform thread.
- Khi nào nên dùng virtual thread, và những tình huống cần cân nhắc.
- Một số ví dụ thực tế: từ lý thuyết đến performance thực chiến.

> Virtual thread không chỉ là một cải tiến về kỹ thuật, nó là lời tuyên bố: Java vẫn chưa già, và vẫn có thể hiện đại hóa một cách mạnh mẽ.

## 1. Thời tiền sử trước Virtual Thread: Platform Thread và giải pháp nửa vời
Trước khi Virtual Thread ra đời, Java đã có một hành trình dài loay hoay với bài toán xử lý đồng thời. Những gì chúng ta gọi là “platform thread” thực chất là một lớp bọc (wrapper) giữa JVM và OS thread – thứ sinh ra không phải để tạo ra hàng triệu luồng.

Trong phần này, chúng ta sẽ cùng nhìn lại các vấn đề đặc trưng của Platform Thread, và các giải pháp trước đây đã cố gắng khắc phục nó: thread pool, callback, reactive programming, ...

### 1.1. Platform Thread – Cách mà JVM làm việc với hệ điều hành
Trước khi bước vào thế giới của Virtual Thread, hãy dành chút thời gian để nhìn lại cách Java truyền thống xử lý luồng – thứ mà chúng ta gọi là Platform Thread.

![]

Hnhf 1

Hình minh họa trên cho thấy cấu trúc hoạt động của Platform Thread qua 3 tầng:
- JVM Layer: Mỗi Thread bạn tạo ra trong Java là một Platform Thread. JVM sẽ tạo một stack riêng cho từng thread và điều phối nó.
- OS Layer: JVM ánh xạ 1:1 các Platform Thread với các native OS thread (dùng pthread trên Linux hoặc CreateThread trên Windows).
- CPU Layer: Hệ điều hành sẽ lên lịch (schedule) các OS thread này chạy trên các CPU core thực sự.

**Tại sao lại gọi là "Platform" Thread?**

Bởi vì mỗi java.lang.Thread sẽ được nền tảng hệ điều hành (platform) cung cấp tài nguyên — bạn tạo một thread trong Java, và JVM phải “nhờ” OS cấp cho bạn một thread thực sự.
Điều này kéo theo một vài hệ quả sau:

### 1.2. Vấn đề 1: Thread quá "nặng"
Mỗi thread trong Java (platform thread) là một OS thread, điều đó có nghĩa là:
- Tạo thread tốn chi phí vì JVM phải gọi native API để khởi tạo một OS thread.
- Nếu bạn tạo 100.000 threads, bạn đang yêu cầu JVM sử dụng... 100GB RAM chỉ để giữ stack, nghe thôi đã thấy đốt tiền rồi :>

Mỗi thread chiếm `~ 1MB` bộ nhớ stack.

📷 Hình 2

⇒ Và rõ ràng điều này không khả thi. Vì thế lập trình viên buộc phải dùng thread pool, và bắt đầu bước vào mê cung của các `ExecutorService`, `RejectedExecutionHandler`, `ThreadFactory`, ...

- **Việc tạo thread tốn chi phí**: Cần hệ điều hành cấp phát stack memory, context switching, register state, kernel resource...
- **Quản lý thread số lượng lớn không hiệu quả**: Khi bạn muốn xử lý 1 triệu request đồng thời? Không thể nào tạo 1 triệu OS thread!
- **Bài toán blocking càng nghiêm trọng hơn**: Nếu thread đó bị block do I/O (gọi HTTP, đọc DB...), OS thread đó vẫn bị chiếm dụng, lãng phí tài nguyên.

### 1.3. Vấn đề 2: Blocking là “thảm họa”

Java sinh ra để viết code đồng bộ (synchronous), nên bạn viết thế này:
```java
String result = repository.fetchDataFromDB(query); // block
```
Câu lệnh đơn giản, dễ hiểu. Nhưng lại block cả OS thread!

⇒ Nghĩa là: Trong thời gian chờ DB phản hồi, 1MB RAM + 1 OS thread hoàn toàn vô dụng.
Nếu bạn có hàng ngàn request đến một lúc, và mỗi cái block vài trăm mili giây, bạn sẽ sớm cạn tài nguyên.

📷 Hình 3

### 1.4. Vấn đề 3: Reactive programming không dễ nuốt

Giải pháp để tránh blocking là gì?

Chuyển sang dùng các mô hình bất đồng bộ như:
- Callback Hell (CompletableFuture, ListenableFuture)
- Reactive Stack: Spring WebFlux, Reactor, RxJava...

*Các giải pháp trước Virtual Thread: Callback Hell và WebFlux*

Khi các lập trình viên Java phải đối mặt với giới hạn của Platform Thread, họ buộc phải tìm cách né tránh blocking I/O bằng những kỹ thuật bất đồng bộ. Hai trong số đó là:

#### 1.4.1. Callback Hell – "Địa ngục lồng nhau"
Callback là kỹ thuật phổ biến để xử lý bất đồng bộ: bạn truyền một hàm (callback) để thực thi khi một tác vụ kết thúc. Giả sử bạn cần thực hiện 3 tác vụ bất đồng bộ theo chuỗi: gọi API, đọc file, rồi ghi vào DB. Với callback, bạn sẽ viết như sau:

```java
callApi(url, response -> {
    readFile(response.getFilePath(), content -> {
        saveToDb(content, result -> {
            System.out.println("All done!");
        });
    });
});
```

Nghe có vẻ ổn, nhưng:
- Code lồng nhau như bánh chưng nhiều lớp.
- **Khó đọc, khó maintain, và khó test.**
- Debug dòng nào chạy trước, lỗi ở đâu — rất mệt mỏi.
Đây chính là thứ mà dân lập trình gọi là Callback Hell.

#### 1.4.2. Spring WebFlux – Reactive Programming
Spring WebFlux ra đời để giải quyết bài toán này bằng mô hình Reactive, sử dụng Mono và Flux thay cho callback lồng nhau. Mục tiêu là: không block thread, dùng ít thread để phục vụ hàng chục ngàn request. Ví dụ khi viết một controller với WebFlux: `@GetMapping("/users/{id}")`

```java
public Mono<User> getUser(@PathVariable String id) {
    return userService.findById(id)
            .flatMap(user -> enrichUser(user))
            .flatMap(enrichedUser -> validateUser(enrichedUser));
}
```


Mọi thứ trông có vẻ đẹp hơn, không còn lồng callback. Nhưng vấn đề là:
- Mặc dù code gần giống code tuần tự, nhưng thật ra nó là flow bất đồng bộ. Log không chạy theo thứ tự như bạn nghĩ.
- Khi cần trace lỗi, bạn sẽ gặp những dòng stacktrace dài dằng dặc đến từ Reactor Core.
- Dùng Thread.currentThread().getName() để log thread hiện tại sẽ luôn thấy "reactor-http-nio-xxx", nên khó biết request nào đang làm gì.
- **Debug trong IDE khó**: không đặt được breakpoint như mong muốn, hoặc không biết nó chạy ở đâu, khi nào.

Nếu bạn đang dùng WebFlux hoặc callback để tránh block thì Virtual Thread như một hơi thở mới: vẫn code tuần tự, vẫn gọi API, vẫn sleep, nhưng không sợ “đốt” tài nguyên thread như trước nữa.

Nhưng đi kèm với nó là:
- Code phức tạp, khó đọc.
- Stacktrace không còn rõ ràng.
- Debugging gần như là cực hình.
- Dễ leak memory hoặc bỏ sót xử lý lỗi nếu bạn không kiểm soát tốt luồng dữ liệu.

Nhiều người ví von: *"Bạn không học reactive, bạn học cách sinh tồn trong reactor."*

### 1.5. Đã đến lúc cần một lối thoát
Lập trình viên Java cần một cách:
- Viết code đồng bộ, tuyến tính như cũ.
- Nhưng chạy hiệu quả, không blocking như async.
Đó chính là lúc Virtual Thread xuất hiện – *lightweight threads that reduce the effort of writing, maintaining, and debugging high-throughput concurrent applications.*

## 2. Virtual thread là gì và tại sao nó thay đổi cuộc chơi?

Được thử nghiệm từ Java 19 và release chính thức trong phiên bản Java 21 vào tháng 9 năm 2023, Virtual thread được Oracle giới thiệu là 1 kiểu thread lightweight, được thiết kế để giảm chi phí tài nguyên và tăng khả năng mở rộng cho các ứng dụng xử lý concurrent.
> ![TIPS] “Virtual threads are lightweight threads that reduce the effort of writing, maintaining, and debugging high-throughput concurrent applications.”

Sau khi đã lăn lộn với platform thread và đủ mọi chiêu trò để scale ứng dụng – từ thread pool, async callback, reactive programming... cuối cùng Java mang đến một món quà: Virtual Thread.

Nhìn vào kiến trúc dưới đây, bạn sẽ thấy sự khác biệt:
📷 Hình 4

So với, mô hình platform thread, sự khác biệt lớn nhất là: Virtual thread không gắn chặt với OS thread. Thay vào đó, JVM có một lớp trung gian gọi là Carrier Thread – những thread thật sự từ OS, nhưng dùng để xử lý các virtual thread khi chúng cần chạy. **Khi một virtual thread block (ví dụ chờ I/O, sleep, …), nó sẽ "unmount", nhường lại carrier cho luồng khác.**

### 2.1. Vậy chuyện gì đang diễn ra?

Khi bạn gọi Thread.start() (với thread được tạo bằng API virtual thread), JVM không nhảy ngay vào kernel để tạo thread thật như trước đây. Thay vào đó, chuỗi sự kiện sau diễn ra:

#### 2.1.1. Tạo Virtual Thread – Một object nhẹ nằm trong heap
Virtual Thread đơn giản là một object trong Java heap – không ánh xạ trực tiếp đến native thread. Nó chứa các thông tin về logic thực thi (runnable), trạng thái và đặc biệt là một Continuation – đối tượng đại diện cho luồng thực thi tạm hoãn.

Lần đầu tiên bạn tạo Virtual Thread, JVM sẽ khởi tạo một ForkJoinPool đặc biệt, gọi là VirtualThreadScheduler, chứa một số Carrier Threads – chính là các Platform Thread phục vụ việc chạy các virtual thread.

>[!TIPS] Mặc định, số lượng carrier thread bằng số core CPU.

#### 2.1.2. Scheduling: Không chạy ngay – xếp hàng đã

Virtual Thread được thêm vào một queue đợi trong scheduler. Nếu có một carrier thread rảnh, JVM sẽ "gắn" (mount) virtual thread này lên carrier thread đó để chạy.

#### 2.1.3. Mounting: Virtual thread chạy and carrier thread
Khi virtual thread được mount, nghĩa là đoạn mã bạn truyền vào Runnable sẽ được chạy trên stack của carrier thread – giống như một thread bình thường.
Tuy nhiên, điểm đặc biệt là JVM có thể tạm dừng và phục hồi việc thực thi virtual thread bất kỳ lúc nào, nhờ vào continuation – cơ chế ghi lại “điểm dừng” để resume lại sau.

#### 2.1.4. Blocking: Virtual thread bị unmount
Khi virtual thread thực hiện các thao tác blocking như:
- Thread.sleep()
- Gọi I/O blocking (như `InputStream.read()`)
- Chờ Lock, Semaphore,...
JVM sẽ:
- Ngắt việc chạy virtual thread.
- Gỡ nó khỏi carrier thread (unmount).
- Lưu lại trạng thái thực thi (program counter, stack frame, ...) vào continuation nằm trong heap.

Carrier thread lúc này không bị block mà quay trở lại chạy virtual thread khác đang chờ.

#### 2.1.5. Khi ready, mount lại và tiếp tục chạy
Khi blocking operation hoàn tất (ví dụ I/O trả kết quả), virtual thread sẽ được scheduler gắn trở lại vào một carrier thread và tiếp tục thực thi từ điểm đã dừng, như chưa có gì xảy ra.
Và đặc biệt hơn: virtual thread không cần bạn thay đổi code theo reactive hay async style rối rắm. Bạn vẫn viết code theo phong cách blocking truyền thống, nhưng JVM sẽ lo phần tối ưu.

### 2.2. Những cái Wow nhận được
Sau khi đi qua cách virtual thread hoạt động – từ lúc được tạo, mount vào carrier thread, đến lúc unmount khi blocking – có lẽ bạn đã phần nào hình dung được cơ chế đằng sau sự “nhẹ nhàng” của nó. Nhưng điều khiến virtual thread trở nên thực sự đáng giá lại nằm ở những lợi ích rất rõ ràng mà nó mang lại cho lập trình viên Java.

Không phải là một cải tiến nửa vời. Đây là những “wow” đủ khiến ta phải nhìn lại cách mình viết code song song trước giờ:
- **Không chiếm OS resource cố định:** Virtual thread không ánh xạ 1:1 với native thread. Vì thế, hệ điều hành không phải quản lý hàng triệu thread – điều mà trước đây là bất khả thi. Thread có thể chờ đợi (blocking) một cách tự nhiên – gọi sleep(), readLine(), lock() – nhưng nhờ vào cơ chế unmount, nó không chiếm CPU thật. Trong khi đó, carrier thread có thể chạy tiếp các luồng khác.
- **Tạo/Huỷ dễ dàng:** Một trong những lợi thế lớn nhất của virtual thread là chi phí tạo và huỷ cực thấp. Trong khi platform thread (OS thread) yêu cầu hệ điều hành cấp phát tài nguyên (như stack size ~1MB mỗi thread), virtual thread chỉ là một đối tượng nhẹ trong heap (chỉ vài KB cho mỗi thread). Và khi sử dụng xong, việc huỷ nó cũng đơn giản như để GC làm phần việc còn lại.
- **Không cần context switch nặng nề dưới kernel:** JVM tự xử lý việc chuyển trạng thái trong user-space, thay vì nhờ tới kernel như platform thread. Việc này nhẹ hơn rất nhiều: không cần phải lưu/khôi phục các thanh ghi CPU, stack pointer hay cache của kernel.
- **Có thể scale tới hàng triệu thread:** Mỗi virtual thread chỉ là một object nhẹ trong heap – không có stack riêng 1MB như OS thread, không yêu cầu kernel cấp phát tài nguyên ngay từ khi sinh ra.
- **Gỡ bỏ nỗi ám ảnh đa luồng:** Trước khi virtual thread ra đời, Java trong nhiều năm qua đã hình thành nên nhiều kỹ thuật nhằm tránh sử dụng quá nhiều thread, chẳng hạn như asynchronous callback, non-blocking I/O, reactive programming,… Những kỹ thuật này tuy hiệu quả về mặt tài nguyên, nhưng rất khó đọc, debug, và maintain. Với virtual thread, chúng ta có thể trở lại với cách viết code truyền thống: đồng bộ, tuần tự, dễ hiểu, nhưng vẫn đạt được khả năng xử lý hàng nghìn, thậm chí hàng triệu tác vụ song song. Virtual thread thực chất chỉ là một cách triển khai mới của java.lang.Thread và vẫn tuân theo các quy tắc đã có từ Java SE 1.0. Điều đó có nghĩa là lập trình viên không cần học thêm bất kỳ khái niệm mới nào để bắt đầu sử dụng virtual thread, bạn vẫn làm việc với Thread, Runnable, synchronized, wait/notify,... như trước đây.

Tất cả những điều này mở ra khả năng mới cho các hệ thống server Java – nơi mà trước đây việc tạo nhiều thread thường đi kèm với những nỗi lo rất… “thời cổ điển”.
Lý thuyết thì kha khá rồi đấy, nhưng mà nói mồm thôi thì ai tin đúng không, nên mình sẽ chạy một đoạn code demo để so sánh sự khác biệt giữa platform thread và virtual thread nhé

#### 2.2.1. Kịch bản: Tạo 10.000 thread và thực hiện call http request (tác vụ IO)
*Yêu cầu: Java 21 trở lên và bật --enable-preview nếu bạn dùng JDK 21.*

```java
package com.example.virtualthread;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.CountDownLatch;

public class VirtualVsPlatformThreadWithIOBound {

    private static final int THREAD_COUNT = 1000;
    private static final String TEST_URL = "<https://postman-echo.com/delay/1>"; // Delay 1s

    public static void main(String[] args) throws InterruptedException {
        System.out.println("--- Platform Threads Demo ---");
        runWithThreads(false);

        System.out.println("\\n--- Virtual Threads Demo ---");
        runWithThreads(true);
    }

    private static void runWithThreads(boolean useVirtualThread) throws InterruptedException {
        Thread[] threads = new Thread[THREAD_COUNT];
        CountDownLatch readyLatch = new CountDownLatch(THREAD_COUNT);
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch doneLatch = new CountDownLatch(THREAD_COUNT);

        Runnable task = () -> {
            try {
                readyLatch.countDown();
                startLatch.await(); // Đợi tín hiệu bắt đầu đồng loạt

                performHttpRequest();

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                doneLatch.countDown();
            }
        };

        for (int i = 0; i < THREAD_COUNT; i++) {
            threads[i] = useVirtualThread
                    ? Thread.ofVirtual().unstarted(task)
                    : new Thread(task);
        }

        for (Thread thread : threads) {
            thread.start();
        }

        readyLatch.await(); // Chờ đến khi tất cả thread đều đã sẵn sàng
        long start = System.currentTimeMillis();
        startLatch.countDown(); // Bắt đầu đồng loạt
        doneLatch.await(); // Chờ đến khi tất cả task hoàn thành
        long end = System.currentTimeMillis();

        System.out.println((useVirtualThread ? "Virtual" : "Platform") +
                " threads total time: " + (end - start) + " ms");
    }

    private static void performHttpRequest() {
        try {
            URL url = new URL(TEST_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()))) {
                while (in.readLine() != null) {
                    // Đọc để đảm bảo I/O thật sự diễn ra
                }
            }

        } catch (Exception e) {
            System.err.println("Request failed: " + e.getMessage());
        }
    }
}
```

Kết quả là:
- Trường hợp sử dụng platform thread, đoạn code đã bắn lỗi java.lang.OutOfMemoryError trước khi kịp chạy xong. Bởi vì bản chất platform thread là wrapper giữa JVM và native OS thread, mà OS thread thì… không hề nhẹ.
- Trường hợp sử dụng virtual thread, dù tạo đến 10.000 virtual thread, chương trình vẫn chạy xong chỉ sau khoảng 1 giây, gần bằng thời gian Thread.sleep() – và không hề gây áp lực lên bộ nhớ hay CPU. Lý do rất đơn giản:Virtual thread không giữ một native thread riêng, mà chỉ được mount với carrier thread khi thực thi.
Khi gặp Thread.sleep(), virtual thread được unmount, nhường chỗ cho luồng khác, và sau đó được mount trở lại khi cần.

📷 Hình 4

Và nếu bạn để ý, như mình đã đề cập số native thread mặc định bằng số core mà máy có nên ở đây, mình đang có 10 woker tương ứng với 10 core của máy.

### 2.3. Liệu Virtual Thread có thể thay thế hoàn toàn Platform Thread?
Sau khi chứng kiến những ưu điểm vượt trội mà virtual thread mang lại trong các tác vụ I/O – đơn giản hóa code, tiết kiệm tài nguyên, scale thoải mái mà không lo OOM – nhiều người sẽ đặt ra câu hỏi: Liệu virtual thread có thể thay thế được platform thread trong mọi trường hợp?
Câu trả lời là: **không hẳn.**
Virtual thread được thiết kế để **tối ưu cho các tác vụ blocking I/O** – nơi luồng có thể tạm ngừng và nhường lại tài nguyên cho luồng khác. Nhưng trong thế giới **CPU-bound, nơi các tác vụ phải sử dụng liên tục để tính toán, thì lợi thế này gần như biến mất.**
Lúc này, cả virtual thread và platform thread đều cần phải trực tiếp cạnh tranh thời gian CPU, và vì JVM vẫn cần OS thread để thực thi các tác vụ tính toán, việc tạo ra hàng ngàn virtual thread có thể **khiến hệ thống scheduler bị quá tải**, dẫn tới hiệu năng không cải thiện – thậm chí còn tệ hơn.
Hãy cùng nhìn vào một ví dụ so sánh giữa hai loại thread khi thực hiện cùng một khối lượng công việc tính toán.

```java
package com.example.virtualthread;

import java.util.concurrent.CountDownLatch;

public class VirtualVsPlatformThreadCPU {
    private static final int THREAD_COUNT = 2000; // thử với 100, rồi nâng lên 500, 1000

    public static void main(String[] args) throws InterruptedException {
        System.out.println("\\n--- Virtual Threads Demo ---");
        runWithThreads(true);
        System.out.println("--- Platform Threads Demo ---");
        runWithThreads(false);
    }

    private static void runWithThreads(boolean useVirtualThread) throws InterruptedException {
        Thread[] threads = new Thread[THREAD_COUNT];
        CountDownLatch readyLatch = new CountDownLatch(THREAD_COUNT);
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch doneLatch = new CountDownLatch(THREAD_COUNT);

        Runnable task = () -> {
            try {
                readyLatch.countDown();
                startLatch.await();
                performCpuIntensiveTask();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                doneLatch.countDown();
            }
        };

        for (int i = 0; i < THREAD_COUNT; i++) {
            threads[i] = useVirtualThread
                    ? Thread.ofVirtual().unstarted(task)
                    : new Thread(task);
        }

        for (Thread thread : threads) {
            thread.start();
        }

        readyLatch.await();
        long start = System.currentTimeMillis();
        startLatch.countDown();
        doneLatch.await();
        long end = System.currentTimeMillis();

        System.out.println((useVirtualThread ? "Virtual" : "Platform") +
                " threads total time: " + (end - start) + " ms");
    }

    private static void performCpuIntensiveTask() {
        long count = 0;
        for (int i = 2; i < 100_000; i++) {
            if (isPrime(i)) count++;
        };
    }

    private static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}
```

Trong đoạn code trên, ta sẽ lần lượt benmark với THREAD_COUNT = 100, 500, 2000 và dứới đây là bảng kết quả:

📷 Hình 5

Có thể thấy dù virtual thread được thiết kế để “nhẹ” hơn platform thread, nhưng trong các tác vụ CPU-bound, sự khác biệt về hiệu năng giữa chúng là không đáng kể, thậm chí virtual thread còn có thể thua kém hơn khi chúng ta tăng số lượng thread lên.

**Nguyên nhân không nằm ở thread, mà là ở CPU.**

Mỗi tác vụ CPU-bound (như tính toán số nguyên tố) cần được CPU thực thi trực tiếp. Quay lại với sơ đồ hình 2.1, dù bạn tạo ra hàng triệu thread, thì nếu máy bạn chỉ có 4 core, tại một thời điểm, chỉ có 4 task được chạy thực sự. Thread chỉ là đơn vị quản lý luồng logic — để đạt được concurrency (tính đồng thời). Nhưng parallelism (tính song song) thì giới hạn bởi số lượng CPU core. Trong khi platform thread được quản lý bởi OS, OS scheduler có khả năng tối ưu việc phân phối thread đến CPU core, với ít overhead. Thì Virtual thread lại do JVM scheduler điều phối, nên phải thực hiện thêm các thao tác mounted/unmounted tới một carrier thread (OS thread). Việc mount/unmount này tạo thêm overhead trong môi trường có nhiều task tính toán liên tục và dẫn đến việc càng nhiều virtual thread được tạo, gánh nặng điều phối cũng sẽ tăng lên gây ảnh hưởng đến performance của hệ thống.

📷 Hình 6

## 3. Best practice
*Virtual thread không phải là "silver bullet”*

Virtual thread là một cuộc cách mạng cho lập trình đồng thời I/O-bound, nhưng không phải là phép màu cho mọi loại workload.

Nó mở ra một cách tiếp cận mới trong lập trình đồng thời: đơn giản hơn, dễ đọc hơn, và cực kỳ tiết kiệm tài nguyên. Tuy nhiên, virtual thread không giải quyết được mọi vấn đề, và đặc biệt không phải là giải pháp tối ưu trong mọi tình huống. Vậy thì khi nào nên dùng và không nên dùng virtual thread, cũng như dùng virtual thread như thế nào để đạt được kết quả tốt nhất?

Dưới đây là một số kinh nghiệm của mình để sử dụng virtual thread hiệu quả và để bạn không biến nó thành “con dao hai lưỡi”.

### 3.1. IO-bound or CPU-bound
Virtual thread thực sự tỏa sáng trong các ứng dụng IO-bound, nơi tác vụ chủ yếu là chờ phản hồi từ mạng, database, hoặc hệ thống file. Trong những trường hợp này, thread dành phần lớn thời gian để "ngồi chơi", và virtual thread giúp bạn có thể tạo hàng chục nghìn thread để xử lý song song mà không tốn nhiều tài nguyên.

Ngược lại, nếu ứng dụng của bạn chủ yếu là CPU-bound, nghĩa là nặng về xử lý tính toán thì virtual thread sẽ không mang lại lợi ích rõ ràng. Bottleneck lúc này không còn là số lượng thread, mà là số lõi CPU. Dù bạn có tạo hàng ngàn virtual thread, chúng vẫn phải tranh nhau từng chu kỳ CPU, dẫn đến:
- Context switch tăng mạnh, do nhiều thread cùng cạnh tranh chạy trên ít CPU.
- Hiệu suất giảm, vì CPU mất thời gian để chuyển đổi giữa các task thay vì xử lý thực sự.
- Tổng thể hệ thống có thể còn chậm hơn so với chỉ dùng vài platform thread xử lý tuần tự.

### 3.2. Tránh dùng thread pool kiểu cũ (FixedThreadPool, CachedThreadPool)
Trước khi virtual thread được release ở Java 21, thread hay platform thread là tài nguyên quý giá, nên chúng ta phải tái sử dụng bằng cách dùng các thread pool như Executors.newFixedThreadPool() hoặc newCachedThreadPool() để:
- Giới hạn số lượng thread đang chạy.
- Giảm chi phí tạo và hủy thread.
Nhưng với virtual thread, những giả định cũ không còn đúng nữa.

```java
ExecutorService pool = Executors.newFixedThreadPool(100);
pool.submit(() -> {
    // blocking I/O here
});
```

Đây là cách xử lý thường thấy khi chúng ta sử dụng platform thread, tạo một thread pool với số thread ban đầu là 100 và tái sử dụng chúng. Nhưng việc giới hạn 100 thread trong pool vô tình tạo ra bottleneck cho hệ thống. Khi 100 task đang blocking I/O, các task còn lại phải chờ, dù virtual thread có thể chạy song song hàng chục ngàn cái. Thay vì tái sử dụng thread, hãy tạo một virtual thread cho mỗi task bằng cách dùng:

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<ResultA> f1 = executor.submit(task1);
    Future<ResultB> f2 = executor.submit(task2);
    // ...
}
```

Tại sao cách này tốt:
- Không có giới hạn cố định về số lượng thread.
- Không cần quản lý pool.
- Mỗi task có một thread riêng, không giành giật tài nguyên như trong pool truyền thống.
- Executor này rất nhẹ, bạn có thể tạo mới cho từng request hoặc từng nhóm task mà không lo chi phí.

### 3.3. Không trộn lẫn Virtual Thread với async-style code

Virtual thread được sinh ra để đơn giản hóa lập trình đồng thời bằng cách cho phép bạn viết code như viết từng bước tuần tự, mà vẫn đạt được khả năng chạy song song và không bị block platform thread.

Nhưng nếu bạn tiếp tục sử dụng những kỹ thuật async truyền thống như:
- CompletableFuture.thenApply(...)
- Reactive Stream (Mono, Flux, Observable…)
- Callback hell (callback(callback(callback(...))))

Thì bạn đang bỏ phí lợi ích lớn nhất của virtual thread,đó là trở lại với code đồng bộ dễ đọc, dễ debug, dễ maintain. Việc sử dụng async-style code với virtual thread là dư thừa, vì bản thân virtual thread đã xử lý vấn đề blocking cho bạn rồi.

## 4. Tổng kết
Virtual thread là một bước tiến thực sự đột phá trong của Java, nó mở ra khả năng xử lý hàng nghìn đến hàng triệu tác vụ đồng thời mà vẫn nhẹ nhàng, tiết kiệm tài nguyên.

Với virtual thread, bạn có thể viết code đồng bộ đơn giản theo kiểu truyền thống nhưng lại hiệu quả như asynchronous. Đặc biệt phù hợp cho các hệ thống:
- Web server high-concurrency.
- Dịch vụ backend nhiều I/O.
- Ứng dụng cần xử lý đồng thời mà không muốn vướng vào reactive hay callback hell.
Tuy nhiên, như Fred Brooks từng nói: "There are no silver bullets in software engineering."

Virtual thread không phải là đạn bạc cho mọi vấn đề. Với các tác vụ CPU-bound, thread pool truyền thống vẫn có chỗ đứng riêng – bởi CPU không thể "ảo hóa" như thread.

Hy vọng bài viết trên đã giúp bạn hình dung rõ hơn về virtual thread, không chỉ là một tính năng mới, mà là một cách tiếp cận mới cho lập trình đồng thời trong Java: dễ viết, dễ hiểu, dễ scale.

Và đừng quên thực hành bằng cách chạy thử những dòng code trong bài nhé.

Many thanks and happy reading!

Tham khảo từ [Ronin Engineer - Dev ơi mình đi đâu thế?](https://www.facebook.com/share/p/19jbyRSFkc/)