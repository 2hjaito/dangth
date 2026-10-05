---
title: "Implementing End-to-End Encryption with Diffie-Hellman and AES in Java"
slug: trien-khai-ma-hoa-dau-cuoi-voi-diffie-hellman-va-aes-bang-java
subtitle: "Building a key-exchange and message-encryption mechanism for the Destiny social network project"
author: Trần Hữu Đang
date: 2025-07-14
image: /images/post/2025-07-18-diffie-hellman/0.webp
tags:
  - Bảo mật
  - Mật mã học
  - Diffie-Hellman
  - AES
  - End-to-End Encryption
  - Java
  - Destiny
description: "This article explains how the Diffie-Hellman and AES algorithms work, and demonstrates how to combine the two to build an end-to-end encryption mechanism for the messaging feature in the Destiny social network project using Java."
published: true
---
	

**I. INTRODUCTION**

In the digital age, information is an incredibly valuable asset and, at the same time, highly vulnerable to compromise. Every day, billions of messages, emails, financial transactions, and pieces of personal data travel across the Internet. Because of this, information security has become a matter of survival for information technology systems. Failing to secure data can lead to serious consequences such as loss of privacy, financial loss, or attacks by malicious actors.

Given this reality, many security models and techniques have been proposed and widely applied, among which data encryption is one of the most core and common solutions. Encryption transforms data from a readable form into an unintelligible form unless you have the corresponding "key" to decrypt it. As a result, even if data is stolen or intercepted in transit, an attacker still cannot read its content without a valid decryption key.

One prominent model in modern security is End-to-End Encryption (E2EE). This model ensures that data is encrypted right from the sender's device and only decrypted on the recipient's device. All intermediate nodes — servers, service providers, or cloud storage systems — cannot access the actual content of the message. Because of this, E2EE has increasingly become the standard across major communication platforms such as Signal, WhatsApp, Telegram, and Messenger, and users place particular trust in its level of security.

However, implementing end-to-end encryption effectively requires combining two main categories of algorithms:

1.  A public key-exchange algorithm — used so that two parties can generate and share a common secret key over an insecure channel.

2.  A symmetric encryption algorithm — uses that shared key to encrypt and decrypt the actual content of the message.

This implements a model combining:

- The Diffie-Hellman key-exchange algorithm, considered the foundation of public-key cryptography, which lets two parties securely generate a shared key without ever exchanging a secret key.

- The AES (Advanced Encryption Standard) encryption algorithm, one of the fastest and strongest symmetric encryption algorithms available today, widely used in industry and standardized by NIST.

Combining these two algorithms not only guarantees theoretical security but also meets the high-performance demands of real-world use. This model makes it possible to build a messaging or data-transmission system with genuine end-to-end security, where each message can only be decrypted by the intended recipient, even if the message is leaked or intercepted along the way.

This report provides an in-depth look at how this end-to-end encryption model works, its technical implementation, and its practical applications. At the same time, implementing and testing it in a Java programming environment helps clarify the technical process and its real-world feasibility.

## II. THEORETICAL FOUNDATIONS

In the field of information security, choosing and combining encryption algorithms must be based on a deep understanding of how they work, their ability to guarantee security, their processing performance, and their feasibility in real-world deployment. The end-to-end encryption model combining Diffie-Hellman and AES is built on two core principles: secure key exchange and effective content encryption. To understand the role of each algorithm, we need to dig into an analysis of their principles and mechanisms.

### **2.1. The Diffie-Hellman key-exchange algorithm** 

#### a) Introduction

The Diffie-Hellman algorithm, proposed in 1976 by Whitfield Diffie and Martin Hellman, was a breakthrough in cryptography. Before that, encryption systems relied mainly on symmetric encryption, which required the communicating parties to share a secret key in advance. The tricky problem was: how do you exchange a secret key safely over an insecure channel? Diffie-Hellman directly solves this problem, laying the foundation for modern public-key cryptography.

#### b) How it works

Diffie-Hellman lets two parties (say, Alice and Bob) agree on a shared secret key, even while communicating over a public, untrusted channel. The algorithm relies on the difficulty of the discrete logarithm problem — that is, if you know $g$, $p$, and $A\  = \ g^{a}\ mod\ \ p$, recovering $a$ is extremely hard when $p$ is large enough.

The process works as follows:

1.  Agree on public parameters:

    - $p$: a large prime number (typically 2048 bits or more)

    - $g$: a primitive root modulo $p$

2.  Each side chooses a secret number:

    - Alice chooses $a$, Bob chooses $b$

3.  Compute the public key:

    - Alice: $A\  = \ g^{a}\ mod\,\, p$

    - Bob: $B\  = \ g^{b}\ mod\ p\,$ 

![Diffie-Hellman key exchange -- Vietnamese Wikipedia](/images/post/2025-07-18-diffie-hellman/1.webp)

4.  Exchange public keys A and B

5.  Compute the shared key:

    - Alice computes $K\  = \ B^{a}\ mod\,\, p = \ g^{ba}\ mod\ p$

    - Bob computes $K\  = \ A^{b}\ mod\,\, p = \ g^{ab}\ mode\ p$

Because of the mathematical property:

$$B^{a}\ mod\ p = \left( g^{b} \right)^{a}\ mod\ p = g^{ba}\ mod\ p = g^{ab}\ mod\ p = \left( g^{a} \right)^{b}\ mod\ p = A^{b}\ mod\ p\ $$

- Both sides end up with the same key K without ever having to send the secret key to each other.

#### c) Security

Diffie-Hellman is considered secure when:

- $p$ is large enough (2048 bits or more)

- $g$ is chosen appropriately (for example, having a large order within the modulo p group)

- The secret key isn't reused too many times (to avoid replay-style attacks)

One point worth noting is that Diffie-Hellman does not provide authentication, so in practice it's typically combined with authentication techniques such as digital signatures or digital certificates to prevent "man-in-the-middle" attacks.

### **2.2. The AES (Advanced Encryption Standard) symmetric encryption algorithm** 

#### a) History and standardization

AES (Advanced Encryption Standard) was developed to replace the DES algorithm, which had become outdated. After an international competition, the Rijndael algorithm, developed by two Belgian cryptographers, was selected by NIST as the official encryption standard in 2001.

AES quickly became the most widely used block cipher in the world and is applied extensively in government, finance, e-commerce, and many other fields.

#### b) Structure and operation

AES is a symmetric encryption algorithm — meaning the same key is used to encrypt and decrypt data.

Key characteristics:

- Data block: 128 bits

- Key length: 128, 192, or 256 bits

- Number of rounds: 10 (AES-128), 12 (AES-192), 14 (AES-256)

Data is processed as a 4x4 byte matrix, called the "State," and goes through multiple rounds of transformation. Each round consists of 4 steps:

- SubBytes: replaces each byte with a value from the S-box table (non-linear, highly secure).

- ShiftRows: permutes bytes within each row of the matrix.

- MixColumns: mixes bytes column by column using operations over the Galois field.

- AddRoundKey: XORs the data matrix with the round's subkey.

> In the final round, the MixColumns step is skipped for convenience during decryption.
>
> The decryption process reverses the entire transformation chain above, using the same original key.

#### c) Advantages and role in the end-to-end encryption model

- High speed: AES is optimized for both software and hardware, supporting encryption of millions of data blocks per second.

- High security: No practical attack has broken AES-128 (as of today).

![How AES works](/images/post/2025-07-18-diffie-hellman/2.webp)

- Easy to implement: Available in every standard cryptography library (Java, Python, OpenSSL...).

In the end-to-end encryption model, AES handles the actual encryption of data. Once Diffie-Hellman produces the shared key, that key is converted into a suitable format (for example, hashed with SHA-256 and the first 128 bits taken) to be used as the AES key. The message content is then encrypted with AES, and only the party holding the key can decrypt it.

### **2.3. Combining Diffie-Hellman and AES** 

Diffie-Hellman isn't used to encrypt data because of its low performance; it should only be used for key exchange.

AES is fast but requires a known secret key — it can't generate one on its own or exchange one safely over a network without a key-exchange algorithm.

Combining the two algorithms optimizes both performance and security, while meeting the end-to-end encryption requirements of modern messaging and data-transmission systems.

## III. IMPLEMENTATION IN JAVA

In this section, the end-to-end encryption model is implemented in the Java programming language, with two main parts:

- Implementing the Diffie-Hellman algorithm for secret key exchange.

- Implementing the AES algorithm for encrypting and decrypting text messages.

Using Java offers advantages in terms of popularity, strong library support, ease of testing, and ease of extending for real-world security applications such as chat systems or data transmission over a network.

### **3.1. Overall program structure**

The system consists of the following main classes:

- DiffieHellman: performs the public key exchange.

- AES: performs encryption and decryption of data using the symmetric key.

- Main: simulates the process of key exchange, encryption, and decryption of messages between two parties (Alice and Bob).

Each class is designed to clearly handle one function within the security system.

### **3.2. Implementing the Diffie-Hellman algorithm** 

#### a) Implementation idea

The DiffieHellman class is built to simulate each party in the protocol: the sender (Alice) and the receiver (Bob). Each object can:

- Generate a public key from a secret key.

- Receive the other party's public key and compute the shared key.

Java provides the BigInteger class, which is well suited for handling large integers and modulo operations, so it's used as the main data type.

#### b) Java source code: DiffieHellman.java
```java
import java.math.BigInteger;

public class DiffieHellman {

    // Số nguyên tố lớn
    private final BigInteger p;

    // Căn nguyên thủy modulo p
    private final BigInteger g;

    // Khóa bí mật riêng
    private final BigInteger privateKey;

    // Khóa công khai (g^a mod p)
    private BigInteger publicKey;

    // Khóa chung tính từ khóa công khai của đối tác
    private BigInteger sharedKey;

    public DiffieHellman(
            BigInteger p,
            BigInteger g,
            BigInteger privateKey
    ) {
        this.p = p;
        this.g = g;
        this.privateKey = privateKey;

        // Tính khóa công khai: g^a mod p
        this.publicKey = g.modPow(privateKey, p);
    }

    /**
     * Lấy khóa công khai.
     *
     * @return Public Key
     */
    public BigInteger getPublicKey() {
        return publicKey;
    }

    /**
     * Tính khóa chung từ khóa công khai của đối tác.
     *
     * @param otherPublicKey Khóa công khai của bên còn lại
     */
    public void computeSharedKey(BigInteger otherPublicKey) {
        // (B)^a mod p
        this.sharedKey = otherPublicKey.modPow(privateKey, p);
    }

    /**
     * Lấy khóa chung đã tính.
     *
     * @return Shared Key
     */
    public BigInteger getSharedKey() {
        return sharedKey;
    }
}
```

#### c) Usage example

```java
public class Main {
    public static void main(String[] args) {
        BigInteger p = new BigInteger("23");
        BigInteger g = new BigInteger("5");

        // Khóa riêng Alice
        BigInteger a = new BigInteger("6");

        // Khóa riêng Bob
        BigInteger b = new BigInteger("15");

        DiffieHellman alice = new DiffieHellman(p, g, a);
        DiffieHellman bob = new DiffieHellman(p, g, b);

        alice.computeSharedKey(bob.getPublicKey());
        bob.computeSharedKey(alice.getPublicKey());

        System.out.println("Shared key (Alice): " + alice.getSharedKey());
        System.out.println("Shared key (Bob): " + bob.getSharedKey());
    }
}
```

Both shared keys will be identical if implemented correctly, for example: $2^6 \bmod 23 = 8,\quad 8^{15} \bmod 23 = 2.$

### **3.3. Implementing AES encryption and decryption** 

#### a) Implementation idea

The AES algorithm needs a symmetric key (128, 192, or 256 bits). In this program:

- SHA-256 is used to hash the shared key produced by Diffie-Hellman.

- The first 128 bits are taken to use as the AES key (16 bytes long).

Using the javax.crypto library makes AES encryption simple and secure.

#### b) Java source code: AES.java 

```java
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class AES {

    private static final String ALGORITHM = "AES";

    public static SecretKey getAESKey(byte[] keyBytes) {
        return new SecretKeySpec(keyBytes, ALGORITHM);
    }

    public static byte[] encrypt(String data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);

        return cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
    }

    public static String decrypt(byte[] cipherText, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);

        byte[] decrypted = cipher.doFinal(cipherText);

        return new String(decrypted, StandardCharsets.UTF_8);
    }
}
```

#### c) Converting the shared key into an AES key

```java
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Arrays;

import javax.crypto.SecretKey;

public class Main {
    public static void main(String[] args) throws Exception {
        BigInteger p = new BigInteger("23");
        BigInteger g = new BigInteger("5");

        BigInteger a = new BigInteger("6");   // Alice's private key
        BigInteger b = new BigInteger("15");  // Bob's private key

        DiffieHellman alice = new DiffieHellman(p, g, a);
        DiffieHellman bob = new DiffieHellman(p, g, b);

        alice.computeSharedKey(bob.getPublicKey());
        bob.computeSharedKey(alice.getPublicKey());

        BigInteger sharedKey = alice.getSharedKey();

        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        byte[] hash = sha.digest(sharedKey.toByteArray());

        // Take the first 16 bytes to create an AES-128 key
        byte[] aesKeyBytes = Arrays.copyOf(hash, 16);

        SecretKey aesKey = AES.getAESKey(aesKeyBytes);

        System.out.println("Shared key: " + sharedKey);
        System.out.println("AES Key generated successfully!");
    }
}
```

### **3.4. Encrypting and decrypting messages** 

```java
String message = "Hello Bob!";

byte[] encrypted = AES.encrypt(message, aesKey);
String decrypted = AES.decrypt(encrypted, aesKey);

System.out.println("Original message: " + message);
System.out.println("Encrypted message: " + Arrays.toString(encrypted));
System.out.println("Decrypted message: " + decrypted);
```

**Result:**

- If the AES key is correct, the message will be decrypted correctly.

- If the wrong key is used, it will either raise an error or produce a completely incorrect result.

### **3.5. Remarks**

By implementing the combination of `Diffie-Hellman` and AES in Java:

- Secure key exchange is performed between two parties over an insecure network.

- Data is encrypted and decrypted effectively.

- Correctness is verified by comparing the message before and after decryption.

Clearly separating each function makes the program easy to extend, test, and apply to real-world systems such as secure chat or IoT data transmission.

## IV. REAL-WORLD APPLICATIONS 

### **4.1. Security models in the real world**

The End-to-End Encryption (E2EE) model isn't just a theoretical concept — it has become a standard requirement in many modern digital communication systems. In an era where information exchange happens constantly, across many platforms such as messaging apps, financial transactions, IoT devices, and cloud services, data security is no longer optional; it's a developer's obligation and a user's minimum right.

The two algorithms used in this model, `Diffie-Hellman` and `AES`, form the foundation of many successful real-world security systems.

### **4.2. Notable applications** 

#### a) Secure messaging apps (Signal, WhatsApp, Telegram, Messenger)

Most popular messaging apps today implement the end-to-end encryption model, in which:

- Diffie-Hellman (or an advanced variant such as X3DH — Extended Triple Diffie-Hellman) is used to exchange session keys between devices.

- AES or ChaCha20 is used to encrypt the message content.

For example, in the Signal Protocol (the foundation for WhatsApp and Signal), when two people start a conversation, the app generates a temporary key based on Diffie-Hellman and uses it to encrypt each message with AES or ChaCha20. The encrypted message can only be decrypted on the corresponding recipient's device. Even WhatsApp's own servers cannot read the message content.

#### b) Secure data transmission over the Internet (HTTPS, TLS, VPN)

In protocols such as HTTPS or VPN (Virtual Private Network), Diffie-Hellman is used during the handshake process to establish a secure session key. Symmetric encryption algorithms like AES are then used to encrypt the entire transmitted content.

**Example:**

- The browser and web server exchange keys using ECDHE (Elliptic Curve Diffie-Hellman Ephemeral).

- A session key is generated and used to encrypt subsequent data packets with AES-GCM or AES-CBC.

#### c) IoT devices and smart sensors

IoT devices such as cameras, temperature sensors, smartwatches, etc., usually have limited hardware resources, so they can't run complex algorithms. However, they still need to exchange data securely with a central system or with each other.

In this case:

- Diffie-Hellman helps establish a key between the device and the system (over a wireless network).

- AES is used to encrypt measurement data before sending it.

With this model, the device doesn't need to store a long-term key, reducing the risk of key extraction from hardware in the event of a physical attack.

#### d) Securing data on cloud services

While storing data on the cloud is very convenient, if the data is encrypted by the user before being uploaded (and only they hold the key), then even the service provider cannot access the content.

Some cloud storage systems, such as Mega.nz, have adopted this model:

- Data is encrypted with AES on the user's machine.

- The AES key itself is encrypted with a public key (which can be exchanged via Diffie-Hellman or RSA).

- Only the valid recipient can decrypt and read the data.

### **4.3. Advantages of the combined Diffie-Hellman + AES model** 

| **Characteristic** | **Diffie-Hellman** | **AES** |
|:---|:---|:---|
| Purpose | Key exchange | Content encryption |
| Security based on | Discrete logarithm | Block transformation + rounds |
| Processing speed | Medium/slow | Fast (hardware-optimized) |
| Practicality | Very high (in TLS, E2EE) | Very high (in VPN, chat, IoT) |
| Deployment in real systems | Handshake protocol | Encrypting all transmitted data |

Combining these two algorithms is an ideal solution for any system that needs security, from small scale (a simple chat app) to large scale (network infrastructure, enterprise, distributed systems).

### **4.4. Limitations and future directions** 

Although very powerful, this model still has a few limitations:

- Diffie-Hellman needs accompanying authentication to prevent man-in-the-middle attacks. So in practice it's usually combined with digital signatures or digital certificates.

- The AES key needs to be managed carefully to avoid being exposed or reused improperly.

Current development directions focus on:

- Using Diffie-Hellman over elliptic curves (ECDH) to increase security with a shorter key length.

- Applying multi-device synchronized encryption (multi-device E2EE) as in Signal, so users can securely access data from multiple devices.

## V. PROGRAM DEMO

The end-to-end encryption model has been implemented in Java through a sample program. The demo's goals are:

- Simulate the key-exchange process between two parties (Alice and Bob)

- Generate a shared key and encrypt the message content using AES

- Check the encryption/decryption results to verify the system's correctness

### **5.1. Interaction model between the two parties** 

The program simulates the process of sending a message between two users: Alice (sender) and Bob (recipient). Both users:

- Generate their own private key

- Exchange public keys with each other

- Compute the shared secret key

- Use the shared key to encrypt and decrypt the message

All operations are performed in a Java console environment with simulated input.

### **5.2. Detailed steps** 

![C:\Users\ADMIN\Desktop\1.jpg](/images/post/2025-07-18-diffie-hellman/3.webp)

#### Step 1: Initialize the public values

> The user enters values for:
> - $p$ -- a large prime number (for example: 23, 104729,...)
> - $g$ -- a primitive root $modulo$ $p$ (for example: 3, 17, 456,..)

#### Step 2: Each side chooses a private key

Alice and Bob each choose a private key, for example:

- Alice: $a = 6$

- Bob: $b = 15$

#### Step 3: Compute the public key

- Alice computes $A\  = \ g^{a}\ mod\,\, p$

- Bob computes $B\  = \ g^{b}\ mod\,\, p$

> They then exchange public keys.

#### Step 4: Compute the shared key

- Alice computes $K\  = \ B^{a}\ mod\,\, p\$

- Bob computes $K = A^{b}\ mod\,\, p$

Both end up with the same shared key, for example: sharedKey = 2.

#### Step 5: Generate the AES key from the shared key

The sharedKey is converted into a byte string, then hashed with SHA-256. The result is a 256-bit array. We take the first 128 bits (16 bytes) to create the SecretKey for AES.

#### Step 6: Encrypt the message

Alice enters a message, for example:

`"Hi Bob, this is a secret message."`

Then the AES class is used to encrypt this string into an unreadable byte array.

#### Step 7: Bob decrypts the message

Bob uses the same AES key to decrypt the encrypted message. If every step was done correctly, Bob will receive exactly the original message.

### **5.3. Illustrated results** 

Example input:

- $p = 16729$, $g = 456$

- Alice chooses $a = 13$, Bob chooses $b = 19$

- Alice's public key: $456^{13}\ mod\ 16729 = 9778$

- Bob's public key: $456^{19}\ mod\ 16729\  = \ 14526$

- Shared key:

  - Alice: $K\  = \ B^{a}\ mod\ p\  = \ 14526^{13}\ mod\ 16729$

  - Bob: $K\  = \ A^{b}\ mod\ p\  = \ 9778^{19}\ mod\ 16729$

<!-- -->

- $K\  = \ 6576$

Encryption result:

Original message: Hi, Are you ok?

Encrypted data: returned as a Base64 string

- `\[ 120, 210, 33, 0, \... \]` in bytes form
- `\"Sy3jW2SFD8be/Yj5nBct/\...\"` base64

Message after decryption: Hi, Are you ok?

### **5.4. Program interface**

The program currently runs on the Command Line Interface (CLI) with a sequential processing flow:


1\. Enter values $p$, $g$

2\. Enter Alice's and Bob's private keys

3\. Display the public keys

4\. Compute and display the shared key

5\. Enter the message content

6\. Encrypt and decrypt the message

![C:\Users\ADMIN\Desktop\2.jpg](/images/post/2025-07-18-diffie-hellman/4.webp)

![C:\Users\ADMIN\Desktop\3.jpg](/images/post/2025-07-18-diffie-hellman/5.webp)

### **5.4. Program interface** 

The program currently runs on the Command Line Interface (CLI) with a sequential processing flow:

1\. Enter values p, g

2\. Enter Alice's and Bob's private keys

3\. Display the public keys

4\. Compute and display the shared key

5\. Enter the message content

6\. Encrypt and decrypt the message

Additionally, the program can easily be extended with a graphical interface (Java Swing or JavaFX) so users can perform operations through buttons and text boxes.

### **5.5. Testing and stability** 

The program was tested with many different key sets (p, g, a, b) and it was observed that:

- The system computes the correct shared key in every valid case.

- Data is encrypted and decrypted correctly.

- AES operates stably across many different string lengths.

In practice, p and g should be generated randomly using secure libraries (such as BouncyCastle or the Java Security API) and should be at least 2048 bits long to avoid security risks.

## VI. CONCLUSION

This topic researches, analyzes, and implements an end-to-end message encryption model based on the Diffie-Hellman algorithm combined with the AES symmetric encryption algorithm. The model is built to ensure separation between the key-establishment process and the content-encryption process — a security strategy applied in most modern secure communication systems today.

Through implementing and demoing this in the Java programming language:

- The full secret key-exchange process between two parties via the Diffie-Hellman protocol was recreated.

- The AES key was generated from the shared key, ensuring a suitable format and length.

- Message content was encrypted and decrypted with fast speed and high accuracy.

- The system's correctness was verified by comparing the input and output data.

- From this model, we can draw several important conclusions:

- Security: The shared key is never exchanged directly. Even if an attacker monitors the entire public communication, they still can't compute the key without knowing the private key.

- Efficiency: The AES encryption process performs very well, suitable for real-time applications such as messaging and IoT.

- Extensibility: The program can easily be extended with a user interface, or connected over a network to transmit real messages between two machines.

However, to apply this at a large scale in an open network environment, the system needs to:

- Be combined with authentication mechanisms (such as digital certificates, electronic signatures) to prevent man-in-the-middle attacks.

- Upgrade the Diffie-Hellman algorithm to the elliptic-curve variant (ECDH) to achieve equivalent security with a shorter key, suitable for mobile devices or IoT.

- Implement protection of the AES key in memory to defend against memory-analysis techniques.

Overall, the combined Diffie-Hellman + AES model is a very sound approach for systems that need integrity, high performance, and flexible deployment.


### **References**

1.  Diffie, W., & Hellman, M. (1976). New Directions in Cryptography. IEEE Transactions on Information Theory.

2.  National Institute of Standards and Technology (NIST). (2001). FIPS PUB 197 -- Advanced Encryption Standard (AES).

3.  Bruce Schneier. (1996). Applied Cryptography: Protocols, Algorithms, and Source Code in C. John Wiley & Sons.

4.  Java Platform SE API Specification, javax.crypto & java.math.BigInteger -- Oracle Corporation.

5.  Wikipedia: [Diffie--Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange), [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).

6.  Signal Protocol Documentation -- Open Whisper Systems.

7.  ECDH -- Elliptic Curve Diffie--Hellman, Cryptography StackExchange.

8.  \"End-to-End Encryption in Practice\", Journal of Cybersecurity, 2020.
