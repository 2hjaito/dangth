

# Bài 8. Làm việc với MongoDB


MongoDB là hệ quản trị cơ sở dữ liệu NoSQL rất nổi tiếng. Mongo rất thích hợp cho các ứng dụng dữ liệu lớn, tương tác người dùng cao. Cấu trúc data không quá chặt chẽ cho nên dễ dàng mở rộng và chạy nhanh.

Làm việc với MongoDB trong NodeJS là bài hướng dẫn cơ bản về cài đặt , sử dụng và tương tác với mongodb từ trong project NodeJS.

## Nội dung chính

* * *

*   [Download và cài đặt mongodb](#download-va-cai-dặt-mongodb)
*   [Các khái niệm trong mongodb](#cac-khai-niệm-trong-mongodb)
    *   [1. Database trong mongodb](#1-database-trong-mongodb)
    *   [2. Collection trong mongodb](#2-collection-trong-mongodb)
    *   [3. Document  trong mongodb](#3-document-trong-mongodb)
    *   [4. Field trong document](#4-field-trong-document)
    *   [5. Các kiểu dữ liệu trong MongoDB](#5-cac-kiểu-dữ-liệu-trong-mongodb)
*   [Các công cụ quản trị MongoDB](#cac-cong-cụ-quản-trị-mongodb)
*   [Quản trị database mongodb với MongoDBCompass](#quản-trị-database-mongodb-với-mongodbcompass)
    *   [1. Kết nối mongodb trên máy local](#1-kết-nối-mongodb-tren-may-local)
    *   [2. Tạo database mongodb](#2-tạo-database-mongodb)
    *   [3. Tạo collection (table)](#3-tạo-collection-table)
    *   [4\. Chèn document](#4-chen-document)
    *   [5. Clone document , cập nhật, xóa document](#5-clone-document-cập-nhật-xoa-document)
    *   [6. Tạo index cho documents trong collection](#6-tạo-index-cho-documents-trong-collection)
    *   [7.  Export documents trong collection](#7-export-documents-trong-collection)
*   [Một số hàm NodeJS dùng để tương tác với MongoDB](#một-số-lệnh-dung-trong-mongodb)
    *   [1. Chèn document (insert record)](#1-chen-document-insert-record)
    *   [2.  Chọn document (select records)](#2-chọn-document-select-records)
    *   [3\. Đếm các document trong collection](#3-dem-cac-document-trong-collection)
    *   [4\. Cập nhật document trong collection](#4-cap-nhat-document-trong-collection)
    *   [5\. Xóa document trong collection](#5-xoa-document-trong-collection)
*   [Tương tác mongodb từ NodeJS](#sử-dụng-mongodb-trong-project-nodejs)
    *   [1\. Tạo project NodeJS và cài module](#1-tao-project-nodejs-va-cai-module)
    *   [3. Nhúng hàm MongoClient trong module mongodb vào](#2-kết-nối-dến-mongodb-tren-may-cục-bộ-trong-project-nodejs)
    *   [4\. Chèn document vào mongodb từ NodeJS:](#chen-document-vao-mongodb-từ-nodejs)
    *   [5\. Cập nhật document trong mongodb từ NodeJS:](#cập-nhật-document-trong-mongodb-từ-nodejs)
    *   [6\. Cập nhật nhiều document trong mongodb từ NodeJS](#cập-nhật-nhiều-document-trong-mongodb-từ-nodejs)
    *   [7\. Xóa document trong mongodb từ NodeJS](#xoa-document-trong-mongodb-từ-nodejs)
    *   [8\. Select document trong mongodb và hiện kết quả trong NodeJS](#select-document-trong-mongodb-va-hiện-kết-quả-trong-nodejs)
    *   [9\. Select 1 document trong mongodb từ NodeJS](#select-1-document-trong-mongodb-từ-nodejs)

* * *

## Download và cài đặt mongodb
---------------------------

– Vào [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) và download

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-1-1024x580.png?raw=true)

– Chạy file vừa cài đặt rồi nhắp **Next** trong hình để tiếp tục

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-2.png?raw=true)

– Chọn **I accept the terms …** rồi nhắp **Next**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-3.png?raw=true)

– Chọn **Complete** rồi nhắp **Next**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-5.png?raw=true)

– Chọn **Run service…** để chạy mongo như là service trong máy rồi nhắp **Next**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-6.png?raw=true)

– Chọn **Install MongoDB Compass** – công cụ trực quan quản lý MongoDB rồi nhắp **Next**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-7%20(1).png?raw=true)

– Nhắp Install để cài đặt

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-8.png?raw=true)

– Nhắp **Finish** để kết thúc

## Các khái niệm trong mongodb
---------------------------

### 1\. Database trong mongodb

Mỗi database trong mongodb giống database trong Mysql. Một database có 1 tên và là kho chứa nhiều Collection.

### 2\. Collection trong mongodb

Collection trong mongodb giống như table trong Mysql. Mỗi collection có 1 tên và đặt trong 1 database nào đó. Khi tạo collection, không cần phải khai báo các cột.

### 3\. Document trong mongodb

Document là các record trong collection. Mỗi document gồm nhiều field , được nhập theo cú pháp json.

### 4. Field trong document

Field là từng cặp name:value trong document. Một document có nhiều field, cách nhau bởi dấu phẩy. Với các document trong 1 collection thì số field có thể khác nhau.

```json
{"idLoai":1,"tenLoai":"Nghệ thuật sống","thuTu":1,"anhien":false}

{"idLoai":10,"tenLoai":"Thám hiểm","anhien":true}
```


### 5\. Các kiểu dữ liệu trong MongoDB

MongoDB hỗ trợ các kiểu dữ liệu sau: string, double, int, date, boolean, ObjectID, array…

## Các công cụ quản trị MongoDB
----------------------------

*   **MongodbCompass:** là công cụ quản lý hệ CSDL MongoDB trên desktop, công cụ này được cài kèm theo khi bạn cài đặt MongoDB vào máy tính.

*   **Robo 3T:** Robo 3T cũng là công cụ trực quan để làm việc với MongoDB. Giống như dùng phpmyadmin để làm việc với MySQL vậy. Để download Robo 3T, vào trang [https://robomongo.org/download](https://robomongo.org/download)
*   Ngoài ra còn có các công cụ như **Umongo**, **MongoExplorer**, **RockMongo**…

## Quản trị database mongodb với MongoDBCompass
--------------------------------------------

### 1\. Kết nối mongodb trên máy local

– Mở MongoDB Compass => nhắp Connect

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-9-1024x463.png?raw=true)

– Khi kết nối thành công, cột trái sẽ hiện thông tin kết nối như sau:

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-10-1024x512.png?raw=true)

### 2\. Tạo database mongodb

Nhắp nút Create Database (xem hình trên) rồi nhập tên Database + nhập tên collection đầu tiên trong database rồi nhắp nút Create Database

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-11-1024x625.png?raw=true)

Kêt quả tạo:

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-12-1024x470.png?raw=true)

### 3. Tạo collection (table)

Nhắp nút + ở phía sau tên database (xem hình trên) rồi nhập tên collection , rồi nhắp nút Create Collection

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-13.png?raw=true)

### 4\. Chèn document

Mỗi document là 1 record dữ liệu cần lưu. Bạn nhắp tên collection rồi nhắp **Add Data** ==> Insert Document

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-14-1024x506.png?raw=true)

Rồi nhập dữ liệu vào , xong nhắp nít **Insert**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-15-1024x614.png?raw=true)

### 5\. Clone document , cập nhật, xóa document

Nhắp các nút tương ứng như trong hình dưới

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-16-1024x375.png?raw=true)

### 6\. Tạo index cho documents trong collection

Tạo index để sắp xếp sẵn các record nhằm phục vụ tìm kiếm cho nhanh chóng. Thực hiện bằng cách nhắp tab **Indexs**  rồi nhắp nút **Create Index**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-17-1024x330.png?raw=true)

Sau đó chọn field , kiểu Index và nhắp nút **Create index**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-18.png?raw=true)

### 7\. Export documents trong collection

– Nhắp nút **Export** như hình dưới

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-19-1024x378.png?raw=true)

– Chọn **JSON** rồi nhắp nút **Export**

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-21.png?raw=true)

## Một số hàm NodeJS dùng để tương tác với MongoDB
-----------------------------------------------

### 1. Chèn document (insert record)

Dùng hàm insertOne

```js
db.people.insertOne( { user_id: "bcd001", age: 45, status: "A" })
// INSERT INTO people(user_id, age, status) VALUES ("bcd001", 45, "A")
```


### 2\. Chọn document (select records)

**a. Chọn tất cả các document trong collection**

Dùng hàm find như sau

```js
db.people.find() 
~ SELECT * FROM people
```


**b. Chọn các document trong collection theo điều kiện**

Dùng hàm find với tham số là điều kiện chỉ ra

```js
db.people.find( { status: "A" } )
~ SELECT * FROM people WHERE status = "A"

db.people.find( { status: "A", age: 50 } )
~  SELECT * FROM people WHERE status = "A" AND age = 50

db.people.find( { $or: [ { status: "A" } , { age: 50 } ] } )
~ SELECT * FROM people WHERE status = "A" OR age = 50

db.people.find( { user_id: /bc/ } ) 

db.people.find( { user_id: { $regex: /bc/ } } ) ~ SELECT * FROM people WHERE user_id like "%bc%"
```


### 3**. Đếm các document trong collection**

Dùng hàm count để đếm

```js
db.people.count( { user_id: { $exists: true } } )

db.people.find( { user_id: { $exists: true } } ).count()   
~ SELECT COUNT(user_id) FROM people
```


### **4\. Cập nhật document trong collection**

Dùng hàm updateMany để cập nhật nhiều, updateOne để cập nhật 1 document

```js
db.people.updateMany( { age: { $gt: 25 } }, { $set: { status: "C" } } ) 
~ UPDATE people SET status = "C" WHERE age > 25

db.people.updateMany( { status: "A" } , { $inc: { age: 3 } } )   
~ UPDATE people SET age = age + 3 WHERE status = "A"
```


### **5\. Xóa document trong collection**

Dùng hàm deleteMany để xóa nhiều, hàm deleteOne để xóa 1 document.

```js
db.people.deleteMany( { status: "D" } )  
~ DELETE FROM people WHERE status = "D"

db.people.deleteMany({}) 
~ DELETE FROM people
```


## Tương tác mongodb từ NodeJS
---------------------------

Giờ là lúc chúng ta thực tập thử. Để chọn dữ liệu, thêm, sửa , xóa dữ liệu trong mongodb từ trong project NodeJS.

### 1\. Tạo project NodeJS và cài module

Chạy lệnh tạo project:

```sh
express --ejs Node_Mongodb
```


 Cài đặt các module vào project: Mở command line rồi chuyển vào folder project gõ lệnh:

```sh
npm install
npm install mongodb
```


### 3\. Nhúng hàm MongoClient trong module mongodb vào

```js
//index.js
const { MongoClient } = require("mongodb");
```


### 4\. Chèn document vào mongodb từ NodeJS:

```js
// routes/index.js
router.get("/chenRecord", async (req, res) => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  let doc1 = { "idLoai":10, "tenLoai": "Khoa học","thuTu": 10, "anhien":false };
  const loaitin = db.collection('loaitin');
  const insertResult = await loaitin.insertOne(doc1);
  res.status(200).send('Đã chèn xong . InsertedID= ' + insertResult.insertedId);
  client.close();
});
```


Test: xem trong trình duyệt http://localhost:3000/chenRecord sẽ thấy thông báo chèn thành công.

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-28-1024x131.png?raw=true)

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-29-1024x281.png?raw=true)

### 5\. Cập nhật document trong mongodb từ NodeJS:

```js
//routes/index.js
router.get("/capnhat", async (req, res) => {
  var uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = { thuTu: 10 };
  let values = { $set: {"tenLoai": 'Đời sống', "thuTu": 15 } };
  const kq = await loaitin.updateOne(myquery, values);
  console.log("kq =", kq)
  res.status(200).send('Đã cập nhật xong ' + kq. matchedCount + ' dòng' );
  client.close();
});
```


Test: xem trong trình duyệt http://localhost:3000/capnhat sẽ thấy thông báo cập nhật thành công.

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-30-1024x139.png?raw=true)

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-31-1024x280.png?raw=true)

### 6\. Cập nhật nhiều document trong mongodb từ NodeJS

```js
//routes/index.js
router.get("/capnhatn", async (req, res) => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = { thuTu: { $lt: 5 } };
  let values = { $set: {thuTu: 1,  } };
  const kq = await loaitin.updateMany(myquery, values);
  console.log("kq =", kq)
  res.status(200).send('Đã cập nhật xong ' + kq. matchedCount + ' dòng' );
  client.close();
});
```


Test: xem trong trình duyệt http://localhost:3000/capnhatn sẽ thấy thông báo cập nhật thành công.

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-32.png?raw=true)

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-33-1024x279.png?raw=true)

### 7\. Xóa document trong mongodb từ NodeJS

```js
// routes/index.js
router.get("/xoaRecord", async (req, res) => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');
  
  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = {"thuTu": 15 } ;
  const kq = await loaitin.deleteOne(myquery);
  res.status(200).send('Đã xóa xong ' + kq. deletedCount + ' dòng' );
  client.close();
});
```


Test: xem trong trình duyệt http://localhost:3000/xoaRecord sẽ thấy thông báo xóa thành công.

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-34-1024x135.png?raw=true)

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-35-1024x255.png?raw=true)

### 8\. Select document trong mongodb và hiện kết quả trong NodeJS

```js
// routes/index.js
router.get("/layRecord", async (req, res) => {
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');
  
  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = {} ;
  const arr = await loaitin.find(myquery).toArray();
  client.close();
  res.render("loaitin",{listloaitin:arr});
});
```


Tạo file views/loaitin.ejs

```js
<h1>Danh sách loại tin</h1>
<% for (let lt of listloaitin) {%>
    <p> <%=lt.tenLoai%></p>
<% } %>
```


Test: xem trong trình duyệt http://localhost:3000/layRecord sẽ thấy dữ liệu hiện ra

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-36-1024x380.png?raw=true)

### 9\. Select 1 document trong mongodb từ NodeJS

```js
// routes/index.js
router.get("/layRecord/:id", async (req, res) => {
  let id= parseInt(req.params.id); 
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');
  
  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = { idLoai:id };
  let data = await loaitin.findOne(myquery);
  res.render("chitietloai",{loaitin:data});
  client.close();
})
```


Tạo file views/chitietloai.ejs và code

```js
<h1>Chi tiết một loại tin</h1>
<p> Tên loại: <%=loaitin.tenLoai%></p>
<p> Thứ tự : <%=loaitin.thuTu%></p>
<p> Ẩn hiện: <%=(loaitin.anHien==true)?"Đamg hiện":"Đang ẩn"%></p>
```


Test: xem trong trình duyệt http://localhost:3000/layRecord/1 sẽ thấy dữ liệu hiện ra

![](https://github.com/danqth/images/blob/main/angurvad/nodejs/section9/image-37-1024x312.png?raw=true)

* * *

Mời bạn luyện tập thêm

1.  Trang hiện danh sách loại tin : định dạng cho đẹp
2.  Tạo form thêm loại tin để thêm loại tin mới vào collection loaitin
3.  Tạo form cập nhật 1 loại tin vào collection loaitin
4.  Tạo chức năng xóa 1 loại tin trong collection loaitin
5.  Tạo form thêm tin để thêm tin mới vào collection tin
6.  Tạo trang hiện danh sách các tin từ collection tin

* * *

Như vậy, làm việc với MongoDB trong NodeJS cũng đơn giản phải không nào. Cũng những vấn đề và giải quyết tương tự như khi làm việc với MySql thôi. Bạn có thể tham khảo thêm tại link sau: [https://mongodb.github.io/node-mongodb-native/6.3/](https://mongodb.github.io/node-mongodb-native/6.3/)
