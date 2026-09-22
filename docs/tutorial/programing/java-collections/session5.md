# 6. Set

Trong Java, một ==set== là một tập hợp các phần tử duy nhất không theo thứ tự. Điều này có nghĩa là mỗi phần tử trong set chỉ xuất hiện một lần và không có thứ tự cụ thể nào được đảm bảo cho các phần tử. Set trong Java cung cấp một cách để lưu trữ tập hợp các phần tử mà không có bất kỳ sự lặp lại nào và không quan tâm đến thứ tự của chúng.

Trong Java, bạn có thể sử dụng một trong các lớp cung cấp bởi Java Collection Framework để thực hiện set. Hai lớp phổ biến nhất để thực hiện set là **HashSet** và **TreeSet**.

- **HashSet**: Lớp này sử dụng bảng băm để lưu trữ các phần tử và cung cấp thời gian truy cập và thao tác tốt nhất trung bình O(1). Tuy nhiên, không có sự đảm bảo về thứ tự của các phần tử.

- **TreeSet**: Lớp này sử dụng cấu trúc dữ liệu cây để lưu trữ các phần tử và duy trì chúng theo thứ tự tăng dần. Thao tác trên **TreeSet** có thể chậm hơn **HashSet** nhưng phần tử được lưu trữ trong một **TreeSet** sẽ được sắp xếp theo thứ tự tự nhiên.

Dưới đây là một ví dụ đơn giản về cách sử dụng **HashSet** trong Java:

```java
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // Khởi tạo một HashSet
        Set<String> set = new HashSet<>();

        // Thêm các phần tử vào HashSet
        set.add("apple");
        set.add("banana");
        set.add("orange");
        set.add("apple"); // phần tử trùng lặp, sẽ không được thêm vào set

        // In ra các phần tử trong HashSet
        for (String element : set) {
            System.out.println(element);
        }
    }
}
```

```
orange
banana
apple
```

Set dùng để giải quyết những bài toán mang tính duy nhất, ví dụ tìm phần tử lặp lại hai lần trong mảng.

## Ví dụ

### 287. Tìm số trùng lặp

Cho một mảng các số nguyên chứa số nguyên trong đó mỗi số nguyên nằm trong phạm vi bao gồm. `nums` `n + 1` `[1, n]`

Chỉ có một số lặp lại trong , trả về số lặp lại này. `nums`

Bạn phải giải quyết vấn đề mà không sửa đổi mảng và chỉ sử dụng thêm không gian không đổi. `nums`

#### Ví dụ 1:
Input: nums = [1, 3, 4, 2, 2] <br/> Output: 2

#### Ví dụ 2:
Input: nums = [3, 1, 3, 4, 2] <br/> Output: 3

#### Ví dụ 3:
Input: nums = [3, 3, 3, 3, 3] <br/> Output: 3
 

#### Ràng buộc:

- `1 <= n <= 105`
- `nums.length == n + 1`
- `1 <= nums[i] <= n`
Tất cả các số nguyên trong chỉ xuất hiện một lần ngoại trừ chính xác một số nguyên xuất hiện hai hoặc nhiều lần. `nums`
 

#### Theo dõi:

Làm thế nào chúng ta có thể chứng minh rằng ít nhất một số trùng lặp phải tồn tại trong ? `nums`
Bạn có thể giải quyết vấn đề trong độ phức tạp thời gian chạy tuyến tính không?

::: details BÀI GIẢI

```java
class Solution {
    public int findDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();

        for (int i : nums){
            if (set.contains(i))
                return i;
            set.add(i);
        }
        return 0;
    }
}
```
:::