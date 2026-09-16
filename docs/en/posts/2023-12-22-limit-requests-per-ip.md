---
layout: Post
title: Limiting Requests received from a single IP within a given time window
slug: han-che-request-nhan-duoc-tu-mot-ip-trong-khoang-thoi-gian-nhat-dinh
subtitle: Building a SpringBoot server that limits Spam Requests from users
author: Trần Hữu Đang
date: "2023-12-22"
image: /images/post/2023-12-22-limit-requests-per-ip/1.png
tags: ["Backend","Redis","Security"]

---
	
Hi everyone, glad you're reading this blog. Feel free to leave a comment below ^^

You've probably felt frustrated, helpless, and maybe even wanted to curse a little whenever your school's website goes down! Same here — whenever there's a lot of assignment submissions or registration happening at once on the school site, you're almost guaranteed to hit a 502 error (a failed resource response error, or in plain terms: the site crashed).

As a `dev`, we need to do something to limit this!

Basically, there are 3 likely causes behind this situation
1. Too many people accessing the system at once
2. Weak network
3. A 500 error causing some servers to auto-restart
4. A client repeatedly sending requests that the server can't keep up with

Out of these 4 causes, most depend heavily on resources, the hosting service, the server's network plan, etc.

Only cause number `4` is something we can actually control right at the server level!

Let's dig into how to handle and configure this right now! Spoiler: we'll be using a `cache` mechanism

## Server load capacity

First, let's look at server load capacity.
Writing a server that just runs is simple enough, but few people pay attention to designing the system in a way that optimizes for maximum server load capacity. Here's a small benchmark below:

- I took 3 sample servers *(discussing only a basic Hello World example)* to compare the load capacity of `Bun.js`, `Node.js`, and `SpringBoot`.
- The hardware specs were kept identical, and the tests ran on 2 ports on the same machine.

|Server|Requests/second|Max requests handled|
|-------------|---------|-----|
|`SpringBoot` |23435    |980273|
|`Bun.js`     |50520    |981573|
|`Node.js`    |21081    |973370|

> Note: This example is for reference only, since it depends on many other factors.

## The idea
There are many ways on the internet to control request spamming. I'll cover the most common one.

Not only is it common, it's also highly effective — I applied it in my graduation project and got very positive feedback from the review committee, so I want to share it here.

Basically, the idea is: how do we save the IP of a device the first time it sends a Request to our website, and then check subsequent Requests. If the number of Requests is too high, we block that IP and stop allowing further Requests!

The challenge is: how do we make that check fast enough that it doesn't hurt the user experience or slow down the response time of every Request?

> The answer is to use a Cache mechanism and Redis

## Basic concepts

### What is Cache

What is Cache: Cache is a technique for storing a copy of previously processed data to reduce access time and speed up processing.

A real-world example: In a web browser, the cache keeps previously loaded images and CSS to avoid re-downloading them from the server, which reduces page load time.

> Ah, so it turns out we've been implicitly relying on a `Cache` mechanism all along without even realizing it!

With `Cache`, we can easily overwrite data on top of itself.

We just need to create an Object that stores information like:

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlockSpam implements Serializable{
	Long time;          // thòi gian gần nhất gọi Request
	Integer requests;   // Số Request đã gọi trong 1s
}
```
So we'll record each API-calling IP and update its time while incrementing the `requests` counter after every call.

That handles the logic; now we need to figure out how to call this as efficiently as possible for the highest performance, because this data needs to be persisted!

We need a `Database` that can store this data, respond quickly, and delete data automatically (since we only want to block that IP temporarily, not permanently)

I know of a DB that can help with all of this: `Redis`

### What is Redis
Redis is an open-source in-memory database system, commonly used as a key-value database and as a cache.

**Redis stores data in RAM**, so its read/write speed is **1,000 times** faster than SQL (My-SQL or MS SQL).
- In terms of speed: **Redis > MongoDB > Firebase > SQL**

**Redis can** automatically delete data once it expires
- For example, if I store a JSON and set its expiry to **5s**, after *5s* it will automatically disappear (this mechanism is similar to a **Trigger** in SQL)


## Let's start coding

### Prerequisites

First, we need the following resources:
- Redis CLI: since Redis can only be installed on MacOS and Linux, if you're on Windows, check out [this repo](https://github.com/dangth12/windows-Redis-x64-3.0.504) of mine and download it
- VS Code or Spring Tools Suite

### Getting started with the project

First, start up Redis (there's a guide in my Repo)

#### Installing the required libraries

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

#### Required environment variables

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

Configuration for the `Redis` connections

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

Create the following object to store in the Cache

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

Create a Service to interact with `Redis`

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

Create a Service to store the model in Cache

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

Write a Service that creates an `@Annotation` to automatically check Requests

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

#### Controllers

Just write an API to test

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