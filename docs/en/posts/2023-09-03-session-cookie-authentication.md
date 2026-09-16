---
title: Understanding Session and Cookie in User Authentication
slug: tim-hieu-ve-session-cookie-trong-xac-thuc-nguoi-dung
subtitle: What are Session and Cookie?
author: Trần Hữu Đang
date: "2023-09-03"
image: /images/post/2023-09-03-session-cookie-authentication/1.png
tags:
  - Backend
  - Authentication
  - Authoriztion
---
	

In the [CSR]() (Client-Side Rendering) model, storing user information is usually determined through the value of a Session...

<!-- more -->
So what exactly is a Session, and what is a Cookie? Why do we need two whole concepts for a single job?


![](/images/post/2023-09-03-session-cookie-authentication/1.png)
## Concepts

First, let's go through the concepts, then walk through some concrete cases!
### Session

**Session** is an important concept used to track and manage a user's state throughout the time they interact with a web application.

**Session** allows temporary information related to a specific user to be stored across HTTP requests (page visits).

<!-- <div style="border-left: 4px solid #00cc88; padding-left: 1rem; background:rgba(240, 255, 248, 0);">
<strong>💡 IN SHORT</strong><br/>
To put it more clearly, a **Session** is essentially a memory area on the [Server]() and that memory only disappears when the server is restarted or when it is cleared due to expiration.
</div> -->

> [!TIP] **IN SHORT**
> To put it more clearly, a **Session** is essentially a memory area on the [Server]() and that memory only disappears when the server is restarted or when it is cleared due to expiration.

Here are a few properties of Session. Just a few, since there are quite a lot and you can always look up more.

|Session ID (Session Identifier)|Session Timeout|Path|Domain|Session Cluster|
|-|-|-|-|-|
|This is a unique value used to identify a specific session. The Session ID is usually generated randomly and attached to each session so the server can recognize the user's session. The Session ID is typically stored in a cookie or in the URL.|This is the length of time a session stays alive after the user's last interaction with the website. Once this time expires, the session is destroyed and its information is cleared.|Path defines the path on the website that the session cookie applies to. Only requests to these paths will send the session cookie along.|Domain defines the domain the session cookie applies to. If not specified, the session cookie only applies to the current website's domain.|If your application runs across a multi-server environment, session clustering lets you share session data between servers, keeping user state consistent.|



### Cookie
**Cookie** is a piece of storage kept in the **Browser** (*Chrome, Cốc Cốc, Edge, etc.*). **Cookie** is similar to *local storage* or *session storage*, but the biggest difference is that a **Cookie** can delete itself automatically once it passes its allowed lifetime.

Example: I create a **Cookie** named `dangdepzai` and *set* its lifetime to `20m`. After exactly 20 minutes it will be removed from the browser.

Here are a few properties of **Cookie**. Just a few, since there are quite a lot and you can always look up more.
|Name|Value|Expires or Max-Age|Path|Domain|
|----------|---------------|----------------------------------------|----|------|
|This is the cookie's name, used to identify the cookie when it's sent between the server and the browser. The cookie name must be unique per domain.|This is the data stored inside the cookie. This value can be any data you want to store, for example: login info, a shopping cart, or a language setting.|This attribute defines how long the cookie will live on the user's machine. A cookie can be set to live for a fixed point in time (Expires) or for a number of seconds from creation (Max-Age). Once this time is up, the cookie is deleted.|Path defines the path on the website that the cookie applies to. The cookie is only sent on requests to these paths.|Domain defines the domain the cookie applies to. If not specified, the cookie applies to the current website's domain.|

## Example: a meat-shopping website

> OK, now that we understand Session and Cookie, let's work through the following scenario together!

---

**Step 1**. I visit a pork-shopping website called [webconlon.com]() and log in with the following information:

|Full name | Username | Password|
|---------|-----------|---------|
|Trần Hữu Đang| **dangdepzai**|*vodichvutru*|


**Step 2**. After logging in, I buy 2kg of pork shoulder and check out as usual.

|Product name | Quantity | Total|
|---------|-----------|---------|
|Pork shoulder| **2kg**|*200,000 VND*|
|Pork cheek| **1kg**|*90,000 VND*|

**Step 3**. After finishing the purchase, I click the ***Log out*** button.

---

> If you're a developer, how would you figure out who was logged in during step 1 and who placed the order in step 2?


<!-- <div style="border-left: 4px solid #00cc88; padding-left: 1rem; background:rgba(240, 255, 248, 0);">
<strong>💡 TIP</strong><br/>
If you understand Session, you might immediately answer that `we'll store the User data in a Session` and for later **Requests** *(purchasing, logging out)* we just fetch that Session.
</div> -->

> [!TIP]
> If you understand Session, you might immediately answer that `we'll store the User data in a Session` and for later **Requests** *(purchasing, logging out)* we just fetch that Session.

Correct! Very correct — but have you ever wondered how the Server knows which Session holds which User's data?

Here's the thing: once our system is rolled out to everyone, there will be many people shopping at the same time:
|Full name | Username | Password|
|---------|-----------|---------|
|Trần Hữu Đang| **dangdepzai**|*vodichvutru*|
|Đỗ Đạt Cao| **datcao123**|*passwordxyz*|
|Mai Thanh Toán| **thanhtoancc**|*password12*|

As you can see, if all of these users shop at the exact same time, how could the Server possibly know who's buying what?


<details>
<summary><strong>🤔 So how exactly does the Server know who's logged in and using a feature?</strong></summary>


- It's thanks to the **Cookie** and the automatic `SESSIONID` response mechanism built into every Server.
- This happens automatically, so unless you dig into it, you'd never notice. *(This mechanism can be fully disabled through server-side configuration.)*
</details>

## The execution flow

The mechanism above is carried out automatically, in a very simple way:

### Logging in and storing information
- In step 1 the client sends information (Username and Password) to the Server.
	- The Server checks the DB. If a match is found, it returns a *login successful!* message, and at the same time stores the User's information in a **Session** *(with data like the table below)*.

|SESSIONID|Name|Value|Expires|
|---------|---|------|-------|
|527735892654|CurrentUser|an Object or JSON containing the info of the User who just logged in|10h|

-
	- At this point the Server automatically sends a **Response** back to the **Browser** containing the SESSIONID of the newly created Session.

- The Browser stores that SESSIONID inside a **Cookie** *(with data like the table below)*. From then on, every subsequent Request just sends the SESSIONID along, and the Server will know who the User is.

|Name|Value|Expires|
|---------|---|-------|
|SESSIONID|527735892654|10h|

### Identifying the User via SESSIONID

- In step 2, we need to retrieve that **Session** *(the Server reads the SESSIONID from the Request's Header)* and compare it against the data stored on the **Server**.

> This happens automatically — all you need to do is retrieve the Session from the Request!

### Removing the User's information from the Server

- And similarly, in step 3, what we need to do is remove that Session from the **Server**.

> Note: The data above is just a simplified example — in practice there will be much more data.

If you're still not clear, check out the following image:

![](/images/post/2023-09-03-session-cookie-authentication/2.png)

## Conclusion

That's everything I wanted to share. Feel free to leave a comment below 👇, and don't hesitate to share feedback if anything in this article isn't quite right.

Cảm ơn các bạn! Chúc các bạn một ngày tốt lành!