---
layout: Post
title: Java Virtual Thread - A Revolution for Concurrent Programming
slug: java-virtual-thread-cuoc-cach-mang-cho-lap-trinh-dong-thoi
subtitle: Multithreading in Java
author: Trần Hữu Đang
date: "2025-08-15"
image: /images/post/2024-04-11-laravel-socketio/1.png
tags:
  - Lập trình
  - Lịch sử công nghệ
  - Java
published: false

---


# Java Virtual Thread: A Revolution for Concurrent Programming

Have you ever written an application that handles thousands of requests at once, and felt like you were *fighting against Java itself*?


Have you ever used ThreadPoolExecutor and racked your brain tuning the thread count to be "just right" — avoiding too few, but not daring to go over for fear of an *OutOfMemoryError*?

Have you ever grimaced while writing tangled callback code, just to avoid blocking a single thread? And then had a headache debugging because the stacktrace was a tangled mess?

If your answer is "yes," you're not alone. And you're about to get a solution: Virtual Thread — one of the most important leaps forward for Java in the past decade.

Introduced as part of Project Loom, virtual threads open up a completely new approach: write synchronous code as usual, but get near-asynchronous performance. No more callback hell, no need for a complex reactive framework, and best of all, you can create millions of threads while the JVM keeps smiling calmly.

In this article, we'll explore:
- What is a virtual thread, and why does it change the game?
- How the JVM performs its "magic trick" so that a blocked thread is no longer expensive.
- The key differences between virtual threads and platform threads.
- When to use virtual threads, and situations that need careful consideration.
- A few real-world examples: from theory to real-world performance.

> Virtual thread isn't just a technical improvement — it's a statement: Java isn't old yet, and it can still modernize powerfully.

## 1. Prehistoric times before Virtual Thread: Platform Thread and half-measure solutions
Before Virtual Thread came along, Java had a long journey wrestling with the concurrency problem. What we call a "platform thread" is really just a wrapper between the JVM and an OS thread — something that was never designed to spawn millions of threads.

In this section, we'll look back at the characteristic problems of Platform Thread, and the solutions people tried before to work around it: thread pools, callbacks, reactive programming, ...

### 1.1. Platform Thread – How the JVM works with the operating system
Before stepping into the world of Virtual Thread, let's take a moment to look back at how traditional Java handles threading — what we call Platform Thread.

![]

Figure 1

The illustration above shows the Platform Thread architecture across 3 layers:
- JVM Layer: Every Thread you create in Java is a Platform Thread. The JVM creates a separate stack for each thread and schedules it.
- OS Layer: The JVM maps Platform Threads 1:1 to native OS threads (using pthread on Linux or CreateThread on Windows).
- CPU Layer: The operating system schedules these OS threads to run on the actual CPU cores.

**Why is it called a "Platform" Thread?**

Because every java.lang.Thread has its resources provided by the operating system (the platform) — you create a thread in Java, and the JVM has to "ask" the OS to give you a real thread.
This leads to a few consequences:

### 1.2. Problem 1: Threads are too "heavy"
Every thread in Java (a platform thread) is an OS thread, which means:
- Creating a thread is expensive because the JVM has to call a native API to spin up an OS thread.
- If you create 100,000 threads, you're asking the JVM to use... 100GB of RAM just to hold the stacks — just hearing that already feels like burning money :>

Each thread takes up `~1MB` of stack memory.

📷 Figure 2

⇒ And clearly this isn't feasible. So developers are forced to use thread pools, and start venturing into the maze of `ExecutorService`, `RejectedExecutionHandler`, `ThreadFactory`, ...

- **Creating a thread is expensive**: The operating system needs to allocate stack memory, do context switching, manage register state, kernel resources...
- **Managing large numbers of threads isn't efficient**: What if you want to handle 1 million concurrent requests? You can't possibly create 1 million OS threads!
- **The blocking problem gets even worse**: If a thread gets blocked by I/O (an HTTP call, reading from DB...), that OS thread is still occupied, wasting resources.

### 1.3. Problem 2: Blocking is a "disaster"

Java was born to write synchronous code, so you write something like:
```java
String result = repository.fetchDataFromDB(query); // block
```
A simple, easy-to-understand statement. But it blocks the entire OS thread!

⇒ Meaning: while waiting for the DB to respond, 1MB of RAM + 1 OS thread sits completely idle.
If you have thousands of requests arriving at once, each blocking for a few hundred milliseconds, you'll quickly run out of resources.

📷 Figure 3

### 1.4. Problem 3: Reactive programming isn't easy to swallow

What's the solution to avoid blocking?

Switch to asynchronous models like:
- Callback Hell (CompletableFuture, ListenableFuture)
- Reactive Stack: Spring WebFlux, Reactor, RxJava...

*Solutions before Virtual Thread: Callback Hell and WebFlux*

When Java developers hit the limits of Platform Thread, they were forced to find ways to dodge blocking I/O using asynchronous techniques. Two of these are:

#### 1.4.1. Callback Hell – "Nested hell"
Callbacks are a popular technique for handling asynchronous work: you pass in a function (a callback) to run once a task completes. Say you need to perform 3 asynchronous tasks in sequence: call an API, read a file, then write to the DB. With callbacks, you'd write it like this:

```java
callApi(url, response -> {
    readFile(response.getFilePath(), content -> {
        saveToDb(content, result -> {
            System.out.println("All done!");
        });
    });
});
```

Sounds fine, but:
- The code nests like a many-layered cake.
- **Hard to read, hard to maintain, and hard to test.**
- Debugging which line runs first, and where the error is — exhausting.
This is exactly what developers call Callback Hell.

#### 1.4.2. Spring WebFlux – Reactive Programming
Spring WebFlux was created to solve this problem with the Reactive model, using Mono and Flux instead of nested callbacks. The goal: don't block the thread, use fewer threads to serve tens of thousands of requests. For example, writing a controller with WebFlux: `@GetMapping("/users/{id}")`

```java
public Mono<User> getUser(@PathVariable String id) {
    return userService.findById(id)
            .flatMap(user -> enrichUser(user))
            .flatMap(enrichedUser -> validateUser(enrichedUser));
}
```


Everything looks nicer, no more nested callbacks. But the problem is:
- Although the code looks nearly sequential, it's actually an asynchronous flow. Logs don't run in the order you'd expect.
- When you need to trace an error, you'll run into extremely long stacktraces coming from Reactor Core.
- Using Thread.currentThread().getName() to log the current thread will always show "reactor-http-nio-xxx", making it hard to know which request is doing what.
- **Debugging in the IDE is hard**: you can't set breakpoints the way you'd want, or you don't know where or when it runs.

If you're using WebFlux or callbacks to avoid blocking, Virtual Thread feels like a breath of fresh air: you still write sequential code, still call APIs, still sleep, but without fearing you'll "burn" thread resources like before.

But along with it comes:
- Complex, hard-to-read code.
- Stacktraces that are no longer clear.
- Debugging that's almost torture.
- Easy memory leaks or missed error handling if you don't control the data flow well.

Many people put it this way: *"You don't learn reactive, you learn to survive inside the reactor."*

### 1.5. Time for a way out
Java developers need a way to:
- Write synchronous, linear code like before.
- But run efficiently, without blocking, like async.
That's exactly when Virtual Thread appears – *lightweight threads that reduce the effort of writing, maintaining, and debugging high-throughput concurrent applications.*

## 2. What is a virtual thread, and why does it change the game?

Trialed since Java 19 and officially released in Java 21 in September 2023, Virtual Thread is introduced by Oracle as a kind of lightweight thread, designed to reduce resource costs and increase scalability for concurrent applications.
> ![TIPS] “Virtual threads are lightweight threads that reduce the effort of writing, maintaining, and debugging high-throughput concurrent applications.”

After wrestling with platform threads and every trick in the book to scale applications — thread pools, async callbacks, reactive programming... Java finally brings us a gift: Virtual Thread.

Looking at the architecture below, you'll see the difference:
📷 Figure 4

Compared to the platform thread model, the biggest difference is: a virtual thread isn't tightly bound to an OS thread. Instead, the JVM has an intermediate layer called a Carrier Thread — real threads from the OS, but used to run virtual threads when they need to execute. **When a virtual thread blocks (e.g. waiting on I/O, sleeping, ...), it "unmounts," freeing up the carrier for another thread.**

### 2.1. So what's actually happening?

When you call Thread.start() (with a thread created via the virtual thread API), the JVM doesn't immediately jump into the kernel to create a real thread like before. Instead, the following chain of events happens:

#### 2.1.1. Creating a Virtual Thread – A lightweight object living in the heap
A Virtual Thread is simply an object in the Java heap — it doesn't map directly to a native thread. It holds information about the execution logic (runnable), state, and in particular a Continuation — an object representing the temporarily-suspended execution flow.

The first time you create a Virtual Thread, the JVM initializes a special ForkJoinPool, called the VirtualThreadScheduler, containing a number of Carrier Threads — these are the Platform Threads that actually run the virtual threads.

>[!TIPS] By default, the number of carrier threads equals the number of CPU cores.

#### 2.1.2. Scheduling: Doesn't run right away – it queues up first

The Virtual Thread is added to a waiting queue in the scheduler. If a carrier thread is free, the JVM "mounts" this virtual thread onto that carrier thread to run.

#### 2.1.3. Mounting: Virtual thread runs on the carrier thread
When a virtual thread is mounted, it means the code you passed into Runnable runs on the carrier thread's stack – just like a regular thread.
However, the special part is that the JVM can pause and resume the virtual thread's execution at any time, thanks to the continuation – a mechanism that records the "pause point" so it can resume later.

#### 2.1.4. Blocking: The virtual thread gets unmounted
When a virtual thread performs blocking operations such as:
- Thread.sleep()
- Blocking I/O calls (like `InputStream.read()`)
- Waiting on a Lock, Semaphore,...
The JVM will:
- Interrupt the virtual thread's execution.
- Detach it from the carrier thread (unmount).
- Save the execution state (program counter, stack frame, ...) into the continuation living in the heap.

The carrier thread doesn't get blocked at this point – it goes back to running another waiting virtual thread.

#### 2.1.5. Once ready, remount and continue running
When the blocking operation completes (e.g., I/O returns a result), the scheduler mounts the virtual thread back onto a carrier thread and resumes execution from where it left off, as if nothing had happened.
And even better: a virtual thread doesn't require you to rewrite your code in a tangled reactive or async style. You still write code in the traditional blocking style, and the JVM handles the optimization for you.

### 2.2. The "wow" moments you get
After going through how a virtual thread works – from creation, to mounting on a carrier thread, to unmounting when blocking – you've probably got a sense of the mechanism behind its "lightness." But what makes virtual threads truly valuable lies in the very clear benefits they bring to Java developers.

This isn't a half-baked improvement. These are "wow" moments significant enough to make us reconsider how we've been writing parallel code all along:
- **Doesn't occupy fixed OS resources:** A virtual thread doesn't map 1:1 to a native thread. So the operating system doesn't have to manage millions of threads — something that was previously impossible. A thread can wait (block) naturally — calling sleep(), readLine(), lock() — but thanks to the unmount mechanism, it doesn't occupy real CPU. Meanwhile, the carrier thread can go on running other threads.
- **Easy to create/destroy:** One of the biggest advantages of a virtual thread is its extremely low creation and destruction cost. While a platform thread (OS thread) requires the operating system to allocate resources (like ~1MB of stack per thread), a virtual thread is just a lightweight object in the heap (just a few KB per thread). And once it's done, destroying it is as simple as letting the GC handle the rest.
- **No heavyweight kernel-level context switching needed:** The JVM handles state transitions itself in user-space, instead of relying on the kernel like platform threads. This is much lighter: no need to save/restore CPU registers, stack pointer, or kernel cache.
- **Can scale to millions of threads:** Each virtual thread is just a lightweight object in the heap — no dedicated 1MB stack like an OS thread, no requirement for the kernel to allocate resources right at creation time.
- **Removes the multi-threading nightmare:** Before virtual thread came along, Java had, over many years, developed many techniques to avoid using too many threads, such as asynchronous callbacks, non-blocking I/O, reactive programming, etc. These techniques were effective in terms of resources, but very hard to read, debug, and maintain. With virtual thread, we can go back to writing code the traditional way: synchronous, sequential, easy to understand, while still achieving the ability to handle thousands, even millions, of tasks in parallel. A virtual thread is really just a new implementation of java.lang.Thread and still follows the rules that have existed since Java SE 1.0. That means developers don't need to learn any new concepts to start using virtual threads — you still work with Thread, Runnable, synchronized, wait/notify, ... just like before.

All of this opens up new possibilities for Java server systems — where creating many threads used to come with all sorts of "classic era" worries.
That's plenty of theory, but talk is cheap, right? So I'll run a demo code snippet to compare the difference between platform thread and virtual thread

#### 2.2.1. Scenario: Create 10,000 threads and make an HTTP request (an I/O task)
*Requirement: Java 21 or later, and enable --enable-preview if you're using JDK 21.*

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

Result:
- In the platform thread case, the code threw a java.lang.OutOfMemoryError before it even finished running. That's because a platform thread is fundamentally a wrapper around a native OS thread, and OS threads are... not light at all.
- In the virtual thread case, even after creating 10,000 virtual threads, the program finished in about 1 second — almost exactly the Thread.sleep() duration — and put no pressure on memory or CPU at all. The reason is simple: a virtual thread doesn't hold its own native thread; it's only mounted onto a carrier thread when it needs to execute.
When it hits Thread.sleep(), the virtual thread gets unmounted, freeing up room for another thread, and later gets mounted again when needed.

📷 Figure 4

And if you noticed, as I mentioned, the default number of native threads equals the number of cores the machine has, so here I have 10 workers corresponding to my machine's 10 cores.

### 2.3. Can Virtual Thread completely replace Platform Thread?
After seeing the outstanding advantages virtual thread brings to I/O tasks — simplifying code, saving resources, scaling freely without worrying about OOM — many will ask: can virtual thread replace platform thread in every case?
The answer is: **not quite.**
Virtual thread is designed to be **optimized for blocking I/O tasks** — where a thread can pause and give up resources to another thread. But in the world of **CPU-bound work, where tasks need to keep computing continuously, this advantage nearly disappears.**
In this case, both virtual thread and platform thread have to compete directly for CPU time, and since the JVM still needs an OS thread to execute compute tasks, creating thousands of virtual threads can **overload the scheduler**, leading to no performance improvement — or even worse performance.
Let's look at an example comparing the two types of threads when performing the same computational workload.

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

In the code above, we'll run benchmarks with THREAD_COUNT = 100, 500, 2000 in turn, and here's the results table:

📷 Figure 5

We can see that even though virtual thread is designed to be "lighter" than platform thread, in CPU-bound tasks the performance difference between them is negligible, and virtual thread can even fall behind as we increase the thread count.

**The cause isn't the thread — it's the CPU.**

Every CPU-bound task (like computing prime numbers) needs to be executed directly by the CPU. Going back to the diagram in figure 2.1, even if you create millions of threads, if your machine only has 4 cores, only 4 tasks can actually run at any given moment. A thread is just a unit for managing logical flow — to achieve concurrency. But parallelism is limited by the number of CPU cores. While a platform thread is managed by the OS, and the OS scheduler can optimize thread distribution across CPU cores with little overhead, a Virtual thread is coordinated by the JVM scheduler, so it has to perform extra mount/unmount operations onto a carrier thread (OS thread). This mounting/unmounting creates additional overhead in an environment with many continuous compute tasks, and it means the more virtual threads created, the greater the scheduling burden, which ends up hurting the system's performance.

📷 Figure 6

## 3. Best practice
*Virtual thread is not a "silver bullet"*

Virtual thread is a revolution for I/O-bound concurrent programming, but it's not a miracle cure for every kind of workload.

It opens up a new approach to concurrent programming: simpler, more readable, and extremely resource-efficient. However, virtual thread doesn't solve every problem, and in particular it isn't the optimal solution in every situation. So when should you use virtual thread and when shouldn't you, and how should you use it to get the best results?

Below are a few lessons I've learned for using virtual thread effectively, so you don't turn it into a "double-edged sword."

### 3.1. IO-bound or CPU-bound
Virtual thread truly shines in IO-bound applications, where tasks mostly wait for responses from the network, a database, or the file system. In these cases, a thread spends most of its time "sitting idle," and virtual thread lets you create tens of thousands of threads to process work in parallel without consuming a lot of resources.

On the other hand, if your application is mostly CPU-bound — meaning it's heavy on computation — virtual thread won't provide a clear benefit. The bottleneck here is no longer the number of threads, but the number of CPU cores. Even if you create thousands of virtual threads, they'll still have to fight over every CPU cycle, leading to:
- A sharp rise in context switches, as many threads compete to run on few CPUs.
- Lower performance, because the CPU spends time switching between tasks instead of doing actual processing.
- The system overall may even end up slower than just using a few platform threads processing sequentially.

### 3.2. Avoid using old-style thread pools (FixedThreadPool, CachedThreadPool)
Before virtual thread was released in Java 21, threads (platform threads) were a precious resource, so we had to reuse them via thread pools such as Executors.newFixedThreadPool() or newCachedThreadPool() to:
- Limit the number of running threads.
- Reduce the cost of creating and destroying threads.
But with virtual thread, those old assumptions no longer hold.

```java
ExecutorService pool = Executors.newFixedThreadPool(100);
pool.submit(() -> {
    // blocking I/O here
});
```

This is a common pattern when using platform threads: creating a thread pool with an initial size of 100 threads and reusing them. But capping the pool at 100 threads inadvertently creates a system bottleneck. When 100 tasks are blocking on I/O, the remaining tasks have to wait, even though virtual thread could run tens of thousands of them in parallel. Instead of reusing threads, create a virtual thread for each task using:

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<ResultA> f1 = executor.submit(task1);
    Future<ResultB> f2 = executor.submit(task2);
    // ...
}
```

Why this approach is better:
- No fixed limit on the number of threads.
- No pool to manage.
- Each task gets its own thread, without fighting over resources like in a traditional pool.
- This executor is very lightweight; you can create a new one for each request or group of tasks without worrying about cost.

### 3.3. Don't mix Virtual Thread with async-style code

Virtual thread was created to simplify concurrent programming by letting you write code step by step, sequentially, while still achieving parallel execution without blocking the platform thread.

But if you keep using traditional async techniques such as:
- CompletableFuture.thenApply(...)
- Reactive Stream (Mono, Flux, Observable…)
- Callback hell (callback(callback(callback(...))))

Then you're wasting virtual thread's biggest benefit, which is returning to synchronous code that's easy to read, debug, and maintain. Using async-style code with virtual thread is redundant, because virtual thread already handles the blocking problem for you.

## 4. Conclusion
Virtual thread is a truly groundbreaking step forward for Java; it opens up the ability to handle thousands to millions of concurrent tasks while staying lightweight and resource-efficient.

With virtual thread, you can write simple, traditional synchronous code that performs as effectively as asynchronous code. It's especially well suited for systems like:
- High-concurrency web servers.
- I/O-heavy backend services.
- Applications that need to handle concurrency without getting tangled up in reactive or callback hell.
However, as Fred Brooks once said: "There are no silver bullets in software engineering."

Virtual thread isn't a silver bullet for every problem. For CPU-bound tasks, traditional thread pools still have their place — because the CPU can't be "virtualized" the way a thread can.

I hope this article has helped give you a clearer picture of virtual thread — not just as a new feature, but as a new approach to concurrent programming in Java: easy to write, easy to understand, easy to scale.

And don't forget to practice by running the code snippets in this article.

Many thanks and happy reading!

Tham khảo từ [Ronin Engineer - Dev ơi mình đi đâu thế?](https://www.facebook.com/share/p/19jbyRSFkc/)