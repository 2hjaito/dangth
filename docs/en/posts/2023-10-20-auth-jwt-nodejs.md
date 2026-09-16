---
title: Building Json Web Token in NodeJS
slug: xay-dung-json-web-token-trong-nodejs
subtitle: Authorization and login in NodeJS
author: Trần Hữu Đang
date: "2023-10-20"
image: /images/post/2023-10-20-auth-jwt-nodejs/1.png
tags:
  - Backend
  - Authentication
  - Authorization
---

[JWT]() is a very secure, effective, and popular user authentication method in the [CSR]() model.

![](/images/post/2023-10-20-auth-jwt-nodejs/1.png)

While teaching myself NodeJS, I built a [SEAN app](#sean-app). You can view the source code [here](https://github.com/dangtranhuu/Rainbow-Flix)

It includes an authentication feature using **JWT** *(Json Web Token)*, which we'll explore together in today's post!!!

A few notes:
- Today's article only covers JWT within NodeJS, so you'll need some background in both [JWT]() and [NodeJS](/nodejs/)
- This article is taken directly from the project I built, so if anything is unclear, check the project's source code

Okay, let's get started !!!


<details>
<summary><b>Main content</b></summary>

<br>

<div class="scroll" style="width: 100%; overflow-x: auto; white-space: nowrap;">
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/2.png" alt="Principle" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/3.png" alt="Components" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/4.png" alt="Chosen properties" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/5.png" alt="Advantages" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/6.png" alt="Disadvantages" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/7.png" alt="Exercise" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
  <div style="display: inline-block; margin-right: 15px;">
    <images post/src="/images/post/2023-10-20-auth-jwt-nodejs/8.png" alt="Solution" style="width:500px; height:50%;object-fit: cover; margin:0px;">
  </div>
</div>

</details>


## Building the database

![Diagram DB](/images/post/2023-10-20-auth-jwt-nodejs/djagram-rolesuser.png)

As you can see in the picture above, we need 3 main tables related to users: **User** (or **Account**), **Roles**, and **UserRole**.

<details>
<summary><b>Details:</b></summary>

**Users**: holds the list of users
**Roles**: holds all the permissions in the system
**UserRole**: the N-N join table linking them together

</details>


### My-SQL source code

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

We can retrieve a **User**'s information and permissions matching an `email` and `password` with the following query:
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

Result:

|Fullname|Email|Roles|
|--------|-----|-----|
|Trần Hữu Đang|dangtt135@gmail.com|ROLE_ADMIN, ROLE_MANAGER|
|Nguyễn Văn Du Sơ|sonvd@gmail.com|ROLE_USER|
|Nguyễn Nhân Viên|viennn@gmail.com|ROLE_STAFF|



## Creating the project

### Creating a project with Express
```cmd
npm install express --save
npm install express
npm install express-generator -g
cd /var/www/
express expressjs
cd expressjs
npm install
```

### Installing the required libraries
```cmd
npm i -save mysql	
npm i -save jsonwebtoken
npm i -save dotenv
```


> [!INFO]
> **mysql**: connects to and queries the database
>
> **jsonwebtoken**: works with the Json Web Token
>
> **dotenv**: initializes the environment variable for the [SECRET KEY](/post/2023-10-20-auth-jwt-nodejs/#token) used by the Token


## Backend development

### Initializing the SECRET KEY

Create a `.env` file inside the `server/.env` package

```js
ACCESS_TOKEN_SECRET = dangth1210
```

### Building the JWT Model

Build the `JwtModel` class inside the `server/models/JwtModel.js` package


Write two functions: **generateToken** to create the [AccessToken](/post/2023-10-20-auth-jwt-nodejs/#token), and **generateRefreshToken** to create the [RefreshToken](/post/2023-10-20-auth-jwt-nodejs/#token).

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

- **data**: the object we want to build the JWT from

- **process.env.ACCESS_TOKEN_SECRET**: the JWT's `SECRET KEY`

- **expiresIn**: the JWT's lifetime

### Building the User Model

Build the `UserModel` class inside the `server/models/UserModel.js` package

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

The model consists of:
- A [T-SQL]() statement to query MySQL
	- Input parameters: `email` and `password`.
	- Returned data: the `User`'s `fullname`, `email`, and an array collecting that `User`'s `role`s.
- A `login` function that logs in — it calls the query above and returns the `User` object if it exists in the Database.

### Building the User Controller

Create the `UserController` class inside the `server/controllers/UserController.js` package

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

Write the `login` function to handle login when a Request comes in

### Building the Login Router

Create the login class inside the `server/routes/login.js` package to catch Requests to the url [http://localhost:8080/login/token](http://localhost:8080/login/token)

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

## Frontend development

In the original application I used [**Angular**]() to build it *(if you see it written with [**AngularJS**](), that's an older version)*

I'll walk through the simplest approach using [JQuery](/post/2023-10-20-auth-jwt-nodejs/#front-end), [ajax](/post/2023-10-20-auth-jwt-nodejs/#front-end), and plain [html](/post/2023-10-20-auth-jwt-nodejs/#front-end)!

### Building the login form

```html
<form id="loginForm">
	LOGIN

	<input type="text" name="email" placeholder="Email">
	<input type="password" name="password" placeholder="Password">

	<button class="login100-form-btn">
		Log in
	</button>
</form>
```

### Building the API call function with JQuery

I've set up a server running on localhost, port 3000; feel free to adjust it as needed

We'll store the `Token` in localStorage so it can be passed in the header of subsequent `Request`s
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
## Running the application

### Running the backend application

```js
npm start
```
Visit: [http://localhost:3000/](http://localhost:3000/)

You can test it on [Postman](/post/2023-10-20-auth-jwt-nodejs/#api)
![](/images/post/2023-10-20-auth-jwt-nodejs/loginapi.png)

## Notes

#### SEAN APP
- **SEAN**: refers to web applications built with <b style="color: green" >S</b>ql, <b style="color: green" >E</b>xpressJS, <b style="color: green" >A</b>ngular, <b style="color: green" >N</b>odejs

#### Token
- **AccessToken**: a *Token* that has been verified
- **RefreshToken**: a backup *Token* — when the *AccessToken* expires, the *RefreshToken* replaces the old *Token*
- **SECRET KEY**: an important component the *server* uses to **verify the validity** of a *Token*
#### T-SQL
- **T-SQL**: a database-side [programming language]() that uses **SQL** statements

#### Front-end
- **Angular**: a Front-end *Framework* built with [TypeScript]()
- **JQuery**: a **JavaScript** library
- **Ajax**: a method for exchanging data with the server and updating one or more parts of a page *without reloading the entire page*.
- **HTML**: the markup language used to build websites

#### API
- **Postman** is a tool that helps you send and test APIs visually, popular with both backend and frontend developers. `Postman = Send request → Receive response → View data → Quickly test APIs`
-----

Thank you for reading this article, feel free to leave a comment below

Chúc các bạn một ngày học tập và làm việc vui vẻ, tốt lành