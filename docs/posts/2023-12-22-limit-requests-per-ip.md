---
layout: Post
title: Hạn chế Request nhận được từ một IP trong khoảng thời gian nhất định
subtitle: Xây dựng server SpringBoot hạn chế Spam Request từ người dùng
author: Trần Hữu Đang
date: "2023-12-22"
image: /images/post/2023-12-22-limit-requests-per-ip/1.png
tags: ["Backend","Redis","Security"]

---
	
Chào các bạn, rất vui vì bạn đã đọc blog này. Hãy để lại bình luận bên dưới nhé ^^

Có lẻ bạn đã nhiều lần cảm thấy chán nản bất lực và đôi khi là muốn chửi tục khi website trường bị chết! Mình cũng vậy, những lúc nộp bài đông hoặc đăng ký gì đó cần lên web trường thì cứ y như rằng nhận lỗi 502 (Lỗi phản hồi tài nguyên không thành công hay nói rõ ra là web sập).

Nếu là một `dev` chúng ta phải làm gì đó hạn chế điều này!

Về cơ bản có 3 khả năng cao dẫn đến tình trạng này
1. Quá nhiều người truy cập vào hệ thống
2. Mạng yếu
3. Lỗi 500 khiến một số server có cơ chế tự start lại
4. Một client nào đó gửi yêu cầu liên tục và server không xử lý kịp

Trong 4 sự cố trên phụ thuộc rất nhiều vào tài nguyên, dịch vụ deploy web, gói mạng chạy server,...

Riêng chỉ có ý số `4` là ta có thể kiểm soát ngay tại server!

Xử lý và cấu hình thế nào thì hãy cùng mình tìm hiểu ngay sau đây nhé! Bật mí là ta sẽ dùng cơ chế `cache`

## Sự chịu tải của Server

Đầu tiên ta tìm hiểu về việc chịu tải của server
Để viết ra một con server chạy được thì quá đơn giản, tuy nhiên việc thiết kế hệ thống thế nào cho tối ưu để tăng độ chịu tải của Server lại được ít người quan tâm. Mình sẽ có một thống kê nhỏ dưới đây:

- Mình lấy 3 server làm mẫu *(chỉ bàn về ví dụ cơ bản như Hello World)* về mức độ chịu tải của `Bun.js`, `Node.js` và `SpringBoot`.
- Biết các thông số về phần cứng là như nhau và test trên 2 port trên cùng một máy.

|Server|Request/giây|Số Request được chạy tối đa|
|-------------|---------|-----|
|`SpringBoot` |23435    |980273|
|`Bun.js`     |50520    |981573|
|`Node.js`    |21081    |973370|

> Lưu ý: Ví dụ chỉ mang tính chất tham khảo vì còn phụ thuộc vào rất nhiều yếu tố.

## Ý tưởng
Trên internet sẽ có rất nhiều cách để kiểm soát việc spam request. Mình sẽ nếu ra cách thông dụng nhất.

Không chỉ thông dụng, nó còn mang lại hiệu quả cao, mình đã áp dụng vào Đồ án tốt nghiệp và nhận được sự phản hồi rất tích cực từ hồi đồng chấm bài nên mình sẽ chia sẽ nhá.

Về cơ bản chúng ta sẽ làm thế nào để lưu lại được IP của thiết bị gửi Request lần đầu cho website của ta và kiểm tra các lần Request tiếp theo. Nếu số lượng Request quá nhiều thì mình sẽ chặn IP đó lại và không cho Request nữa!

Vấn đề đặt ra là làm sao để tốc độ kiểm tra đó phải thật nhanh để không làm tệ đi trãi nghiệm người dùng và chậm độ phản hồi của mỗi Request?

> Câu trả lời là dùng cơ chế Cache và Redis

## Các khái niệm cơ bản

### Cache là gì

Cache là gì: Cache là một kỹ thuật lưu trữ bản sao dữ liệu đã xử lý trước đó để giảm thời gian truy cập và tăng tốc độ xử lý.

Ví dụ thực tế: Trong trình duyệt web, cache giữ lại hình ảnh và CSS trước đó để tránh việc tải lại từ máy chủ, giúp giảm thời gian tải trang.

> À vậy ra chúng ta vẫn ngầm sử dụng cơ chế `Cache` mà không hề hay biết!

Với `Cache` ta có thể dễ dàng ghi đè dữ liệu lên nhau một cách dễ dàng.

Ta chỉ cần tạo ra một Object lưu lại các thông tin như:

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlockSpam implements Serializable{
	Long time;          // thòi gian gần nhất gọi Request
	Integer requests;   // Số Request đã gọi trong 1s
}
```
Như vậy ta sẽ ghi lại từng IP gọi API và cập nhật lại time đồng thời tăng biến `requests` lên sau mỗi lần gọi.

Đã xong phần xử lí, ta cần nghĩ đến việc gọi thế nào cho tối ưu nhất mang lại tốc độ cao nhất. vì số data này ta cần phải lưu lại!

Ta cần một `Database` có thể lưu lại dữ liệu, phản hồi nhanh chóng và xóa dữ liệu một cách tự động (vì ta chỉ khóa IP đó trong 1 lúc chứ không thể khóa vĩnh viễn được)

Mình biết một DB có thể giúp chúng ta những việc trên, đó là  `Redis`   

### Redis là gì
Redis là một hệ thống cơ sở dữ liệu in-memory (lưu trữ trong bộ nhớ RAM) mã nguồn mở, thường được sử dụng như một cơ sở dữ liệu key-value và làm cache.

**Redis lưu ở RAM** bởi vậy có tốc độ đọc ghi dữ liệu nhanh gấp **1.000 lần** so với SQL (My-SQL hay MS SQL).
- So về thời gian thì **Redis > MongoDB > Firebase > SQL**

**Redis có thể** tự xóa dữ liệu nếu như chúng hết hạn
- Ví dụ mình lưu một JSON và đặt thời gian cho nó là **5s** thì sau *5s* nó sẽ tự biến mất (Cơ chế này tương tự **Trigger** trong SQL)


## Bắt đầu code

### Tài nguyên

Trước tiên chúng mình cần có các tài nguyên sau:
- Redis CLI: vì Redis chỉ có thể cài trên MacOS và Linux nên các bạn nào dùng Windows có thể vào [repo sau](https://github.com/dangth12/windows-Redis-x64-3.0.504) của mình và tải về nhé
- VS Code hoặc Spring Tools Suite

### Bắt đầu dự án

Đầu tiên bạn hãy chạy Redis lên (trong Repo mình có hướng dẫn)

#### Cài các thư viện cần thiết

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
        <version>5.0.0</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjrt</artifactId>
        <version>1.9.7</version> 
    </dependency>
</dependencies>
```

#### Các biến môi trường cần thiết

```properties
# Redis Configuration
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.password=             
spring.redis.database=0             
spring.redis.cache.ttl=10

#10 requests trong 1P
davis.redis.ttl = 60	
davis.redis.requests = 10
```


#### Config

Cấu hình cho các kết nối tới `Redis`

```java
package com.davis.config;

public class RedisConfig {
	@Bean
	public JedisConnectionFactory connectionfactory() {
		RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
		config.setHostName("localhost");
		config.setPort(6379);
		return new JedisConnectionFactory(config);
	}

	@Bean
	public RedisTemplate<String, Long> redisTemplate() {
		RedisTemplate<String, Long> templ = new RedisTemplate<>();
		templ.setConnectionFactory(connectionfactory());
		templ.setKeySerializer(new StringRedisSerializer());
		templ.setHashKeySerializer(new StringRedisSerializer());
		templ.setHashKeySerializer(new JdkSerializationRedisSerializer());
		templ.setValueSerializer(new JdkSerializationRedisSerializer());
		templ.setEnableTransactionSupport(true);
		templ.afterPropertiesSet();
		return templ;
	}
}
```

#### Model

Khỏi tạo đối tượng sau đây để lưu vào Cache

```java
package com.davis.model;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlockSpam implements Serializable{
	Long currenTime;
	Integer countrequest;
}
```

#### Service

Tạo một Service để tương tác với `Redis`

```java
package com.davis.service;

@Service
public class RateLimiterService {
	@Autowired
	private RedisTemplate redisTemplate;

	@Autowired
	public RateLimiterService(StringRedisTemplate redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	public boolean allowRequest(String ipAddress, long maxRequests, long timeIntervalInSeconds) {
		String key = "ip:" + ipAddress;
		Long currentTime = System.currentTimeMillis() / 1000;
		//Long previousRequestTime = (Long) redisTemplate.opsForValue().get(key);
		BlockSpam b = (BlockSpam) redisTemplate.opsForValue().get(key);
		// nếu chưa request trong 10p
		if (b == null) {
			BlockSpam bs = new BlockSpam(currentTime, 1);
			redisTemplate.opsForValue().set(key, bs, timeIntervalInSeconds, TimeUnit.SECONDS);
			return true;
		}
		b.setCountrequest(b.getCountrequest()+1);
		if((b.getCountrequest()) < maxRequests) {
			redisTemplate.opsForValue().set(key, b, timeIntervalInSeconds, TimeUnit.SECONDS);
			return true;
		}
		// ngượpc lại
		System.out.println("Bi chan trong "+ (currentTime - b.getCurrenTime()));
		return false;
	}
}
```

Tạo một Service để lưu model vào Cache

```java
package com.davis.service;

@Service
public class RateLimitService {
    private final StringRedisTemplate redisTemplate;

    
    @Autowired
    public RateLimitService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public boolean isAllowed(String userId) {
        String key = "rate_limit:" + userId;
        System.out.println(userId);
        Instant now = Instant.now();

        Instant lastRequestTime = Instant.parse(redisTemplate.opsForValue().get(key) != null ?
                redisTemplate.opsForValue().get(key) : now.toString());

        // Kiểm tra xem đã đủ thời gian giữa các yêu cầu chưa
        Duration timeElapsed = Duration.between(lastRequestTime, now);
        if (timeElapsed.getSeconds() >= 60) {
            // Reset thời gian cho yêu cầu tiếp theo và cập nhật vào Redis
            redisTemplate.opsForValue().set(key, now.toString());
            return true;
        } else {
            // Chưa đủ thời gian giữa các yêu cầu
            return false;
        }
    }
}
```

Viết một Service tạo `@Anotation` tự động check Request

```java
package com.davis.service;

@Aspect
@Component
public class RedisCheckAspect {
	

	@Value("${davis.redis.ttl}")	// thời gian tồn tại của một khiên (60s)
    private Long ttl;
	
	@Value("${davis.redis.requests}")	// số reuqest được chạy trong 1 phiên khiên (10)
    private Long requests;

    @Autowired
    private RedisService redisService;
    
    // lấy ra IP của Client
    private String getClientIp(HttpServletRequest request) {
		String ipAddress = request.getHeader("X-Forwarded-For");
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (ipAddress.equals("0:0:0:0:0:0:0:1")) {
				// Lấy địa chỉ IPv4 cho localhost
				try {
					InetAddress inetAddress = InetAddress.getLocalHost();
					ipAddress = inetAddress.getHostAddress();
				} catch (UnknownHostException e) {
					// Xử lý lỗi nếu cần
				}
			}
		}
		return ipAddress;
	}

    @Around("@annotation(com.davis.RedisCheck)")
    public Object checkRedis(ProceedingJoinPoint joinPoint) throws Throwable {
    	
    	 // Lấy request hiện tại
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        
        // Thực hiện kiểm tra và xử lý Redis ở đây
        // Ví dụ: Kiểm tra một key trong Redis và xử lý dựa trên kết quả
        boolean isValid = redisService.allowRequest(getClientIp(request), requests, ttl); // Thay thế bằng phương thức kiểm tra thực tế

        if (isValid) {
            // Nếu request hợp lệ, tiếp tục thực hiện method bằng cách gọi joinPoint.proceed()
            return joinPoint.proceed();
        } else {
            // Nếu không hợp lệ, có thể trả về lỗi hoặc xử lý khác
        	return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests");
        }
    }
}
```

#### Controlers

Viết một API để test thôi

```java
package com.davis.controller;

@RestController
public class Controller {
    @Autowired
    private RateLimiterService rateLimiterService;

    @RedisCheck // Áp dụng kiểm tra Redis trước khi xử lý method này
    @GetMapping("/my-endpoint")
    public ResponseEntity<String> myEndpoint(HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        // Cho phép tối đa 10 request trong 1 phút từ cùng một IP
        if (rateLimiterService.allowRequest(ipAddress, 10, 60)) {             
            // Xử lý request ở đây
            return ResponseEntity.ok("Request allowed");
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests");
        }
    }
}
```