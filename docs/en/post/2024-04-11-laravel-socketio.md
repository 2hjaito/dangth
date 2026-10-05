---
layout: Post
title: Handling Real-time Data with Laravel and NodeJS
slug: xu-ly-du-lieu-thoi-gian-thuc-voi-laravel-va-nodejs
subtitle: How to use Socket.io in Laravel to build a realtime application
author: Trần Hữu Đang
date: "2024-04-11"
image: /images/post/2024-04-11-laravel-socketio/1.webp
tags: ["Backend","Web","Realtime"]

---

<!-- <img src="https://count-viewer.vercel.app//api/blog/view?url=https://davisupers.web.app/post/back-end/laravel-socketio" alt="Image 1" style="float: left"> -->

![](/images/post/2024-04-11-laravel-socketio/1.webp)


I once worked on a project to manage notifications sent to users. For web apps using Java or NodeJS, this is fairly straightforward. PHP, on the other hand, doesn't seem to support this very well.

Recently, Laravel released version 9 with built-in Socket support; however, since it just came out, I was a bit hesitant about it.

While researching, I found out that with older versions, you'd have to set up NodeJS as a second server platform and also install IORedis to make data run faster.

Really????? You know what I mean — that's genuinely quite impractical to deploy!!!!

I tried building a server that could handle realtime processing over ports instead of setting up an entire Cache just for notifications. Let's explore this together in this article

## 1. What is Socket.io in Laravel?

Socket.io in Laravel

Socket.io is a JavaScript library that enables two-way, realtime communication between client and server through events and messages. In Laravel, we can use Socket.io to build realtime applications on the PHP platform.


Laravel WebSockets is a package that lets you create a websocket connection between client and server to send and receive messages in realtime. Laravel WebSockets uses Socket.io as a mechanism for handling events and messages between client and server.

By using Socket.io in Laravel, we can build realtime applications like chat, realtime notifications, and other applications on the PHP platform easily and effectively.

## 2. Why is Socket.io used in Laravel?
Socket.io is a JavaScript library that enables two-way, realtime communication between client and server through events and messages. In Laravel, we can use Socket.io to build realtime applications on the PHP platform.

Socket.io allows sending and receiving messages between client and server in realtime, enabling realtime applications like chat, realtime notifications, and other applications to be built on the PHP platform. It also lets client and server communicate with each other quickly and efficiently, ensuring the application scales better.

In Laravel, we can use Laravel WebSockets, a package that lets you create a websocket connection between client and server to send and receive messages in realtime. Laravel WebSockets uses Socket.io as a mechanism for handling events and messages between client and server. So, using Socket.io in Laravel makes building realtime applications on the PHP platform easier and more effective.

## 3. How to use Socket.io in Laravel


Let's set up a notification project using SocketIO and Laravel as follows:

#### Creating the Laravel project

```bash
composer create-project --prefer-dist laravel/laravel tên_dự_án
```

Once the project is created, you can give it a test run

```bash
php artisan serve
```

If everything's OK, we'll move to step two: setting up the NodeJS environment for it

#### Integrating NodeJS

First, you need to configure a NodeJS server right at the project's root path

```bash
npm install cookie-parser csurf express socket.io 
```

:::info LIBRARIES
- `cookie-parser`, `csurf` let the Laravel and NodeJS servers communicate through an API
- `express` provides a standard way to write APIs, making NodeJS configuration more convenient
- `socket.io` helps emit data back to the client in realtime
:::

I'll set up a few required environment variables for NodeJS

```.env
SERVER_ORIGIN=http://localhost:8000
```

Once installed successfully, you'll write a NodeJS server configuration file like this:

**server.js**
```js
const express = require('express');
const axios = require('axios');
const app = express();
const server = require('http').createServer(app);

server.listen(3000, () => {
  console.log('Server is running');
});
```

You can run the application, and if everything's OK, we'll configure SocketIO for the NodeJS server

**server.js**

```js
const io = require('socket.io')(server, {
  cors: { origin: proccess.env.SERVER_ORIGIN }
});

io.on('connection', (socket) => {
  socket.on('sendChatToServer', async (message) => {
    try {
      const responseData = await sendDataToLaravel(message);
      console.log('Data sent to Laravel successfully:', responseData);
      const noti = `User ${responseData.response.id} vừa tăng ${responseData.response.scope} điểm`;
      socket.broadcast.emit('sendChatToClient', noti);
    } catch (error) {
      console.error('Failed to send data to Laravel:', error.message);
    }
  });
  socket.on('disconnect', () => {
    console.log('Disconnect');
  });
});
```

:::details server.js
```js
const express = require('express');
const axios = require('axios');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: proccess.env.SERVER_ORIGIN }
});


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Sử dụng csrf middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Middleware để gửi CSRF token cho client
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

async function sendDataToLaravel(data, req) {
  try {
    console.log(data)
    const url = `${proccess.env.SERVER_ORIGIN}/scope?name=${data.id}&scope=${data.scope}`;
    const response = await axios.post(url, data, {
      headers: {
        'X-CSRF-TOKEN': req.cookies['XSRF-TOKEN']
      }
    });
    console.log('Response from Laravel:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending data to Laravel:', error.message);
    throw error;
  }
}

io.on('connection', (socket) => {
  console.log('connection');

  socket.on('sendChatToServer', async (message) => {
    try {
      const responseData = await sendDataToLaravel(message);
      console.log('Data sent to Laravel successfully:', responseData);
      const noti = `User ${responseData.response.id} vừa tăng ${responseData.response.scope} điểm`;
      socket.broadcast.emit('sendChatToClient', noti);
    } catch (error) {
      console.error('Failed to send data to Laravel:', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnect');
  });
});

server.listen(3000, () => {
  console.log('Server is running');
});
```
:::


Once NodeJS is fully configured, we'll build the Laravel application

#### Writing the handling Controller

Write your code according to your own requirements and call it from NodeJS

**/app/Http/Controllers/EmitScope.php**

```php
public function sendDataToNode(Request $request)
{
  try{
    // Lấy giá trị của tham số 'id' từ yêu cầu POST, nếu không có thì sử dụng giá trị mặc định 'default_value'
    $id = $request->input('id', 'default_value');
    $scope = $request->input('scope', 'default_value');

    if ($user) {
      // Xử lý
      $data = [
        'id' => $user->id,
        'scope' => $user->scope
      ];
    } else {
      // Xử lý
      $data = [
        'id' => $id,
        'scope' => $scope
      ];
    }
    return response()->json([
        'message' => 'successfully',
        'response' => $data
    ]);
  } catch (Exception $e) {
    return response()->json(['error' => $e], 500);
  }
}
```

#### Writing the Router to call the API

**/routes/web.php**

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmitScope;

Route::get('/', function () {
  return view('welcome');
});

Route::get('/scope', function () {
  return view('scope');
});

Route::post('/scope', [EmitScope::class, 'sendDataToNode']);
```


#### Calling the API from NodeJS

Call the API from NodeJS to Laravel and return the result to the Client

**server.js**

```js
const url = `http://127.0.0.1:8000/scope?name=${data.id}&scope=${data.scope}`;
    const response = await axios.post(url, data, {
      console.log('Data sent to Laravel successfully:', responseData);
      const noti = `User ${responseData.response.id} vừa tăng ${responseData.response.scope} điểm`;
      socket.broadcast.emit('sendChatToClient', noti);
    });
```


## Conclusion

So that's how I built a Laravel server that handles realtime processing using NodeJS + SocketIO... It's fairly complex because PHP doesn't support Sockets very well

:::tip Source code
You can also check out the original source code of my project [here](https://github.com/theanishtar/realtime-scope)
:::


I hope this article is useful to you ^^


<img src="https://count-viewer.vercel.app//api/blog/view?url=https://davisupers.web.app/post/back-end/laravel-socketio" alt="Image 1" style="float: left">
