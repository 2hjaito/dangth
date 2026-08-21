---
title: Xây dựng Json Web Token trong NodeJS
subtitle: Phân quyền và đăng nhập trong NodeJS
author: Trần Hữu Đang
date: "2023-10-20"
image: /images/post/2023-10-20-auth-jwt-nodejs/1.png
tags:
  - Backend
  - Authentication
  - Authorization
---

[JWT]() là một hình thức xác thực người dùng rất bảo mật, hiệu quả và phổ biến trong mô hình [CSR]()

![](/images/post/2023-10-20-auth-jwt-nodejs/1.png)

Trong lúc tự học NodeJS mình đã xây dựng một [SEAN app](#sean-app). Bạn có thể xem mã nguồn tại [đây](https://github.com/dangtranhuu/Rainbow-Flix)

Trong đó có chức năng Xác thực bằng **JWT** *(Json Web Token)*, mình sẽ cùng tìm hiểu trong bài viết hôm nay nhé!!!

Mình có một số lưu ý sau đây: 
- Bài viết hôm nay chỉ đề cập đến JWT trong NodeJS nên phải có kiến thức về cả [JWT]() và [NodeJS](/nodejs/) nhé 
- Bài viết này được mình lấy trực tiếp từ dự án đã xây dựng nên có gì chưa hiểu bạn hãy xem mã nguồn của dự án nhé

Okay bắt đầu thoy !!! 


<details>
<summary><b>Nội dung chính</b></summary>

<br>

<div class="scroll" style="width: 100%; overflow-x: auto; white-space: nowrap;">
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/2.png" alt="Nguyên lý" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/3.png" alt="Thành phần" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/4.png" alt="Tính chất lựa" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/5.png" alt="Ưu điểm" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/6.png" alt="Nhược điểm" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/7.png" alt="Bài tập" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/8.png" alt="Bài giải" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
</div>

</details>


## Xây dựng CSDL

![Diagram DB](/images/post/2023-10-20-auth-jwt-nodejs/djagram-rolesuser.png)

Như bạn thấy ở hình trên ta cần 3 Table chính liên quan đến người dùng gồm: **User** hay **Account**, **Roles** và **UserRole**.

<details>
<summary><b>Chi tiết:</b></summary>

**Users**: chứa danh sách người dùng  
**Roles**: chứa tất cả các quyền trong hệ thống  
**UserRole**: bảng trung gian liên kết N-N trong hệ thống

</details>

### Mã nguồn My-SQL

#### Account
```sql
CREATE TABLE `account` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `role` bit(1) NOT NULL,
  `liked` int(11) DEFAULT NULL,
  `shares` int(11) DEFAULT NULL,
  `isActive` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `account` (`username`, `fullname`, `password`, `email`, `image`, `role`, `liked`, `shares`, `isActive`) VALUES
('dangth', 'Trần Hữu Đang', '9999', 'dangtt135@gmail.com', 'dangth.png', b'1', 1, 0, b'1'),
('datnt', 'Nguyễn Tiến Đạt', 'datnt', 'datnt@gmail.com', 'datnt.png', b'0', 4, 0, b'1'),
('duyenttm', 'Trần Thị Mỹ Duyên', '123', 'duyenttm@gmail.com', 'duyenttm.png', b'0', 6, 3, b'1'),
('hanltn', 'Lê Thị Ngọc Hân', 'hanltn', 'hanltn@gmail.com', 'hanlth.png', b'0', 5, 0, b'1'),
('nganntd', 'Nguyễn Thị Diễm Ngân', 'ngan', 'nganntd@gmail.com', 'nganntd.png', b'0', 6, 1, b'1'),
('phuocnhh', 'Nguyễn Hoàng Hữu Phước', 'phuoc', 'phuoclhh@gmail.com', 'Phuocnhh.png', b'0', 6, 2, b'1');
```

#### Roles
```sql
CREATE TABLE `roles` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--------------------------------------
INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'ROLE_ADMIN', 'Quyền quản trị. Xem thống kê và tất cả quyền'),
(2, 'ROLE_MANAGER', 'Quyền quản lý. CRUD Video'),
(3, 'ROLE_USER', 'Quyền người dùng. Xem, thích, comment video');
```

#### UserRole

```sql
CREATE TABLE `userrole` (
  `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `username` varchar(50) NOT NULL,
  `roleid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
---------------------------
INSERT INTO `userrole` (`id`, `username`, `roleid`) VALUES
(1, 'dangth', 1),
(2, 'datnt', 3),
(4, 'duyenttm', 2),
(5, 'hanltn', 3),
(6, 'nganntd', 3),
(7, 'phuocnhh', 3);
```

Ta có thể lấy ra các thông tin và quyền của một **User** ứng với `email` và `password` bằng câu truy vấn sau:
```sql
SELECT 
	u.fullname, u.email, GROUP_CONCAT(r.name) AS roles
FROM roles r
INNER JOIN 
	userrole ur ON r.id = ur.roleid
INNER JOIN 
	account u ON ur.username like u.username
WHERE 
	u.email like '${email}' and u.password like '${password}' 
GROUP BY u.email;
```

Kết quả:

|Fullname|Email|Roles|
|--------|-----|-----|
|Trần Hữu Đang|dangtt135@gmail.com|ROLE_ADMIN, ROLE_MANAGER|
|Nguyễn Văn Du Sơ|sonvd@gmail.com|ROLE_USER|
|Nguyễn Nhân Viên|viennn@gmail.com|ROLE_STAFF|



## Tạo dự án

### Tạo dự án với Express
```cmd
npm install express --save
npm install express
npm install express-generator -g
cd /var/www/
express expressjs
cd expressjs
npm install
```

### Cài đặt thư viện cần thiết
```cmd
npm i -save mysql	
npm i -save jsonwebtoken
npm i -save dotenv
```


> [!INFO]
> **mysql**: kết nối và truy vấn CSDL
>
> **jsonwebtoken**: làm việc với Json Web Token
>
> **dotenv**: khởi tạo biến môi trường cho phần [SECRET KEY](/post/2023-10-20-auth-jwt-nodejs/#token) cho Token


## Lập trình back-end

### Khởi tạo SECRET KEY

Tạo file `.env` trong package `server/.env`

```js
ACCESS_TOKEN_SECRET = dangth1210
```

### Xây dựng JWT Model

Xây dựng lớp `JwtModel` trong package `server/models/JwtModel.js`


Viết 2 hàm là **generateToken** để tạo ra [AccessToken](/post/2023-10-20-auth-jwt-nodejs/#token) và **generateRefreshToken** để tạo [RefreshToken](/post/2023-10-20-auth-jwt-nodejs/#token).

```js
var jwt = require('jsonwebtoken');
var dotent = require('dotenv');
dotent.config();

class JwtModel {
	static generateToken(data, time) {
		return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time });
	}

	static generateRefreshToken(data, time) {
		return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time });
	}
}

module.exports = JwtModel;
```

- **data**: là đối tượng muốn khởi tạo JWT

- **process.env.ACCESS_TOKEN_SECRET**: là `SECRET KEY` của JWT

- **expiresIn**: là thời gian tồn tại của JWT

### Xây dựng User Model

Xây dựng lớp `UserModel` trong package `server/models/UserModel.js`

```js
var db = require('./database');

var queryLogin = ((email, password) =>
	`SELECT u.fullname, u.email, GROUP_CONCAT(r.name) AS roles
	FROM roles r
	INNER JOIN userrole ur ON r.id = ur.roleid
	INNER JOIN account u ON ur.username like u.username
	WHERE u.email like '${email}' and u.password like '${password}' 
	GROUP BY u.email;`
)

class UserModel {
	static login(user) {
		console.log("getdatabase: " + { user });
		return new Promise((resolve, reject) => {
			let sql = queryLogin(user.email, user.password);
			console.log(user);
			db.query(sql, function (err, data) {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});
	}
}

module.exports = UserModel;
```

Model gồm có:
- Một câu lệnh [T-SQL]() để truy vấn với MySQL
	- Tham số nhận vào: `email` và `password`.
	- Dữ liệu trả về: `fullname`, `email` của `User` và một mảng tập hợp các `role` của `User` đó.
- Một hàm `login` để đăng nhập, hàm sẽ gọi tới câu truy vấn ở trên và trả về cả đối tượng `User` nếu có tồn tại trong Database.

### Xây dựng User Controller

Tạo lớp `UserController` trong pakage `server/controllers/UserController.js`

```js
const UserModel = require('../models/userModel');
var jwtModel = require('../models/jwtModel');

class UserController {
	static async login(req, res) {
		try {
			const user = await UserModel.login(req.body);
			if (user.length = 0) {
				return res.status(404).json({ error: 'User not found' });
			}
			let userRes = {
				email: user[0].email,
				roles: user[0].roles.split(',') 
				// "ROLE_ADMIN,ROLE_USER" -> ["ROLE_ADMIN", "ROLE_USER"]
			}
			console.log(userRes);
			const accessToken = jwtModel.generateToken(userRes, '5h');
			const refreshToken = jwtModel.generateRefreshToken(userRes, '10h');
			let resp = {
				fullname: user[0].fullname,
				token: accessToken,
				refreshToken: refreshToken
			}
			res.json(resp);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}

module.exports = UserController;
```

Viết hàm `login` để thực hiện login khi có Request đưa tới

### Xây dựng Router Login 

Tạo lớp login trong package `server/routes/login.js` để bắt Request có url là [http://localhost:8080/login/token](http://localhost:8080/login/token)

```js
var express = require('express');
var router = express.Router();
var loginCtrl = require('../controllers/UserController');

/* GET users listing. */
router.get('/', loginCtrl.getUser);
/* 
	RETURN: Token when login success
	{
		fullname: Tran Huu Dang
		token: eyhsujbjsv...nsje
		refreshToken: eyvkdnrks...jujee
	}
*/
router.post('/', (req, res) => {
	loginCtrl.login(req, res);
});


module.exports = router;
```

## Lập trình Front-end

Trong ứng dụng gốc mình đã sử dụng [**Angular**]() để xây dựng *(nếu bạn thấy nó được viết bằng [**AngularJS**]() thì nghĩa là bản cũ nhé)*

Mình sẽ hướng dẫn đơn giản nhất bằng [JQuery](/post/2023-10-20-auth-jwt-nodejs/#front-end) [ajax](/post/2023-10-20-auth-jwt-nodejs/#front-end) và [html](/post/2023-10-20-auth-jwt-nodejs/#front-end) thuần nhé!

### Xây dựng form đăng nhập

```html
<form id="loginForm">
	ĐĂNG NHẬP

	<input type="text" name="email" placeholder="Email">
	<input type="password" name="password" placeholder="Mật khẩu">

	<button class="login100-form-btn">
		Đăng nhập
	</button>
</form>
```

### Xây dựng hàm call API bằng JQuery

Mình đã xây dựng server chạy tại localhost và port 3000, bạn có thể tùy chỉnh cho phù hợp nhé

Ta sẽ lưu `Token` vào localstorage để truyền vào header của các `Request` sau nhé
```js
$(document).ready(function () {
	function delay(ms) {
		return new Promise(function (resolve) {
			setTimeout(resolve, ms);
		})
	}
	$("#loginForm").submit(function (e) {
		e.preventDefault(); // Ngăn chuyển hướng mặc định của form

		var formData = {
			email: $("input[name='email']").val(),
			password: $("input[name='password']").val()
		};

		$.ajax({
			url: 'http://localhost:3000/login',
			method: 'POST',
			data: formData,
			dataType: 'json',
			success: function (response) {
				console.log(response)
				//Này là thông báo với data nữa cần lưu data thì lây xài
				// xuất thông báo
				let lastname = response.fullname;
				alert('Chào ' + lastname);
				saveCookie('fullname', lastname.substring(lastname.lastIndexOf(" ")));
				localStorage.setItem('token', response.token);
				localStorage.setItem('refreshToken', response.refreshToken);
				//Cho 2s
				delay(2000).then(res => {
					// chuyển trang sau 2s
					window.location.href = "#/main";
				});
			},

			error: function (xhr, status, error) {
				// Xử lý lỗi
				console.error(error);
			}
		});
	});
});
```
## Chạy ứng dụng

### Chạy ứng dụng phía back-end

```js
npm start
```
Truy cập: [http://localhost:3000/](http://localhost:3000/)

Có thể test trên [Postman](/post/2023-10-20-auth-jwt-nodejs/#api)
![](/images/post/2023-10-20-auth-jwt-nodejs/loginapi.png)

## Chú thích

#### SEAN APP
- **SEAN**: Ý nói các ứng dụng web được xây dựng bằng <b style="color: green" >S</b>ql, <b style="color: green" >E</b>xpressJS, <b style="color: green" >A</b>ngular, <b style="color: green" >N</b>odejs 

#### Token
- **AccessToken**: *Token* đã được xác minh
- **RefreshToken**: *Token* dự bị khi nào *AccessToken* hết hạn thì *RefreshToken* sẽ được thay thế cho *Token* cũ
- **SECRET KEY**: Một thành phần quan trọng để *server* **kiểm tra tính hợp lệ** của *Token*
#### T-SQL
- **T-SQL**: một [ngôn ngữ lập trình]() phía *database* sử dụng các câu lệnh **SQL**

#### Front-end
- **Angular**: Một *Framework* phía Front-end được xây dựng bằng [TypeScript]()
- **JQuery**: thư viện của **JavaScript**
- **Ajax**: là phương thức trao đổi dữ liệu với máy chủ và cập nhật một hay nhiều phần của trang web, hoàn toàn *không reload lại toàn bộ trang*. 
- **HTML**: ngôn ngữ đánh dấu, xây dựng website

#### API
- **Postman** là một công cụ hỗ trợ gửi và kiểm thử API một cách trực quan, phổ biến với lập trình viên backend và frontend. `Postman = Gửi request → Nhận response → Xem dữ liệu → Test nhanh API`
-----

Xin cảm ơn vì đã đọc bài viết, các bạn có thể để lại bình luận bên dưới nhé

Chúc các bạn một ngày học tập và làm việc vui vẻ, tốt lành