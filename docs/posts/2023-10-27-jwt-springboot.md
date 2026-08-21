---
layout: Post
title: Xây dựng Json Web Token trong Spring Boot
subtitle: Phân quyền và đăng nhập trong Spring Boot
author: Trần Hữu Đang
date: "2023-10-27"
image: "https://github.com/theanishtar/images/blob/main/frogcyber/post/jwtspringboot/main.png?raw=true"
# arxiv: "https://arxiv.org/abs/2502.13095"
tags: ["Backend", "Authentication", "Authoriztion", "SpringBoot"]

---



[JWT]() là một hình thức xác thực người dùng rất bảo mật, hiệu quả và phổ biến trong mô hình[CSR]()

![](https://github.com/theanishtar/images/blob/main/frogcyber/post/jwtspringboot/main.png?raw=true)

Trong lúc tự học RestfulAPI với [SpringBoot]() mình đã xây dựng một Web app (SpringBoot, SQL, Angular). Bạn có thể xem mã nguồn tại [đây](https://github.com/Theanishtar/Davitickets)

Trong đó có chức năng Xác thực bằng **JWT** *(Json Web Token)*, mình sẽ cùng tìm hiểu trong bài viết hôm nay nhé!!!

Mình có một số lưu ý sau đây: 
- Bài viết hôm nay chỉ đề cập đến JWT trong SpringBoot nên phải có kiến thức về cả [JWT]() và [SpringBoot](/spring-boot/) nhé 
- Bài viết này được mình lấy trực tiếp từ dự án đã xây dựng nên có gì chưa hiểu bạn hãy xem mã nguồn của dự án nhé

Okay bắt đầu thoy !!! 

## Xây dựng CSDL

![Diagram DB](https://github.com/theanishtar/images/blob/main/angurvad/backend/jwt/diagram.png?raw=true)

Như bạn thấy ở hình trên ta cần 3 Table chính liên quan đến người dùng gồm: **Users**, **Roles** và **UserRole**.

<details>
<summary><b>Chi tiết:</b></summary>

**Users**: chứa danh sách người dùng  
**Roles**: chứa tất cả các quyền trong hệ thống  
**UserRole**: bảng trung gian liên kết N-N trong hệ thống

</details>


### Mã nguồn My-SQL
#### Tạo bảng

<details>
  <summary><b>Code SQL</b></summary>

```sql
--Quyền
CREATE TABLE roles(
    role_id INT IDENTITY PRIMARY KEY NOT NULL,
	[name] NVARCHAR(50) NOT NULL,
	role_des NVARCHAR(max) NULL
)

--Người dùng
CREATE TABLE users (
	userid INT IDENTITY PRIMARY KEY NOT NULL,
	full_name NVARCHAR(50) NOT NULL,
	[user_name] VARCHAR(20) NOT NULL,
	gender NVARCHAR(5) NULL,
	user_password VARCHAR(MAX) NOT NULL,
	phone VARCHAR(20) NULL,
	email VARCHAR(100) NOT NULL,
	profile_picture VARCHAR(MAX) NULL,
	account_status BIT NULL, --trạng thái hoạt động
	processed_by BIT NULL, --xác thực
	user_birtday DATE NULL,
	user_dayjoin DATE NOT NULL,
	gg_id VARCHAR(MAX) NULL,
)

-- Liên kết Người dùng với Quyền
CREATE TABLE user_role(
	id INT IDENTITY PRIMARY KEY NOT NULL,
	userid INT NOT NULL FOREIGN KEY REFERENCES users(userid), --id ng dung
	role_id INT NOT NULL FOREIGN KEY REFERENCES roles(role_id)--Vai trò người dùng
)
```

</details>

#### Thêm dữ liệu

<details>
  <summary><b>Mã SQL</b></summary>

```sql
INSERT INTO roles VALUES
	('ROLE_ADMIN',N'Quản trị web'),
	('ROLE_USER',N'Người dùng')

INSERT INTO users VALUES 
	(N'Trần Hữu Đang',N'dangth', 'Nam', '$2a$10$AR78OxmWNlFMnmFlv.XWFe2TECixCdfV.2K9G4yrmQ1irWXvxcL72', N'0917288723', N'dangthpc04349@fpt.edu.vn', 'https://firebasestorage.googleapis.com/v0/b/davitickets-2e627.appspot.com/o/dangth.jpg?alt=media&token=e223770c-06cb-448e-9025-43000f55d764', 1, 1, CAST('9-7-2003' AS DATE), CAST('7-22-2023' AS DATE), NULL),
	(N'Lê Bích Vi', N'vilb', 'Nữ', '$2a$10$SvchmABRVVZjeLgOW4Dez.q7T1kcybCdiQF70DHKNs.nX30vmYLVi', N'0178296424', N'vilbpc04354@fpt.edu.vn', 'https://firebasestorage.googleapis.com/v0/b/davitickets-2e627.appspot.com/o/vilb.jpg?alt=media&token=83641b31-7ea9-432d-bd6b-4dd0f5e9062f', 1, 1, CAST('6-2-2003' AS DATE), CAST('7-22-2023' AS DATE), NULL),
	(N'Phùng Quốc Vinh',N'vinhpq',  'Nam', '$2a$10$aF6y9hGg06.We5mXYua13eM/N4o2wq0UZSD2JgC0PVja.1x1chXjS', N'0862738927', N'vinhpqpc04338@fpt.edu.vn', 'https://firebasestorage.googleapis.com/v0/b/davitickets-2e627.appspot.com/o/vinhpq.jpg?alt=media&token=635b97b6-bdf4-49b5-ae07-a802c17a979e', 1, 1, CAST('11-15-2003' AS DATE), CAST('7-22-2023' AS DATE), NULL),
	(N'Đoàn Hiệp Sỹ',N'sydh', 'Nam', '$2a$10$DYKf7ahE.Feac9JEy8exP.hMYXtaI5aayfeYua0ZCGVV0RXvu5.Gy', N'0836452473', N'sydhpc04388@fpt.edu.vn', 'https://firebasestorage.googleapis.com/v0/b/davitickets-2e627.appspot.com/o/sydh.jpg?alt=media&token=f907c8e9-4712-4448-b7a9-1d9df8f9b053', 1, 1, CAST('4-7-2003' AS DATE), CAST('7-22-2023' AS DATE), NULL),
	(N'Nguyễn Khánh Đan',N'dannk', 'Nữ', '$2a$10$CRFxFV1oJiYT0rTa3STe.ubKEz1V59HrdOSCl1OA6uVG2xYretjQ6', N'0924637483', N'dannkpc04351@fpt.edu.vn', 'https://firebasestorage.googleapis.com/v0/b/davitickets-2e627.appspot.com/o/dannk.jpg?alt=media&token=2cb34557-c380-4095-8a10-8a211add0940', 1, 1, CAST('11-7-2003' AS DATE), CAST('7-22-2023' AS DATE), NULL),
	(N'Châu Hoài Phúc', N'phucch','Nam', '$2a$10$pT5QFvN2Ha5jiOCtZTK.ZOY0dS5MKC/K31S2jyg2Ln978nju1BxCq', N'0918093162', N'phucchpc04191@fpt.edu.vn', 'https://firebasestorage.googleapis.com/v0/b/davitickets-2e627.appspot.com/o/phucch.jpg?alt=media&token=8ee61c10-23b1-41a5-97ed-b1e0e6d894ed', 1, 1, CAST('11-2-2003' AS DATE), CAST('7-22-2023' AS DATE), NULL),
	(N'Quách Hữu Nghĩa',N'nghiahq', 'Nam', N'$2a$10$WzBhlbBVtJxyafSiM1os9.4S0tDkSmoYgWY/om0Ma7dBBz9jlpUUq', N'012346789', N'nghiaqh@fe.edu.vn', 'https://firebasestorage.googleapis.com/v0/b/davitickets-2e627.appspot.com/o/thaynghia.jpg?alt=media&token=9fc95aed-1dfe-4b87-8ebe-2903ffd50678', 1, 1, CAST('1-1-1990' AS DATE), CAST('7-22-2023' AS DATE), NULL)

INSERT INTO user_role VALUES
	(1,1),
	(2 ,2),
	(3 ,2),
	(4 ,2),
	(5 ,2),
	(6 ,2),
	(7 ,1),
	(7 ,2)
```
</details> 

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
|Frog Dev|frogdev@gmail.com|ROLE_USER|
|Nguyễn Nhân Viên|viennn@gmail.com|ROLE_STAFF|



## Tạo dự án

### Tạo dự án với Spring Tools Sute

> [!TIP]
> Các bạn có thể tải [Spring Tools Sute](/post/backend/jwt-springboot/#spring) tại [đây]() nhé.
>
> Hoặc cũng có thể sử dụng [VS Code](/post/backend/jwt-springboot/#spring) thay thế!

Các bạn tạo dự `Spring Stater Project` và thêm các `dependencies` sau nhé (mình sẽ bỏ qua các _dependencies_ mặc định và chỉ đề cập đến những _dependencies_ cần thiết cho dự án hôm nay thôi nhé)

_pom.xml_
```xml
<dependencies>		
	<dependency>
		<groupId>io.jsonwebtoken</groupId>
		<artifactId>jjwt</artifactId>
		<version>0.9.1</version>
	</dependency>

	<dependency>
		<groupId>com.auth0</groupId>
		<artifactId>java-jwt</artifactId>
		<version>3.19.2</version>
	</dependency>
</dependencies>
```


### Cấu hình các biến môi trường

- Tùy chỉnh theo yêu cầu của bạn trong tệp [`application.properties`](/post/backend/jwt-springboot/#spring)

```properties
spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true

#dtb
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=DaviTickets;encrypt=true;trustServerCertificate=true;
spring.datasource.username=sa
spring.datasource.password=123
spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver

#JWT
jwt.secret=davisy@poly@@
jwt.header=Authorization
jwt.value=Bearer
```

## Tạo các đối tượng Entities

- Đối tượng `Users` implement lớp `UserDetails`

_User.java_
```java
@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class Users implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int userid;
	String full_name;
	String user_name;
	String gender;
	String user_password;
	String phone;
	String email;
	String profile_picture;
	boolean account_status;
	Boolean processed_by;
	@Temporal(TemporalType.DATE)
	Date user_birtday = new Date();
	@Temporal(TemporalType.DATE)
	Date user_dayjoin = new Date();
	String gg_id;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "users")
	List<Booking> booking;


	@ManyToMany(fetch = FetchType.LAZY, targetEntity = Roles.class)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "userid", referencedColumnName = "userid"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id"))

	Set<Roles> roles = new HashSet<>();

	public String[] getAuth() {
		List<String> roles = new ArrayList<>();
		for (Roles role : this.roles) {
			roles.add(role.getName().substring(5));
		}
		return roles.toArray(new String[0]);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Roles role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
            
            System.out.println("ROLE: " + role.getName());
        }
        return authorities;
	}

	public boolean isUser() {
		return Arrays.asList(this.getAuth()).contains("USER");
	}

	public boolean isAdmin() {
		return Arrays.asList(this.getAuth()).contains("ADMIN");
	}
}
```

- Đối tượng `Roles` 

_Roles.java_
``` java 
@Data
@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class Roles implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer role_id;

	String name;
	String role_des;

	@ManyToMany( mappedBy = "roles",targetEntity = Users.class)
	List<Users>user;
}
```

## Tạo các models tương tác Database

### Lớp UserDAO


_UserDAO.java_

```java
package com.davisys.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.davisys.entity.Users;

public interface UserDAO extends JpaRepository<Users, Integer> {

	@Query(value = "SELECT * FROM users WHERE email=:email OR phone=:email", nativeQuery = true)
	public Users findEmaiAndPhonelUser(String email);
	
	@Query(value = "SELECT * FROM users WHERE email=:email ", nativeQuery = true)
	public Users findEmailUser(String email);

	@Query(value = "SELECT * FROM users WHERE email=:email OR phone=:phone", nativeQuery = true)
	public Users findPhoneAndEmailUser(String email, String phone);
}
```

_RoleDAO.java_
```java
package com.davisys.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.davisys.entity.Roles;

public interface RoleDAO extends JpaRepository<Roles, Integer>{

}
```

### Repositories

_RoleCustomRepo.java_
```java
@Repository
public class RoleCustomRepo {
	@PersistenceContext
	private EntityManager entityManager;

	public List<Roles> getRole(Users user) {
		StringBuilder sql = new StringBuilder()
				.append("SELECT r.name, r.role_des as name FROM users u INNER JOIN user_role ur ON u.userid = ur.userid \r\n"
						+ "INNER JOIN roles r ON r.role_id =ur.role_id ");
		sql.append("WHERE 1=1 ");
		if (user.getEmail() != null) {
			sql.append(" and email=:email");
		}
		NativeQuery<Roles> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
		if (user.getEmail() != null) {
			query.setParameter("email", user.getEmail());
		}
		query.addScalar("name", StandardBasicTypes.STRING);
		query.setResultTransformer(Transformers.aliasToBean(Roles.class));
		return query.list();
	}
}
```

_UserRepo.java_
```java
@Repository
public interface UsersReponsitory extends JpaRepository<Users, Long>{
	Optional<Users>findByEmail(String email);
}
```

## Tạo các Object Authentication

- Lớp `AuthenticationRequest` để nhận data từ request đăng nhập.

_AuthenticationRequest.java_

``` java
package com.davisys.auth;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
	String email;
	String password;
}
```

- Lớp `AutenticationResponse` để trả về `Token` khi đăng nhập.

```java
package com.davisys.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponse {
	String name;
	Collection<SimpleGrantedAuthority> roles = new ArrayList<>();
	String token;
	String refreshToken;
}
```

## Tạo các services

### Lớp JwtService

Tạo lớp `JwtService.java` và thêm hai phương thức sau:

```java
@Configuration
public class JwtService {
	@Value("${jwt.secret}")
    private String secret;
	
    public static final long    JWT_TOKEN_VALIDITY  = 5 * 60 * 60 * 1000; 
	
	// phương thức khởi tạo access token
	public String generateToken(Users user, Collection<SimpleGrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
		
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis()+ JWT_TOKEN_VALIDITY))
				.withClaim("roles", authorities.stream().map(GrantedAuthority:: getAuthority).collect(Collectors.toList()))
				.sign(algorithm);
	}
	
	// phương thức khởi tạo refresh token
	public String generateRefreshToken(Users user, Collection<SimpleGrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
		
		return JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY))
				.sign(algorithm);
	}
}
```
### Lớp Authenticationservice

Bên trong lớp `AuthenticationService.java` tạo phương thức `LoginAuth`


```java
@Service
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class AuthenticationService {
	private final UsersReponsitory usersReponsitory;

	@Autowired
	private final AuthenticationManager authenticationManager;
	private final RoleCustomRepo roleCustomRepo;
	private final JwtService jwtService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public AuthenticationResponse loginAuth(AuthenticationRequest authenticationRequest) {
		try {
			// tìm kiếm user với email nhận từ Request
			Users user = usersReponsitory.findByEmail(authenticationRequest.getEmail()).orElseThrow();
			if(!user.isAccount_status()) return null;

			// Nếu tồn tại và không bị khóa thì tạo ra token
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				authenticationRequest.getEmail(), authenticationRequest.getPassword()
			);

			// lấy ra các quyền của User và truyền vào token
			Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
			Set<Roles> set = new HashSet<>();
			role.stream().forEach(c -> set.add(new Roles(c.getName())));
			user.setRoles(set);
			set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
			authenticationManager.authenticate(token);

			var jwtToken = jwtService.generateToken(user, authorities);
			var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);

			// Trả về thông tin cần thiết
			return AuthenticationResponse.builder().token(jwtToken).refreshToken(jwtRefreshToken)
					.name(user.getFull_name()).roles(authorities).build();
		} catch (Exception e) {
			System.out.println(e);
		}
		return null;
	}
}
```

## Viết API

### Viết api đăng nhập

Tạo lớp `LoginCtrl.java` bên trong package Controller

Mình chỉ viết `controller` để trả về `token` nếu `Request` hợp lệ, còn phần kiểm tra các thông tin khác và trả về thế nào các bạn có thể custom code lại nhá.

```java
@PostMapping("/oauth/login")
public ResponseEntity<AuthenticationResponse> authLog(@RequestBody AuthenticationRequest authenticationRequest) {
	return ResponseEntity.ok(authenticationService.authenticationResponse(authenticationRequest));
}
```

## Lời kết

Trên là toàn bộ về [JWT]() trong [SpringBoot](/post/backend/jwt-springboot/#spring).

Kì sau chúng ta sẽ cùng tìm hiểu về [Security]() trong [SpringBoot](/post/backend/jwt-springboot/#spring) nhé...

Chúc các bạn học tập vui vẻ.

## Chú thích

#### Spring
- **SpringBoot**: Một **Framework** lập trình phía _back-end_ rất phổ biến của Java.

- **Spring Tools Sute**: Công cụ mở rộng của Eclipse. Spring Tool Suite (STS) là một công cụ mở rộng của Eclipse. Sử dụng để phát triển các ứng dụng Web với Spring.

- **VS Code**: Một Code Editor (không phải IDE). Phổ biến cho việc lập trình, hỗ trợ nhiều ngôn ngữ.

- **`application.properties`**: Một file khai báo các biến môi trường trong ứng dụng **SpringBoot** (Tương tự như `.env` trong NodeJS).

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
