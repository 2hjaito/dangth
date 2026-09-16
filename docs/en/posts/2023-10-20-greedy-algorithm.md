---
title: Understanding the Greedy Algorithm
slug: tim-hieu-ve-giai-thuat-tham-lam
subtitle: Data structures and algorithms
author: Trần Hữu Đang
date: "2023-10-20"
image: /images/post/2023-10-20-greedy-algorithm/1.png
tags:
  - Algorithm
  - Thuật toán
  - Giải thuật
---
	

The greedy algorithm is widely applied to real-world problems. Let's dig into it together...
<!-- more -->

What is the greedy algorithm, and is it really "greedy" ???


![](/images/post/2023-10-20-greedy-algorithm/1.png)

<details>
<summary><strong>Main content</strong></summary>

![Principle](/images/post/2023-10-20-greedy-algorithm/2.png)  
![Components](/images/post/2023-10-20-greedy-algorithm/3.png)  
![Chosen properties](/images/post/2023-10-20-greedy-algorithm/4.png)  
![Advantages](/images/post/2023-10-20-greedy-algorithm/5.png)  
![Disadvantages](/images/post/2023-10-20-greedy-algorithm/6.png)  
![Exercise](/images/post/2023-10-20-greedy-algorithm/7.png)  
![Solution](/images/post/2023-10-20-greedy-algorithm/8.png)  
![Acknowledgements](/images/post/2023-10-20-greedy-algorithm/9.png)

</details>

## Introduction

The greedy algorithm *(English: **Greedy algorithm**)* is an algorithm that solves a problem in a *metaheuristic* fashion, looking for the locally optimal choice at each step in the hope of arriving at a globally optimal solution.

Here's a simple way to understand it:

Say your mom hands you two bills, one worth ***100,000 VND*** and one worth ***200,000 VND***, and you can only pick one. Naturally, you'd pick the 200,000 VND bill because it's worth more, even though both bills are the same size and quantity.

Here's another example. Suppose we have a backpack with a weight capacity of 37, and 4 kinds of items with their corresponding weight and value. The task is to pick the maximum number of items so that the total weight fits the backpack's capacity while maximizing the total value obtained.

From this, the Greedy technique applied to this problem is:

1. Compute the unit value for each type of item.

2. Consider each type of item in order of unit value, from largest to smallest.

3. For each item considered, take the maximum quantity that the backpack's remaining capacity allows.

4. Determine the backpack's remaining capacity and go back to step 3 until no more items can be chosen.



## Overview of the algorithm

Greedy is one of the most common approaches for designing algorithms.
Greedy is usually an iterative algorithm, where at each step we build up the solution incrementally, until the loop ends and we obtain the final solution to the problem.

The idea behind Greedy, as the name suggests, is:

<!-- <div style="border-left: 4px solid #00aaff; padding-left: 1rem; background:rgba(249, 249, 249, 0);">

<strong>Greedy principle</strong><br/>
At each step of the algorithm, among the feasible choices, pick the <strong>most beneficial</strong> one.
</div> -->

> [!INFO]
> **Greedy principle**
> At each step of the algorithm, among the feasible choices, pick the **most beneficial** one.


Many famous algorithms are designed based on the greedy idea, such as **Dijkstra**'s shortest path algorithm, **Kruskal**'s minimum spanning tree algorithm, etc.

In this article we'll explore the greedy design principle through a few examples.

### Example 1
Suppose we have a backpack with a weight capacity of 37, and 4 kinds of items with weight and value given as follows:

|Item type   | A   |  B |  C |  D  |
|--------------|-----|---|----|-----|
|Weight|15|10|2|4|
|Value       |30  |  25 |  2  |  6|

From the table above, we compute the unit value for each item type and sort them in descending order of unit value, giving us the table below.

   |Item type |    B  |  A  |  D  |  C|
|--------------|-----|---|----|-----|
   |Weight |   10 | 15  | 4  | 2|
   |Value     |   25  | 30  |  6  |  2|
   |Unit value     |  2.5  | 2.0 | 1.5 | 1.0|

So the priority order for choosing items is B, A, D, and finally C.

Item B is considered first, and we choose a maximum of 3 units since each one weighs 10 and the backpack's capacity is 37. After choosing 3 units of B, the backpack's remaining capacity is 37 – 3*10 = 7. We then consider item A; since A weighs 15 but the backpack only has 7 capacity left, we can't choose A. We consider item D and see that we can pick 1 unit of D, leaving 7-4 = 3 capacity. Finally, we can fit one unit of C.

<!-- <div style="border-left: 4px solid #00aaff; padding-left: 1rem; background:rgba(249, 249, 249, 0);">
<strong>📌 CONCLUSION</strong><br/>
So we've chosen 3 units of B, one unit of D, and 1 unit of C.<br/>
The total weight is <strong>3×10 + 4 + 2 = 36</strong> and the total value is <strong>3×25 + 6 + 2 = 83</strong>.
</div> -->

> [!INFO]
> **CONCLUSION**
> So we've chosen 3 units of B, one unit of D, and 1 unit of C.
> The total weight is **3×10 + 4 + 2 = 36** and the total value is **3×25 + 6 + 2 = 83**.


## The algorithm

In general, a greedy algorithm has five components:

- A set of candidates, from which we build a solution

- A selection function, which picks the best candidate to add to the solution

- A feasibility function, used to decide whether a candidate can be used to extend the solution

- An objective function, which assigns a value to a solution or a partial solution

- An evaluation function, which indicates when we've found a complete solution.

**There are two components that are most decisive for the greedy choice:**
### The greedy-choice property

We can choose whatever solution seems best at the current moment, and then solve the subproblem that arises from having made that choice.

The greedy algorithm's choice can depend on previous choices. But it cannot depend on any future choice, nor on the solution of subproblems.

The algorithm proceeds by making choices in a loop, while simultaneously shrinking the given problem down to a smaller subproblem. That's the difference between this algorithm and Dynamic Programming. Dynamic programming explores everything exhaustively and always guarantees finding the solution.

At each step of the algorithm, dynamic programming makes a decision based on the decisions of the previous step, and may reconsider the path of the previous step toward the solution.

The greedy algorithm decides early and shifts the algorithm's path based on that decision, and never reconsiders old decisions. For some problems, this can result in an incorrect algorithm.

### Optimal substructure

A problem is said to have "optimal substructure" if an optimal solution to a subproblem contains the optimal solution to the larger problem.

We can implement this with the following procedures:

1. Compute the unit value of the products.

```c 
struct DoVat {
char Ten [20];
float TrongLuong, GiaTri, DonGia;
      int PhuongAn;//so luong do vat chon
};
```

2. Compute the unit value of the products. Algorithm complexity is O(n)

```c
void TinhDonGia(DoVat sp[], int n)
{
   for(int i = 1; i <= n; i++)
      sp[i].DonGia = sp[i].GiaTri / sp[i].TrongLuong;
}
```

3. Sort in descending order by unit value. Algorithm complexity O(n2)

```c
 void SapXep(DoVat sp[], int n)
 {
    for(int i = 1; i <= n - 1; i++)
       for(int j = i + 1; j <= n; j++)
       if (sp[i].DonGia < sp[j].DonGia)
       swap(sp[i], sp[j]);
 }
 ```

4. Determine the products to take. Algorithm complexity is O(n)

 ```c
 void Greedy(DoVat sp[], int n, float W)
 {
      for (int i = 0; i < n; i++) {
            sp[i].PhuongAn = W / sp[i].TrongLuong;
            W -= sp[i].PhuongAn * sp[i].TrongLuong;
      }
 }
 ```

### Example 2

Let's move to a real-world problem — this was the first exercise I encountered when I first learned about the [Greedy Algorithm]().

#### Problem statement

**Build a currency-exchange feature with the following requirements:**
- **Input:** enter the amount of money to break down
- **Output:** display the denominations returned
- **Given that:**
The denominations are: **500, 200, 100, 50, 20, 10, 5, 2, 1**

- **Test case:**

|Input|Output|
|-----|------|
|**500K**|*2 bills of 200K and 1 bill of 100K*|
|**234K**|*1 bill of 200K, 1 bill of 100K, 2 bills of 20K, and 1 bill of 2K*|
|**9K**|*1 bill of 5K and 2 bills of 2K*|

Think through your own solution, then click below to see my code and check whether they match

<!-- <div style="border-left: 4px solid #00cc88; padding-left: 1rem; background:rgba(240, 255, 248, 0);">
<strong>💡 IT WOULD BE GREAT</strong><br/>
If you leave your own code in the comments below this post ^^
</div> -->

#### Solution
<details>
<summary><strong>SOLUTION</strong></summary>

```cpp
#include<stdio.h>
int main() {
	int i,soTo,soTien,soTienBanDau;
	int menhGia[9] = {500,200,100,50,20,10,5,2,1};
	do {
		printf("Nhap vao menh gia muon doi: ");
		scanf("%d", &soTien);
		soTienBanDau = soTien;
		if (soTien > 0) {
			printf("Voi %dK ban co the doi thanh:\n", soTienBanDau);
		}
		if (soTienBanDau >= 1) {
			while (soTien > 0) {
				for (i = 0; i < 9; i++) {
					if (soTienBanDau == menhGia[i] && soTienBanDau != 1)
						i++;
					soTo = soTien / menhGia[i];
					if (soTo != 0) {
						printf("%d to %dK\n", soTo, menhGia[i]);
					}
					soTien -= soTo * menhGia[i];
				}
			}
		} else {
			printf("Khong co menh gia nay, vui long nhap lai!\n");
		}
	} while (soTienBanDau < 1);
	return 0;
}
 ```
</details>

### Example 3 

Let's look at an example with a bit more math to it ^^

**Storing files on magnetic tape**

Here's the problem:

Suppose you have $n$ files on a magnetic tape, where file $i$ has size $L[i]$.

Let $\pi$ be a permutation of ${1,2,…,n}$ corresponding to a way of storing the files in the order $\pi(1),\pi(2),…,\pi(n)$.

To access file $\pi(i)$, you must scan through all files $\pi(1),\pi(2),…,\pi(i−1)$.

So the cost to access file $\pi(i)$ is:
$$
C(\pi(i))=\sum_{\substack{i=1}}^kL[\pi(k)]
$$
Find a storage arrangement that makes access as efficient as possible, given that each file is accessed exactly once.


<!-- <div style="border-left: 4px solid #00cc88; padding-left: 1rem; background:rgba(240, 255, 248, 0);">

<strong>💡 Example 1:</strong><br/>
Suppose files numbered $1,2,3$ have sizes $5,4,6$ respectively.<br/>
If we arrange the files in the order $2,3,1$, the access cost is $4+10+15=29$.<br/>
If we arrange them in the order $2,1,3$, the access cost is $4+9+15=28$.
</div> -->

> [!TIP] **Example 1:** <br/>
> Suppose files numbered $1,2,3$ have sizes $5,4,6$ respectively. <br/>
> If we arrange the files in the order $2,3,1$, the access cost is $4+10+15=29$. <br/>
> If we arrange them in the order $2,1,3$, the access cost is $4+9+15=28$. <br/>


The idea behind the **greedy algorithm** is as follows: suppose we're placing a file at position $i$; to reduce the cost of accessing file $i$, we should fill positions $1,2,…i−1$ with the files having the smallest total size.

Which storage order satisfies this property for every $i$? It's storing the files in order from smallest to largest by size.

In example 1, the order $2,1,3$ has a lower cost precisely because it's ordered from smallest to largest.

Here's the pseudocode:

> [!TIP] **GreedyFileOnTape:**
>
> $L = [1, 2,..., n]$ <br/>
> $S ← \ 1,2,…,n$ <br/>
> **repeat**
> **choose** $s∈S$ with minimum $L[s]$ <br/>
> write $s$ to the tape <br/>
> $S←S∖s$ <br/>
> **until** $S=∅$

<!-- <div style="border-left: 4px solid #00aaff; padding-left: 1rem; background:rgba(249, 249, 249, 0);">
<strong>GreedyFileOnTape:</strong><br/><br/>
<span>L = [1, 2,..., n]</span><br/>
<span>S ← \ 1,2,…,n </span><br/>
<strong>repeat</strong><br/>
choose s∈S with minimum L[s]<br/>
write s to the tape<br/>
S←S∖s<br/>
<strong>until</strong> S=∅
</div> -->


#### Correctness of the algorithm

We'll prove that storing files in order from smallest to largest gives the smallest cost.

Suppose there exists an optimal storage arrangement $\pi$ and an index $i$ such that $L[π(i)]>L[π(i+1)]$.

Let $cost_\pi$ be the access cost of $\pi$.

By definition, we have:
$
cost_\pi=\sum_{\substack{i=1}}^nC(\pi(i)) 
$

Let $\pi\prime$ be the permutation obtained from $\pi$ by swapping $\pi(i)]$ and $\pi(i+1)$. We have:

$
cost_\pi−cost_\pi\prime=C(\pi(i))+C(\pi(i+1))−C(\pi\prime(i))−C(\pi\prime(i+1))=L[\pi(i)]−L[\pi(i+1)]<0
$

Therefore, $cost_\pi> cost_\pi\prime$, which contradicts the assumption that $\pi(i)$ is the optimal storage arrangement.

#### Time complexity analysis

By sorting files in increasing order of size first, we can execute the algorithm above in `O(n log n)` time.

### Conclusion

That's everything I know about the [Greedy Algorithm](); I hope it's useful to you, and I wish you a great day at work and study ^^

Leave your thoughts in the comments below!

#### Links
- [@trungphongf - VIBLO](https://viblo.asia/p/thuat-toan-tham-lam-greedy-algorithm-XQZGxozlvwA)
- [Hùng Lê - giaithuatlaptrinh.github.io/](https://giaithuatlaptrinh.github.io/Gi%E1%BA%A3i-thu%E1%BA%ADt-tham-lam/)