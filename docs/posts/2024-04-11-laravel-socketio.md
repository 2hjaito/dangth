---
layout: Post
title: Xử lý dữ liệu thời gian thực với Laravel và NodeJS
subtitle: Cách dùng Socket.io trong Laravel để tạo ứng dụng realtime
author: Trần Hữu Đang
date: "2024-04-11"
image: /images/post/2024-04-11-laravel-socketio/1.png
tags: ["Backend","Web","Realtime"]

---

<!-- <img src="https://count-viewer.vercel.app//api/blog/view?url=https://davisupers.web.app/post/back-end/laravel-socketio" alt="Image 1" style="float: left"> -->

![](/images/post/2024-04-11-laravel-socketio/1.png)


Mình có từng làm qua một dự án để quản lí các thông báo đến User. Đối với các webapp sử dụng Java hoặc NodeJS thì điểu này khá dễ dàng. Trong khi đó PHP có vẻ chưa hỗ trợ tốt lắm.

Mới đây Laravel đã ra mắt version 9 có tích hợp Socket, tuy nhiên vừa ra mắt nên mình khá phân vân.

Trong lúc tìm hiểu thì mình được biết các version cũ sẽ phải cài đặt NodeJS làm nền tảng server thứ hai và phải cài cả IORedis để chạy dữ liệu được nhanh hơn. 

Really????? Bạn hiểu ý mình chứ, nó thật sự rất không khả thi nếu triển khai !!!!

Mình đã cố gắng xây dựng một server có thể xử lý realtime qua các port thay vì phải cài cả một Cache cho việc thông báo. Hãy cùng mình tìm hiểu trong bài viết này nhé

## 1. Socket.io trong Laravel là gì?

Socket.io trong Laravel

Socket.io là một thư viện JavaScript cho phép giao tiếp hai chiều giữa client và server trong thời gian thực thông qua các sự kiện và tin nhắn. Trong Laravel, chúng ta có thể sử dụng Socket.io để xây dựng các ứng dụng thời gian thực trên nền tảng PHP.


Laravel WebSockets là một package cho phép tạo kết nối websocket giữa client và server để gửi và nhận các tin nhắn trong thời gian thực. Laravel WebSockets sử dụng Socket.io như là một cơ chế để xử lý các sự kiện và tin nhắn giữa client và server.

Với sử dụng Socket.io trong Laravel, chúng ta có thể xây dựng các ứng dụng thời gian thực như chat, thông báo thời gian thực và các ứng dụng khác trên nền tảng PHP một cách dễ dàng và hiệu quả.

## 2. Tại sao Socket.io được sử dụng trong Laravel?
Socket.io là một thư viện JavaScript cho phép giao tiếp hai chiều giữa client và server trong thời gian thực thông qua các sự kiện và tin nhắn. Trong Laravel, chúng ta có thể sử dụng Socket.io để xây dựng các ứng dụng thời gian thực trên nền tảng PHP.

Socket.io cho phép gửi và nhận các tin nhắn giữa client và server trong thời gian thực, cho phép các ứng dụng thời gian thực như chat, thông báo thời gian thực và các ứng dụng khác được xây dựng trên nền tảng PHP. Nó cũng cho phép client và server giao tiếp với nhau một cách nhanh chóng và hiệu quả, đảm bảo ứng dụng có khả năng mở rộng tốt hơn.

Trong Laravel, chúng ta có thể sử dụng Laravel WebSockets, một package cho phép tạo kết nối websocket giữa client và server để gửi và nhận các tin nhắn trong thời gian thực. Laravel WebSockets sử dụng Socket.io như là một cơ chế để xử lý các sự kiện và tin nhắn giữa client và server. Vì vậy, sử dụng Socket.io trong Laravel giúp cho việc xây dựng các ứng dụng thời gian thực trên nền tảng PHP trở nên dễ dàng và hiệu quả hơn.

## 3. Cách sử dụng Socket.io trong Laravel


Ta sẽ tiến hành khởi tạo dự án thông báo sử dụng SocketIO và Laravel như sau:

#### Tạo dự án Laravel

```bash
composer create-project --prefer-dist laravel/laravel tên_dự_án
```

Khi tạo xong dự án bạn có thể chạy thử

```bash
php artisan serve
```

Nếu mọi thứ OK ta sẽ chuyển sang bước hai, tạo môi trường NodeJS cho nó

#### Tích hợp NodeJS

Đầu tiên bạn phải cấu hình một server NodeJS ngay đường dẫn gốc của dự án

```bash
npm install cookie-parser csurf express socket.io 
```

:::info THƯ VIỆN
- `cookie-parser`, `csurf` giúp server Laravel và NodeJS có thể giao tiếp thông qua API
- `express` cung cấp chuẩn viết các API, cấu hình NodeJS tiện lợi hơn
- `sockt.io` giúp emit dữ liệu về client theo thời gian thực
:::

Mình sẽ setup một số biến môi trường cần thiết cho NodeJS

```.env
SERVER_ORIGIN=http://localhost:8000
```

Khi đã cài đặt thành công bạn sẽ viết một file cấu hình server NodeJS như sau:

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

Bạn có thể chạy ứng dụng, nếu mọi thứ đều OK ta sẽ cấu hình SocketIO cho server NodeJS

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


Sau khi hoàn tất việc cấu hình NodeJS ta sẽ xây dựng ứng dụng Laravel

#### Viết Controller xử lý

Các bạn cứ viết code theo yêu cầu của mình và gọi nó bằng NodeJS nhé

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

#### Viết Router gọi API

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


#### Gọi API từ NodeJS

Gọi API từ NodeJS đến Laravel và trả về Client

**server.js**

```js
const url = `http://127.0.0.1:8000/scope?name=${data.id}&scope=${data.scope}`;
    const response = await axios.post(url, data, {
      console.log('Data sent to Laravel successfully:', responseData);
      const noti = `User ${responseData.response.id} vừa tăng ${responseData.response.scope} điểm`;
      socket.broadcast.emit('sendChatToClient', noti);
    });
```


## Tổng kết

Vậy là mình đã xây dựng xong một server Laravel giúp xử lý thờ gian thực bằng NodeJS + SocketIO... Nó sẽ khá phức tạp vì PHP không hỗ trợ tốt Socket

:::tip Mã nguồn
Bạn cũng có thể xem mã nguồn gốc dự án cuả mình tại [đây](https://github.com/theanishtar/realtime-scope)
:::


Mong bài viết hữu ích đến bạn ^^


<img src="https://count-viewer.vercel.app//api/blog/view?url=https://davisupers.web.app/post/back-end/laravel-socketio" alt="Image 1" style="float: left">
