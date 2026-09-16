---
title: "Understanding the Diffie-Hellman Algorithm"
slug: tim-hieu-ve-thuat-toan-diffie-hellman
subtitle: "End-to-end encryption in the Destiny social network project"
author: Trần Hữu Đang
date: 2025-07-14
image: /images/post/2025-07-14-diffie-hellman/1.png
tags:
  - Bảo mật
  - Diffie-Hellman
  - Mã hóa
  - Java
  - Dự án Destiny
description: "Applying the Diffie-Hellman algorithm for end-to-end encryption in the messaging feature of the Destiny social network. This article explains the key-exchange mechanism and how to implement it in Java."
published: false
---
	


For my graduation project, the **Destiny social network**, I applied the **Diffie-Hellman** algorithm to the **end-to-end encrypted messaging** feature and received very high praise from the review committee 🎓. In this article I'll share how to implement it in the **simplest and easiest to apply** way, so anyone can understand and use it.

📌 **Source code demo link**: [DiffieHellman.java on GitHub](https://github.com/dangtranhuu/destiny/blob/main/BE_Destiny/src/main/java/com/davisy/encrypt/DiffieHellman.java)  
🔧 **A UI demo will be added later**

<!-- more -->

## 1. What is Diffie-Hellman?

The **Diffie-Hellman** algorithm is a key-exchange protocol that lets two parties generate a **shared secret key** **without ever sending it directly over the network**.

### Principle

1. Choose a prime number **p** and **g** (g is the *generator*)
2. Each side picks a private key **a** or **b**
3. Compute the public key:
   $$
   A = g^a \mod p \quad , \quad B = g^b \mod p
   $$
4. Each side computes the shared key:
   $$
   s = B^a \mod p = A^b \mod p
   $$

---

## 2. Implementing the Diffie-Hellman algorithm in Java

```java
public static final int DIFFINE_HELLMAN_GROUP1 = 3; // G
public static final int DIFFINE_HELLMAN_GROUP2 = 17; // P
```

### 2.1 Prime-checking function

```java
public static boolean isPrime(int num) {
    if (num < 2) return false;
    for (int i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) return false;
    }
    return true;
}
```

### 2.2 Generating the private key

$$
\text{Find the nearest prime number greater than or equal to } n
$$

```java
public static int genPrivateKey(int n) {
    if (n < 2) return 2;
    if (isPrime(n)) return n;
    int prime = n + 1;
    while (true) {
        if (isPrime(prime)) return prime;
        prime++;
    }
}
```

### 2.3 Generating the public key

$$
\text{PublicKey} = g^a \mod p
$$

```java
public static int genPublicKey(int id){
    BigInteger G = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP1);
    BigInteger P = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP2);
    BigInteger privateK = BigInteger.valueOf(genPrivateKey(id));
    return G.modPow(privateK, P).intValue();
}
```

### 2.4 Computing the Shared Secret

$$
\text{SharedKey} = B^a \mod p
$$

```java
public static int genSecretKey(int id, int resId){
    BigInteger P = BigInteger.valueOf(DIFFINE_HELLMAN_GROUP2);
    BigInteger privateK = BigInteger.valueOf(genPrivateKey(id));
    BigInteger publicK = BigInteger.valueOf(genPublicKey(resId));
    return publicK.modPow(privateK, P).intValue();
}
```

---

## 3. Encryption/decryption demo with AES

```java
int u1 = 18;
int u2 = 26;
String message = "Hello bạn, khỏe chứ?";

int keyU1 = genSecretKey(u1, u2);
int keyU2 = genSecretKey(u2, u1); // keyU1 == keyU2

String encrypted = aes.encrypt(message, keyU1);
String decrypted = aes.decrypt(encrypted, keyU2);

System.out.println(encrypted);
System.out.println(decrypted);
```

---

## 4. Conclusion

Using the **Diffie-Hellman** algorithm is one of the simplest and most effective ways to build an end-to-end encryption mechanism. I hope this article helps you apply it right away in your own real-world applications.

> 💡 Don't forget to check out the GitHub link to see the full source code:  
> 🔗 [DiffieHellman.java](https://github.com/dangtranhuu/destiny/blob/main/BE_Destiny/src/main/java/com/davisy/encrypt/DiffieHellman.java)

