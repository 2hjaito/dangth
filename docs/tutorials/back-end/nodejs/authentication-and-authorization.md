
# Bài 7. Xác thực và xác nhận người dùng

## Nội dung chính

*   [A. Giới thiệu Authentication trong NodeJS](#a-giới-thiệu-authentication-trong-nodejs)
    *   [Tại sao có authentication?](#tại-sao-co-authentication)
    *   [Authentication trong NodeJS hoạt động như thế nào?](#anthentication-trong-nodejs-hoạt-dộng-như-thế-nao)
*   [B. Chuẩn bị học Authentication trong NodeJS](#b-chuẩn-bị-học-authentication-trong-nodejs)
    *   [1\. Tạo database và table](#1-tạo-database-va-table)
    *   [2\. Tạo project và cài module](#3-tạo-project-va-cai-module-dể-thực-tập)
    *   [3\. Tạo model kết nối database](#4-tạo-model-kết-nối-database)
*   [C. Authentication trong NodeJS](#c-authentication-trong-nodejs)
    *   [1\. Đăng ký thành viên và mã hóa mật khẩu](#1-dang-ky-thanh-vien-va-ma-hoa-mật-khẩu)
        *   [a. Tạo route](#a-tạo-route)
        *   [b Tạo view đăng ký](#b-tạo-view)
        *   [c. Lưu thông tin user](#d-lưu-thong-tin-user)
        *   [d. Mã hóa mật khẩu của user](#f-ma-hoa-mật-khẩu-của-user)
    *   [2\. Đăng nhập và xử lý đăng nhập](#2-dang-nhập-va-xử-ly-dang-nhập)
        *   [a. Tạo route](#a-tạo-route)
        *   [b Tạo view](#b-tạo-view)
        *   [c. Xử lý đăng nhập](#d-xử-ly-dang-nhập)
        *   [d. Lưu session khi đăng nhập thành công](#e-lưu-biến-session-khi-dang-nhập-thanh-cong)
    *   [3\. Kiểm tra đăng nhập](#4-kiểm-tra-dang-nhập)
    *   [4\. Trở lại trang trước](#5-trở-lại-trang-trước)
    *   [5\. Thoát](#5-thoat)

## Giới thiệu Authentication trong NodeJS
-----------------------------------------

**Authentication trong NodeJS** là bài hướng dẫn bạn cách triển khai chức năng liên quan đến người dùng như đăng nhập, kiểm tra đăng nhập, mã khóa mật khẩu …

![gioi-thieu-authentication-trong-nodejs](https://github.com/danqth/images/blob/main/angurvad/nodejs/section7/gioi-thieu-authentication-trong-nodejs-1024x477.png?raw=true)

### Tại sao có authentication?

Bởi vì trong website, có những chức năng mà người dùng phải đăng nhập mới có thể sử dụng, ví dụ chức năng đặt hàng, quản lý sản phẩm, đổi mật khẩu, download tài liệu quan trọng… Authentication là thuật ngữ nói về việc tổ chức đăng nhập, đăng ký, kiểm tra đăng nhập, đăng xuất… của người dùng.

### Authentication trong NodeJS hoạt động như thế nào?

![hoat-dong-cua-autentication](https://github.com/danqth/images/blob/main/angurvad/nodejs/section7/hoat-dong-cua-autentication.png?raw=true)

Tổ chức hoạt động Autentication

B. Chuẩn bị học Authentication trong NodeJS
-------------------------------------------

### 1\. Tạo database và table

Bạn cần có 1 table chứa thông tin của người dùng, table sẽ có các các cột như username, password, email, họ tên…để lưu thông tin. Dữ liệu trong table này được dùng để so sánh với thông tin mà người dùng gửi lên khi đăng nhập, từ đó bạn sẽ biết được họ nhập thông tin có đúng không.

**Thực hiện:** Mời bạn tạo table có tên **users** trong database **shop** như đã thực hiện trong bài [Sử dụng Restful API NodeJS]() , nếu đã tạo table **users** rồi thì thôi khỏi tạo lại, dùng nó để thực hiện bài này luôn nhé.

### 2\. Tạo project và cài module

**– Tạo project:** Mở command prompt rồi chạy lệnh tạo project

```sh
express --view=ejs AuthenNodeJS
```


**– Cài module:** Chuyển vào folder mới tạo và chạy các lệnh cài đặt module cần thiết.

```sh
npm install
npm install mysql
npm install nodemon
```


### 3\. Tạo model kết nối database

Trong folder project, tạo folder tên **models** \+ tạo file models/**database.js** và code:

```js
var mysql = require('mysql'); 
var db = mysql.createConnection({   
    host: 'localhost', user: 'root', password: '',     
    database: 'shop' 
});  
db.connect(function(err) {    
   if (err) throw err;    
   console.log('Da ket noi database'); 
}); 
module.exports = db; 
```


### 1\. Đăng ký thành viên và mã hóa mật khẩu

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section7/image-38-1024x420.png?raw=true)

#### a. Tạo route

– Mở app.js và thêm code khai báo route cho controller

```js
var usersRouter = require('./routes/users');
var tvRouter = require('./routes/thanhvien');
```


– Trong app.js, định nghĩa route cho module thanhvien

```js
app.use('/users', usersRouter);
app.use('/thanhvien', tvRouter);
```


– Tạo file **routes/thanhvien.js** và code nhúng model và route cho chức năng đăng ký

```js
var express = require('express');
var router = express.Router();
var db = require('../models/database'); 
router.get('/dangky', function(req, res) {
   res.render("dangky.ejs");
});
module.exports = router;
```


#### b Tạo view đăng ký

Tạo file **views/dangky.ejs** và code như sau:

```html
<link href= "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<form action="/thanhvien/luu" method="post" class="col-8 border border-primary p-3 m-auto">
<div class="mb-3">Username
   <input type="text" name="username" class="form-control border-primary">
</div>
<div class="mb-3">Mật khẩu
   <input type="password" name="password" class="form-control border-primary">
</div>
<div class="mb-3">Email 
   <input type="email" name="email" class="form-control border-primary">
</div>
<div class="mt-3">
   <button type="submit" class="btn btn-warning py-2">ĐĂNG KÝ</button>
</div>
</form>
```


Test: **http://localhost:3000/thanhvien/dangky**

#### c. Lưu thông tin user

Định nghĩa route để nhận dữ liệu từ form trong router thanhvien

```js
router.post('/luu', function(req, res) {
    let u = req.body.username;
    let p = req.body.password;
    let em = req.body.email;  
    let user_info ={username: u, password:p, email:em};  
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user_info);
    res.redirect("/thanhvien/camon");
})
```


**Test**: Trong trình duyệt gõ http://localhost:3000/thanhvien/dangky, nhập thông tin và submit form, sẽ thấy thông tin được lưu vào database

#### d. Mã hóa mật khẩu của user

Mật khẩu của user lưu trong database phải được mã hóa để đảm bảo an toàn cho thông tin của user . Để thực hiện , bạn cần cài thêm module **bcryot** để sử dụng.

– Cài module bscript: **npm install bcrypt**  
– Code lại hàm luu trong router thanhvien

```js
router.post('/luu', function(req, res) {
    let u = req.body.username;
    let p = req.body.password;
    let em = req.body.email;  

    const bcrypt = require("bcrypt");        
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(p, salt);

    let user_info ={username: u, password:pass_mahoa, email:em};  
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user_info);
    res.redirect("/thanhvien/camon");
})
```


– Test: Giờ thì đăng ký lại, bạn sẽ thấy mật khẩu được mã hóa.

### 2\. Đăng nhập và xử lý đăng nhập

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section7/image-39-1024x330.png?raw=true)

#### a. Tạo route

– Code trong file routes/thanhvien.js tạo route dangnhap

```js
router.get('/dangnhap', function(req, res) {
     res.render("dangnhap.ejs");
});
```


#### b Tạo view

– Tạo file **views/dangnhap.ejs** và code

```html
<link href= "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<form action="/thanhvien/dangnhap_" method="POST" class="col-8 border border-primary p-3 m-auto" >
  <div class="mb-3">Username
     <input type="text" name="username" class="form-control border-primary">
  </div>
  <div class="mb-3">Mật khẩu
     <input type="password" name="password" class="form-control border-primary">
  </div>
  <div class="mt-3">       
     <button type="submit" class="btn btn-warning px-4  py-2"> ĐĂNG NHẬP</button>
  </div>
</form>    

```


– Test: **http://localhost:3000/thanhvien/dangnhap** sẻ thấy form hiện ra.

#### c. Xử lý đăng nhập

– Tạo route **dangnhap\_** trong module thanhvien để kiễm tra username, pass

```js
router.post('/dangnhap_', function(req, res) {
    let u = req.body.username;
    let p = req.body.password;
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, u , (err, rows) => {   
        if (rows.length<=0) { 
            res.redirect("/thanhvien/dangnhap"); 
            return;
        }
        let user = rows[0];        
        let pass_fromdb = user.password;        
        const bcrypt = require("bcrypt");        
        let kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq){ 
            console.log("OK");                    
            res.redirect("/thanhvien/thanhcong");
        }   
        else {
            console.log("Not OK");
            res.redirect("/thanhvien/dangnhap");
        }
    });   
});
```


Test : Trong trình duyệt gõ http://localhost:3000/thanhvien/dangnhap , nhập thông tin và submit form. Nếu gõ username pass sai sẽ thấy form đăng nhập hiện trở lại, nếu đúng sẽ được chuyển đến route thanhcong

#### d. Lưu session khi đăng nhập thành công

Để lưu session ghi nhận user đăng nhập, bạn cần dùng đến module **express-session**

1\. Cài module express-session: **npm install express-session**

2\. Ở đầu file app.js, code để nạp module :

```js
var session = require('express-session');
```


3\. Trong file app.js, khai báo cấu hình module session.

```js
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
```


Chú ý: cấu hình trên (màu đỏ) phải đặt trên lệnh app.use(‘/thanhvien’, tvRouter); thì trong module thanhvien mới sử dụng session được.

4\. Code lại trong hàm dangnhap\_ của routes/thanhvien:

```js
router.post('/dangnhap_', async function(req, res) {
    let u = req.body.username;
    let p = req.body.password;
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [u] , (err, rows) => {   
        if (rows.length<=0) { res.redirect("/thanhvien/dangnhap"); return;}
        let user = rows[0];        
        let pass_fromdb = user.password;        
        const bcrypt = require("bcrypt");        
        var kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq){ 
            console.log("OK");   
            var sess = req.session;  //initialize session variable
            sess.daDangNhap = true;
            sess.username = user.username;                     
            res.redirect("/thanhvien/thanhcong");
        }   
        else {
            console.log("Not OK");
            res.redirect("/thanhvien/dangnhap");
        }
    });   
});
```


### 3\. Kiểm tra đăng nhập

– Trong routes/thanhvien.js, định nghĩa route download

```js
router.get('/download', function(req, res) {
    res.render("download.ejs");
});
```


– Tạo views/download.ejs bà nhập text

```html
<h4>Đây là trang tải phần mềm, chỉ dành cho thành viên đã đăng nhập</h4>
```


– Test: http://localhost:3000/thanhvien/download , nếu thấy text vừa nhập text là chính xác

– Kiểm tra đăng nhập: bổ sung trong hàm download để được như sau:

```js
router.get('/download', function(req, res) {
  if (req.session.daDangNhap) {
     res.render("download.ejs",{un:req.session.username});
  }
  else {       
     res.redirect("/thanhvien/dangnhap");
  }
});
```


– Test: nếu chưa đăng nhập, khi xem http://localhost:3000/thanhvien/download sẽ bị chuyển sang trang dangnhap, nếu đã đăng nhập thì mới xem được.

### 4\. Trở lại trang trước

– Trong các chức năng bắt user phải đăng nhập, ghi vào session địa chỉ của trang hiện hành (trang cũ)

– Trong chức năng xử lý đăng nhập, nếu thấy có trang cũ thì quay lại trang cũ

Thực hiện như sau:

– Trong hàm download, code bổ sung để được như sau:

```js
 router.get('/download', function(req, res) {
    if (req.session.daDangNhap) {
        res.render("download.ejs",{un:req.session.username});
    }
    else { 
        req.session.back= req.originalUrl;
        res.redirect("/thanhvien/dangnhap");
    }
});
```


– Trong hàm dangnhap\_, code bổ sung để được như sau:

```js
router.post('/dangnhap_', async function(req, res) {
    let u = req.body.username;
    let p = req.body.password;
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [u] , (err, rows) => {   
        if (rows.length<=0) { res.redirect("/thanhvien/dangnhap"); return;}
        let user = rows[0];        
        let pass_fromdb = user.password;        
        const bcrypt = require("bcrypt");        
        var kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq){ 
            console.log("OK");   
            var sess = req.session;  //initialize session variable
            sess.daDangNhap = true;
            sess.username = user.username;                     
            //res.redirect("/thanhvien/thanhcong");
            if (sess.back){ 
                console.log(sess.back);
                res.redirect(sess.back);
            }
            else {
                res.redirect("/thanhvien/thanhcong");
            }
        }   
        else {
            console.log("Not OK");
            res.redirect("/thanhvien/dangnhap");
        }
    });   
});
```


Test: Xem trang download, nếu chưa đăng nhập sẽ được chuyển đến trang dangnhap, đăng nhập xong sẽ được chuyển ngược trở lại trang download

### 5\. Thoát

Trong routes/thanhvien, tạo route thoat

```js
router.get('/thoat', function(req, res) {
    req.session.destroy();
    res.redirect("/thanhvien/dangnhap");
});
```


Mời bạn thực hiện thêm: chức năng đổi pass, bổ sung thêm cho form đăng ký họ tên, sở thích, thêm nhãn cho các form đăng nhập, đăng ký, hiện text thông báo trong from đăng nhập nếu username nhập không có…
