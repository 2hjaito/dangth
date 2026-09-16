---
layout: Post
title: Building Json Web Token in Spring Boot
slug: xay-dung-json-web-token-trong-spring-boot
subtitle: Authorization and login in Spring Boot
author: Trần Hữu Đang
date: "2023-10-27"
image: "https://github.com/theanishtar/images/blob/main/frogcyber/post/jwtspringboot/main.png?raw=true"
# arxiv: "https://arxiv.org/abs/2502.13095"
tags: ["Backend", "Authentication", "Authoriztion", "SpringBoot"]

---



[JWT]() is a very secure, effective, and popular user authentication method in the [CSR]() model.

![](https://github.com/theanishtar/images/blob/main/frogcyber/post/jwtspringboot/main.png?raw=true)

While teaching myself RestfulAPI with [SpringBoot](), I built a Web app (SpringBoot, SQL, Angular). You can view the source code [here](https://github.com/Theanishtar/Davitickets)

It includes an authentication feature using **JWT** *(Json Web Token)*, which we'll explore together in today's post!!!

A few notes:
- Today's article only covers JWT within SpringBoot, so you'll need some background in both [JWT]() and [SpringBoot](/spring-boot/)
- This article is taken directly from the project I built, so if anything is unclear, check the project's source code

Okay, let's get started !!!

## Building the database

![Diagram DB](https://github.com/theanishtar/images/blob/main/angurvad/backend/jwt/diagram.png?raw=true)

As you can see in the picture above, we need 3 main tables related to users: **Users**, **Roles**, and **UserRole**.

<details>
<summary><b>Details:</b></summary>

**Users**: holds the list of users
**Roles**: holds all the permissions in the system
**UserRole**: the N-N join table linking them together

</details>


### My-SQL source code
#### Creating the tables

<details>
  <summary><b>SQL Code</b></summary>

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

#### Adding data

<details>
  <summary><b>SQL Code</b></summary>

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
|Frog Dev|frogdev@gmail.com|ROLE_USER|
|Nguyễn Nhân Viên|viennn@gmail.com|ROLE_STAFF|



## Creating the project

### Creating the project with Spring Tools Suite

> [!TIP]
> You can download [Spring Tools Suite](/post/backend/jwt-springboot/#spring) [here]().
>
> Or you can use [VS Code](/post/backend/jwt-springboot/#spring) instead!

Create a `Spring Starter Project` and add the following `dependencies` (I'll skip the default _dependencies_ and only mention the _dependencies_ needed for today's project)

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


### Configuring environment variables

- Customize as needed in the [`application.properties`](/post/backend/jwt-springboot/#spring) file

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

## Creating the Entities

- The `Users` object implements the `UserDetails` class

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

- The `Roles` object

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

## Creating the Database-interaction models

### The UserDAO class


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

## Creating the Authentication objects

- The `AuthenticationRequest` class receives data from the login request.

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

- The `AuthenticationResponse` class returns the `Token` after login.

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

## Creating the services

### The JwtService class

Create the `JwtService.java` class and add the two following methods:

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
### The AuthenticationService class

Inside the `AuthenticationService.java` class, create the `LoginAuth` method


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

## Writing the API

### Writing the login API

Create the `LoginCtrl.java` class inside the Controller package

I'll only write the `controller` to return a `token` if the `Request` is valid; feel free to customize the validation of other information and the response as you see fit.

```java
@PostMapping("/oauth/login")
public ResponseEntity<AuthenticationResponse> authLog(@RequestBody AuthenticationRequest authenticationRequest) {
	return ResponseEntity.ok(authenticationService.authenticationResponse(authenticationRequest));
}
```

## Closing words

That wraps up everything about [JWT]() in [SpringBoot](/post/backend/jwt-springboot/#spring).

Next time we'll explore [Security]() in [SpringBoot](/post/backend/jwt-springboot/#spring) together...

Happy learning, everyone.

## Notes

#### Spring
- **SpringBoot**: a very popular Java _back-end_ **Framework**.

- **Spring Tools Suite**: an Eclipse-based extension tool. Spring Tool Suite (STS) is an extension of Eclipse used to develop Web applications with Spring.

- **VS Code**: a Code Editor (not an IDE). Popular for programming, supports many languages.

- **`application.properties`**: a file that declares the environment variables in a **SpringBoot** application (similar to `.env` in NodeJS).

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
