
# Bài 3. Làm việc với MySql

Làm việc với MySql trong NodeJS là bài viết hướng dẫn kết nối, chèn/cập nhật/xóa dữ liệu và lấy dữ liệu… từ mysql vào trang web bằng NodeJS

Lưu ý, để thành thạo các thao tác dưới đây cần cân nhắc tìm hiểu về XAMPP trước khi bắt đầu vào học, xem thêm tại [đây](https://topdev.vn/blog/cai-dat-xampp/#:~:text=XAMPP%20l%C3%A0%20m%E1%BB%99t%20ph%E1%BA%A7n%20m%E1%BB%81m%20ngu%E1%BB%93n)


## Nội dung chính

## Cài đặt module mysql vào NodeJS
-------------------------------

Đây là thư viện giúp bạn làm việc với Mysql. Mở command prompt rồi chuyển vào folder project gõ lệnh:

```
npm install mysql
```


## Tạo kết nối tới server mysql
----------------------------

Để làm việc với Mysql, đầu tiên là tạo kết nối, trong trang js của mình, code như sau:

```js
//index.js
var mysql = require('mysql'); // nhúng module mysql vào trang
const db = mysql.createConnection ({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'bookstore'  //tên database muốn kết nối
});
```


## Tạo table trong mysql với nodeJS
--------------------------------

Khi làm việc với mysql, muốn tạo table chỉ việc viết câu lệnh sql tạo table rồi thực thi câu lệnh sql với hàm query của đối tượng kết nối. Ví dụ sau tạo một table tên book với 1 vài field :

```js
app.get("/tablecreate", (req, res) => {
    var sql = `CREATE TABLE books (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255), 
            slug VARCHAR(255),
            price float, 
            description VARCHAR(4000),
            imageURL VARCHAR(255),
            showhide BOOLEAN,
            idCat INT(11)
        )`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send("<h1>Đã tạo table</h1>");
    });
});
```


## Chèn dữ liệu vào mysql
----------------------

### Chèn dữ liệu vào mysql bằng cách chạy lệnh insert into

Bạn khai báo câu lệnh sql với các field và value như truyền thống rồi thực thi với hàm query của connection. Cụ thể như sau:

```js
app.get("/addbook", (req, res) => {  //Cách 1
    let sql=`insert into books(title, price) values("Lĩnh Nam Chích Quái",350000)`;
    db.query( sql , function(err, data) {
        if (err) throw err;
        res.send(data); // data chứa số dòng chèn ...
    });
});
```


### Chèn một dòng vào mysql với dữ liệu là đối tượng json

Cách này rõ ràng và an toàn hơn, thực hiện hiện như sau:

```js
app.get("/bookadd", (req, res) => {  //Cách 2
 let b = {title:'Ngự Dược Nhật Ký', price:'147000', slug:'ngu-duoc-nhat-ky'} 
 db.query("insert into books SET ? ", b , function(err, data) {
     if (err) throw err;
     res.send(data); 
    });    
});
```


### Thêm dữ liệu vào mysql từ form hoặc url

Dữ liệu có thể lấy từ form hoặc từ tham số của trang để chèn vào mysql. Sau đây là ví dụ lấy dữ liệu từ url chèn vào mysql. Bạn có thể thực hiện tương tự khi lấy dữ liệu từ form.

```js
app.get("/addbook2", (req, res) => {         
    let ten = req.query['title'];
    let gia = req.query['price'];
    let slug = req.query['slug'];
    let b={title:ten, price:gia, slug:slug}     
    db.query('insert into books SET ?', b , function(err, data) {
       if (err) throw err;        
       res.redirect('/');
    }); 
})
```

```
http://localhost:3000/addbook2/?title=La Sơn Phu Tử&price=128000&slug=la-son-phu-tu
```
