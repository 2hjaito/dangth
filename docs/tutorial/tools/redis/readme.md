📘 **Redis Từ Zero đến Hero – Phiên bản Đầy Đủ + Phỏng Vấn + Bài Tập**
======================================================================

I. 🔰 **Tổng quan về Redis**
----------------------------

### 1\. Redis là gì?

*   Key-Value Store hoạt động in-memory
    
*   Siêu nhanh (nhỏ gọn, đơn luồng, O(1) cho hầu hết thao tác)
    
*   Hỗ trợ nhiều kiểu dữ liệu: string, list, set, hash, zset, stream
    

### 2\. Redis dùng cho:

*   Cache dữ liệu (DB/API)
    
*   Session storage
    
*   Real-time analytics
    
*   Pub/Sub messaging
    
*   Rate limiting
    
*   Job queue
    

II. ⚙️ **Cài đặt Redis**
------------------------

> ✅ **Phỏng vấn hay hỏi**: _Redis có persistence không? Redis lưu dữ liệu như thế nào?_

### Cài bản local

*   bashSao chépChỉnh sửasudo apt install redissudo systemctl enable redissudo systemctl start redis
    
*   bashSao chépChỉnh sửadocker run -d --name redis -p 6379:6379 redis
    

### Kiểm tra:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaredis-cli  127.0.0.1:6379> PING  PONG   `

III. 🧪 **Các kiểu dữ liệu trong Redis**
----------------------------------------

### 1\. String

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaSET user:name "Alice"  GET user:name  INCR counter   `

🔎 **Phỏng vấn**: _Redis lưu số nguyên kiểu string thì INCR hoạt động thế nào?_

### 2\. List – hàng đợi

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaLPUSH queue "job1"  RPUSH queue "job2"  LPOP queue  LRANGE queue 0 -1   `

> **Dùng trong thực tế**: Task queue (với Celery, Sidekiq...)

### 3\. Set – tập hợp không trùng lặp

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaSADD tags "python" "redis"  SISMEMBER tags "redis"   `

> Ứng dụng: Xác thực uniqueness, gợi ý bạn bè

### 4\. Hash – kiểu như JSON

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaHSET user:1 name "Bob" age "28"  HGETALL user:1   `

🔎 **Phỏng vấn**: _Khác nhau giữa dùng Hash và lưu mỗi trường là 1 key string?_

### 5\. Sorted Set (ZSET)

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaZADD leaderboard 200 "Alice"  ZADD leaderboard 300 "Bob"  ZRANGE leaderboard 0 -1 WITHSCORES   `

> Dùng trong: Bảng xếp hạng, bài post theo like/view

### 6\. Stream – dữ liệu thời gian thực

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaXADD mystream * user bob msg "hi"  XRANGE mystream - +   `

> Dùng như Kafka: chat app, log stream

IV. 🛠 **Lệnh nâng cao**
------------------------

### TTL & Expiry

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaSET session "token" EX 60  TTL session   `

### Transactions

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaMULTI  SET a 1  INCR a  EXEC   `

### Lua script

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaEVAL "return redis.call('GET', KEYS[1])" 1 mykey   `

🔎 **Phỏng vấn**: _Redis hỗ trợ atomicity ra sao? MULTI vs Lua?_

V. 🛰 **Tính năng nâng cao**
----------------------------

### Pub/Sub

Terminal A:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaSUBSCRIBE channel1   `

Terminal B:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashSao chépChỉnh sửaPUBLISH channel1 "hello world"   `

### Persistence

*   RDB: Snapshot định kỳ
    
*   AOF: Ghi từng thao tác
    
*   Bạn có thể dùng cả hai
    

🔎 **Phỏng vấn**: _Sự khác biệt giữa RDB và AOF? Khi nào chọn cái nào?_

VI. 🧠 **Bài tập thực hành**
----------------------------

### 🧪 Cơ bản

1.  Tạo một Redis counter page:views và tăng mỗi khi có truy cập.
    
2.  Dùng list để mô phỏng một queue xử lý đơn hàng.
    
3.  Lưu thông tin user bằng hash: user:1, user:2,...
    

### 🧪 Trung bình

1.  Xây leaderboard dùng ZSET (tên + điểm)
    
2.  Dùng TTL để tạo xác thực OTP 1 lần, hết hạn sau 2 phút
    
3.  Mô phỏng chức năng **follow/unfollow** dùng Set (followers/following)
    

### 🧪 Nâng cao

1.  Implement hệ thống Rate Limiting bằng Redis (sử dụng INCR và EXPIRE)
    
2.  Làm một mini chat app backend dùng Pub/Sub + Stream
    
3.  Viết Lua script kiểm tra và cập nhật user point nếu điểm mới cao hơn
    

VII. 📋 **Câu hỏi phỏng vấn Redis thường gặp**
----------------------------------------------

Câu hỏiÝ chính cần trả lờiRedis là gì?In-memory key-value, cực nhanh, hỗ trợ nhiều kiểu dữ liệuRedis có phải database không?Là một database dạng NoSQL – không dùng disk mặc định nhưng có persistencePhân biệt RDB và AOF?RDB: snapshot, nhẹ – AOF: ghi log, khôi phục chính xác hơnRedis có đa luồng không?Không, Redis single-threaded, nhưng rất nhanhCache eviction policy trong Redis là gì?LRU, LFU, TTL,...Làm sao để Redis không làm mất dữ liệu khi restart?Dùng AOF hoặc kết hợp AOF + RDBLàm sao để Redis scale?Redis Cluster, Sharding, Sentinel

VIII. 🧰 **Redis trong thực tế**
--------------------------------

*   **Flask/Django session store**: Redis lưu session ID
    
*   **Express.js + Redis**: caching middleware
    
*   **Celery (Python)**: Redis làm broker cho background jobs
    
*   **Rate Limiting**: API limiter Redis + token bucket
    
*   **Leaderboard game**: dùng ZSET
    
*   **Realtime chat**: dùng Pub/Sub hoặc Stream
    

IX. 🔐 **Bảo mật & Production**
-------------------------------

*   Không để Redis expose qua internet (no-auth mặc định!)
    
*   Cấu hình requirepass, bind, protected-mode yes
    
*   Redis Sentinel (HA), Redis Cluster (scale)
    
*   Giám sát: RedisInsight, Prometheus, Grafana
    
*   Bật persistence (AOF + RDB) nếu không chỉ dùng cache
    

📎 **Tổng kết & Tài liệu bổ sung**
----------------------------------

*   Redis.io Docs
    
*   Redis Command Cheatsheet
    
*   Redis University (miễn phí): https://university.redis.com
    
*   Sách: _Redis in Action_, _The Little Redis Book_