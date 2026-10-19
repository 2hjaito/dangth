---
layout: Post
title: "Authentication: Cẩm nang phỏng vấn"
subtitle: "System Design & Backend Interview Prep"
author: "Trần Hữu Đang"
date: "2026-10-19"
useHeaderImage: false
headerMask: "rgba(39, 77, 61, 0.61)"
tags:
  - Authentication
  - Security
  - OAuth
  - JWT
  - Phỏng vấn
---

<!-- Nội dung:
- Session vs Token, JWT, OAuth 2.0 & OpenID Connect.
- Lưu mật khẩu, MFA, các kiểu tấn công thường gặp.
- 13 câu hỏi phỏng vấn và checklist trước buổi phỏng vấn. -->

<!-- more -->

Bài này tổng hợp những gì cần nắm về **Authentication** cho vòng phỏng vấn Backend / System Design: session hay token, OAuth 2.0 và OpenID Connect, bên trong JWT có gì và những cái bẫy của nó, MFA, cùng các lỗ hổng bảo mật mà interviewer mong bạn **tự nêu ra** mà không cần gợi ý.

| Phạm vi | Level | Hình thức |
|---|---|---|
| Session · Token · OAuth/OIDC · Security | Mid đến Senior Backend / SDE | Kiến thức + 13 câu hỏi phỏng vấn |

## 1. Authentication vs Authorization

Đây là điều interviewer kiểm tra **đầu tiên** — nhầm lẫn hai khái niệm này ngay phút đầu là một tín hiệu xấu.

| | Authentication (AuthN) | Authorization (AuthZ) |
|---|---|---|
| Câu hỏi | **Bạn là ai?** | **Bạn được làm gì?** |
| Ý nghĩa | Xác minh danh tính: kiểm tra mật khẩu, token hợp lệ, sinh trắc học | Quyết định user đã xác thực có được thực hiện hành động hay không, dựa trên role, permission, policy |
| Kết quả | Một danh tính đã được xác nhận | Cho phép hoặc từ chối |

> [!TIP]
> Luồng đăng nhập là **authentication**. Kiểm tra xem user đã đăng nhập có được xóa bài viết của người khác hay không là **authorization**. Rất nhiều hệ thống trộn lẫn hai thứ này — chỉ ra được chỗ một thiết kế mắc lỗi đó là dấu hiệu bạn có kinh nghiệm thực tế.

### Ý tưởng cốt lõi

Hầu như mọi cơ chế xác thực đều quy về: chứng minh bạn **biết một bí mật** (mật khẩu, private key, sinh trắc học) hoặc **sở hữu một vật** (token, cookie, thiết bị) — sau đó server cấp một **credential** để bạn không phải chứng minh lại ở mỗi request. Cả lĩnh vực này thực chất xoay quanh việc credential đó được **lưu**, **truyền** và **thu hồi** như thế nào.

## 2. Session vs Token

Ngã rẽ phổ biến nhất trong system design: **cookie/session có trạng thái** hay **token phi trạng thái**. Hãy nắm được trade-off, không chỉ định nghĩa.

### Session-based (stateful)

Khi đăng nhập, server tạo một bản ghi session (trong memory, Redis hoặc DB) và gửi cho client một session ID qua cookie. Mỗi request, server tra ID đó để tìm session.

```http
POST /login HTTP/1.1
Content-Type: application/json

{ "username": "dang", "password": "••••••" }
```

Server tạo session trong Redis (`sess:abc123 → { user_id: 42 }`) rồi trả session ID qua cookie:

```http
HTTP/1.1 200 OK
Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Strict
```

Các request sau, trình duyệt tự gửi kèm cookie, server tra `sess:abc123` trong Redis → `user_id 42` → xử lý tiếp:

```http
GET /profile HTTP/1.1
Cookie: session_id=abc123
```

### Token-based (stateless — ví dụ JWT)

Khi đăng nhập, server cấp một token **đã ký** chứa danh tính và các claim của user. Client gửi token ở mỗi request; server chỉ cần **verify chữ ký** — không phải tra cứu gì.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{ "access_token": "eyJhbGciOi...", "token_type": "Bearer", "expires_in": 900 }
```

Token chứa sẵn claim (`{ sub: "42", role: "admin", exp: 1723000000 }`). Client gửi kèm ở mỗi request, server chỉ verify chữ ký và hạn dùng tại chỗ — không cần gọi DB/Redis:

```http
GET /profile HTTP/1.1
Authorization: Bearer eyJhbGciOi...
```

| | Session | Token (JWT) |
|---|---|---|
| Trạng thái server | Stateful — cần session store | Stateless — không lưu gì ở server |
| Thu hồi | Tức thì — xóa bản ghi session | Khó — token còn hiệu lực đến khi hết hạn |
| Chi phí đọc | Thêm một lần tra cứu mỗi request (Redis) | Không tra cứu — chỉ verify chữ ký |
| Dùng giữa nhiều service | Khó — service nào cũng cần truy cập session store | Tự nhiên — service nào có public key đều verify được |
| Kích thước | Nhỏ (chỉ là ID) | Lớn hơn — claim đi kèm mỗi request |

> [!NOTE]
> **Mẫu câu trả lời tốt:** "Session cho tôi khả năng thu hồi tức thì, đổi lại phải tra cứu ở mỗi request và chia sẻ trạng thái giữa các service. Token bỏ được bước tra cứu và hợp với microservice, nhưng mất khả năng thu hồi tức thì — tôi sẽ bù lại bằng thời hạn ngắn kèm refresh token, hoặc một denylist."

## 3. Bên trong JWT

Nhiều ứng viên chỉ dùng thư viện JWT nên không giải thích được bên trong có gì, hay vì sao nó được **"ký"** chứ không phải **"mã hóa"**. Interviewer hay hỏi xoáy đúng chỗ này.

### Cấu trúc: ba đoạn base64url nối bằng dấu chấm

```js
// JWT = header.payload.signature
const header = { alg: "HS256", typ: "JWT" };
const payload = { sub: "42", role: "admin", iat: 1722996400, exp: 1723000000 };

const signature = HMACSHA256(
  base64url(header) + "." + base64url(payload),
  secret
);

const token = `${base64url(header)}.${base64url(payload)}.${base64url(signature)}`;
```

> [!WARNING]
> Payload chỉ được **base64-encode**, **không mã hóa** — ai cũng decode và đọc được. Chữ ký chỉ chứng minh payload **không bị sửa**, chứ không che giấu nội dung. Đừng bao giờ đặt bí mật (mật khẩu, PII thô) vào payload JWT.

### Ký đối xứng vs bất đối xứng

- **HS256 (HMAC)** — một secret dùng chung để ký và verify. Đơn giản, nhưng service nào verify token cũng phải giữ đúng secret có thể **ký** token — lộ ở một chỗ là giả mạo được ở mọi chỗ.
- **RS256 (RSA)** — auth server ký bằng **private key**; mọi service verify bằng **public key** tương ứng nhưng không thể tạo token mới. Đây là lý do RS256 là tiêu chuẩn cho microservice và việc verify token từ bên thứ ba.

### Các claim chuẩn nên biết

| Claim | Ý nghĩa |
|---|---|
| `sub` | Subject — user/thực thể mà token đại diện |
| `iat` | Issued at — thời điểm phát hành (Unix timestamp) |
| `exp` | Expiration — server phải từ chối token đã quá hạn |
| `iss` | Issuer — auth server nào đã phát hành token |
| `aud` | Audience — token dành cho service nào |

### Bài toán thu hồi

Vì verify hoàn toàn tại chỗ (không tra DB), một JWT bị lộ hoặc đã logout **vẫn hợp lệ cho đến khi hết hạn** — không có thao tác "xóa" như session. Các cách giảm thiểu phổ biến:

- **Thời hạn ngắn** (vài phút) cho access token để thu hẹp khoảng thời gian bị khai thác.
- **Refresh token** — token sống lâu hơn, **thu hồi được** (thường lưu ở server), dùng để cấp access token mới.
- **Denylist** — một store nhỏ ở server chứa ID các token đã bị thu hồi, được kiểm tra trước khi tin một chữ ký hợp lệ (cố ý đưa lại một chút trạng thái, chỉ cho những token cần hủy sớm).

## 4. OAuth 2.0 & OpenID Connect

Chủ đề hay bị nhầm nhất trong phỏng vấn auth. **OAuth** là để **ủy quyền** (delegated access), không phải để xác định danh tính — **OpenID Connect (OIDC)** mới là lớp danh tính được xây trên OAuth.

> [!WARNING]
> "Sign in with Google" trông như authentication, nhưng thực chất là **OAuth** (ủy quyền) + **OIDC** (lớp danh tính) phối hợp với nhau. OAuth thuần không được thiết kế để trả lời "user này là ai" — nó trả lời "app này có được hành động thay mặt user hay không".

### Authorization Code flow (phải thuộc lòng)

1. User bấm "Sign in with Google" → app redirect tới authorization endpoint của Google.
2. User đăng nhập Google và đồng ý các scope được yêu cầu.
3. Google redirect về app kèm một **authorization code** ngắn hạn trên URL.
4. Backend của app đổi code đó lấy **access token** (và **ID token** nếu dùng OIDC) bằng cách gọi trực tiếp token endpoint của Google, **server-to-server**, kèm **client secret**.
5. App có access token để gọi API của Google, và (với OIDC) ID token chứng minh danh tính user.

> [!NOTE]
> **Vì sao trình duyệt chỉ nhận code, không nhận token?** Authorization code chỉ dùng **một lần**, sống rất ngắn, và bước đổi token cần client secret mà chỉ backend nắm giữ. Nếu trả access token thẳng về trình duyệt, nó sẽ bị lộ trong lịch sử trình duyệt, log, và với mọi script chạy trên trang.

### Access token vs ID token vs Refresh token

| Token | Mục đích | Ai đọc |
|---|---|---|
| Access token | Cho phép gọi API thay mặt user | Resource server (API được gọi) |
| ID token (OIDC) | Chứng minh user là ai — một JWT chứa claim danh tính | Chính ứng dụng client |
| Refresh token | Lấy access token mới mà không cần đăng nhập lại | Chỉ authorization server |

### PKCE — vì sao mobile/SPA cần nó

Public client (mobile app, SPA) **không thể giữ client secret an toàn** — secret có thể bị trích ra từ file app hoặc JS bundle. **PKCE** (Proof Key for Code Exchange) giải quyết việc này: client sinh một chuỗi bí mật ngẫu nhiên (**code verifier**), gửi giá trị hash của nó (**code challenge**) trong request ủy quyền ban đầu, rồi gửi verifier gốc khi đổi token — chứng minh mình chính là client đã bắt đầu luồng, mà không cần secret cố định.

## 5. Lưu mật khẩu & MFA

Phần ngắn nhưng **trọng số cao** — "bạn lưu mật khẩu thế nào?" được hỏi liên tục vì câu trả lời sai quá phổ biến.

### Đừng bao giờ làm thế này

> [!WARNING]
> Lưu mật khẩu dạng **plaintext**, dùng **mã hóa đảo ngược được**, hoặc dùng hash nhanh đa dụng như **MD5** hay **SHA-256** không có salt. Hash nhanh chính là thứ bạn **không** muốn — chúng khiến brute-force và rainbow table trở nên rẻ.

### Nên trả lời thế nào

Dùng thuật toán hash mật khẩu **chậm, có salt, chuyên dụng**: **bcrypt**, **scrypt** hoặc **Argon2** (Argon2id là best practice hiện tại). Chúng được thiết kế để chậm và tốn bộ nhớ, khiến brute-force quy mô lớn rất tốn kém ngay cả khi database bị lộ. **Salt** là duy nhất cho mỗi mật khẩu và được lưu cùng hash — vô hiệu hóa rainbow table tính sẵn.

### Xác thực đa yếu tố (MFA)

- **Thứ bạn biết** — mật khẩu, PIN
- **Thứ bạn có** — điện thoại (SMS/push), khóa phần cứng, app authenticator (TOTP)
- **Thứ bạn là** — sinh trắc học (vân tay, khuôn mặt)

MFA yêu cầu ít nhất **hai nhóm khác nhau**. Cần biết rằng MFA qua **SMS là yếu nhất** — dễ bị tấn công SIM-swap — trong khi app TOTP và khóa phần cứng (**FIDO2/WebAuthn**) mạnh hơn.

## 6. Các kiểu tấn công & cách phòng thủ

Interviewer mong bạn **tự nêu tên và giải thích** những thứ này — đây là bộ lọc "bạn đã thực sự ship code auth chưa".

| Tấn công | Chuyện gì xảy ra | Phòng thủ |
|---|---|---|
| CSRF | Trang độc hại lừa trình duyệt của user đã đăng nhập gửi request ngoài ý muốn, dựa vào session cookie sẵn có | CSRF token, cookie `SameSite=Strict/Lax` |
| XSS | Script bị chèn chạy trong trình duyệt nạn nhân, đánh cắp token/cookie từ localStorage hoặc cookie không `HttpOnly` | Encode output, header CSP, cookie `HttpOnly` để JS không đọc được |
| Session fixation | Kẻ tấn công gán sẵn một session ID đã biết cho nạn nhân trước khi đăng nhập, rồi chiếm session sau khi xác thực | Tạo lại session ID mỗi khi thay đổi quyền (đăng nhập, nâng quyền) |
| Token replay | Token/session hợp lệ bị đánh cắp và dùng lại | Thời hạn ngắn, token binding, HTTPS mọi nơi để chống nghe lén |
| Credential stuffing | Thử hàng loạt cặp username/password bị lộ từ các vụ rò rỉ khác | Rate limiting, MFA, kiểm tra mật khẩu đã bị lộ khi đăng ký |

### Lưu token ở đâu phía client?

| | HttpOnly Cookie | LocalStorage |
|---|---|---|
| XSS | ✅ Miễn nhiễm việc bị đánh cắp token (JS không đọc được) | ❌ Script bị chèn đọc được toàn bộ — một lỗ XSS là mất token |
| CSRF | ❌ Dễ bị CSRF nếu không có `SameSite` và CSRF token | ✅ Miễn nhiễm (trình duyệt không tự gửi) |

> [!NOTE]
> **Mẫu câu trả lời tốt:** "Mặc định tôi dùng cookie `HttpOnly`, `Secure`, `SameSite` cho session/refresh token — nó chặn được nhóm lỗ hổng phổ biến và nguy hiểm hơn (XSS đánh cắp token), đổi lại cần các biện pháp chống CSRF tiêu chuẩn, vốn đã được hiểu rõ và rẻ để làm đúng."

## 7. Ngân hàng câu hỏi phỏng vấn

13 câu hỏi trải từ kiến thức nền, system design đến bảo mật chuyên sâu — gần với những gì bạn gặp trong một vòng phỏng vấn backend đầy đủ.

### Câu 1. Phân biệt authentication và authorization, cho ví dụ. `CONCEPT`

Authentication xác nhận danh tính (đăng nhập bằng mật khẩu). Authorization quyết định danh tính đó được làm gì (user này có được xem dữ liệu thanh toán của user khác không). Hãy **chủ động đưa ví dụ cụ thể** — nó cho thấy bạn không chỉ học thuộc định nghĩa.

### Câu 2. Thiết kế hệ thống xác thực cho 10 triệu user trên cả mobile và web. `SYSTEM DESIGN`

Bắt đầu từ trade-off session vs token ([mục 2](#2-session-vs-token)). Với nhiều loại client và nhiều service, hình mẫu chuẩn là **JWT access token ngắn hạn** + **refresh token lưu ở server** — bàn về cách lưu token theo từng client (cookie `HttpOnly` cho web, secure storage/keychain cho mobile) và cách thu hồi refresh token bị lộ.

### Câu 3. Vì sao không thể thực sự "logout" một JWT như session? `CONCEPT`

Việc verify là stateless — server không tra cứu gì, chỉ kiểm tra chữ ký và hạn dùng. Không có gì để xóa cả. Giảm thiểu bằng thời hạn ngắn, thu hồi refresh token, hoặc denylist cho các trường hợp hiếm cần hủy sớm ([mục 3](#3-bên-trong-jwt)).

### Câu 4. Mô tả từng bước chuyện gì xảy ra khi user bấm "Sign in with Google". `DEPTH`

Toàn bộ luồng OAuth Authorization Code + OIDC — redirect sang Google, user đồng ý, redirect về kèm code, backend đổi code lấy token server-to-server bằng client secret, app nhận ID token (danh tính) và access token (quyền gọi API). Nhấn mạnh vì sao **code** — chứ không phải token — đi qua trình duyệt ([mục 4](#4-oauth-20--openid-connect)).

### Câu 5. Bạn lưu mật khẩu user trong database thế nào? `CONCEPT`

Không bao giờ plaintext hay mã hóa đảo ngược được. Dùng hash chậm, có salt, chuyên dụng — bcrypt, scrypt hoặc Argon2id — chính vì chúng tốn kém để brute-force ngay cả khi bị lộ, khác với hash nhanh đa dụng như SHA-256.

### Câu 6. CSRF là gì, phòng chống thế nào? `SECURITY`

Một trang độc hại kích hoạt request tới site của bạn bằng session cookie sẵn có của nạn nhân — thứ mà trình duyệt tự động gửi kèm. Phòng chống: **CSRF token** gắn với session và được kiểm tra mỗi request, và cookie **`SameSite=Strict`** hoặc **`Lax`** để trình duyệt không gắn cookie vào request cross-site ngay từ đầu.

### Câu 7. Frontend nên lưu access token ở cookie hay localStorage? Giải thích. `DEPTH`

Câu trả lời được kỳ vọng là **cookie `HttpOnly` theo mặc định**, vì XSS đánh cắp token từ localStorage thường nguy hiểm hơn và khó ngăn chặn triệt để hơn CSRF — vốn đã có các biện pháp phòng thủ trưởng thành, rẻ. Câu trả lời tốt sẽ **thừa nhận trade-off thật** thay vì coi một lựa chọn là đúng tuyệt đối ([mục 6](#6-các-kiểu-tấn-công--cách-phòng-thủ)).

### Câu 8. PKCE là gì và vì sao mobile app cần nó? `DEPTH`

Client mobile/SPA không thể nhúng client secret an toàn vì có thể bị trích xuất từ app. PKCE thay secret bằng cặp code verifier/challenge sinh động, được chứng minh lúc đổi token, giúp luồng vẫn an toàn mà không cần secret cố định ([mục 4](#4-oauth-20--openid-connect)).

### Câu 9. User báo tài khoản bị chiếm sau khi dùng Wi-Fi công cộng. Bạn xử lý sự cố thế nào? `DEPTH`

Ngay lập tức **thu hồi mọi session/refresh token** của user đó, **bắt buộc đổi mật khẩu**, và kiểm tra session fixation hoặc token replay là hướng tấn công khả dĩ nếu kết nối không được HTTPS bảo vệ xuyên suốt. Về lâu dài: đảm bảo **HSTS** và HTTPS được áp dụng ở mọi nơi, vì tấn công qua Wi-Fi mở thường dựa vào việc nghe lén traffic không mã hóa.

### Câu 10. Phân biệt access token và refresh token. `CONCEPT`

**Access token** sống ngắn, dùng trực tiếp với API — nếu bị đánh cắp thì thời gian bị khai thác ngắn. **Refresh token** sống lâu hơn, chỉ dùng với authorization server để cấp access token mới, và quan trọng là **thu hồi được ở server** — đó là cách bạn lấy lại khả năng "logout" cho hệ thống dùng token.

### Câu 11. Thiết kế xác thực cho hệ thống gồm nhiều microservice nội bộ thế nào? `SYSTEM DESIGN`

Ưu tiên **JWT ký bất đối xứng (RS256)** từ một identity provider trung tâm — mọi service verify token tại chỗ bằng public key mà không phải gọi về session store trung tâm ở mỗi request, tránh rủi ro lộ secret dùng chung và tránh một điểm nghẽn/điểm lỗi duy nhất khi scale.

### Câu 12. Rủi ro khi đặt dữ liệu nhạy cảm trong payload JWT là gì? `CONCEPT`

Payload JWT chỉ được base64-encode, **không mã hóa** — ai chặn được hoặc được đưa token đều decode và đọc được mọi claim. Chỉ có chữ ký được bảo vệ. Dữ liệu nhạy cảm (PII thô, bí mật) không bao giờ được nằm trong payload; chỉ giữ các định danh không nhạy cảm.

### Câu 13. Bạn triển khai rate limiting cho endpoint đăng nhập thế nào, và vì sao nó đặc biệt quan trọng với auth? `SECURITY`

Rate limit **theo IP** và **theo tài khoản** (chống cả tấn công phân tán lẫn tấn công nhắm vào một tài khoản), kèm exponential backoff hoặc khóa tạm thời sau nhiều lần thất bại. Nó đặc biệt quan trọng vì endpoint đăng nhập là mục tiêu trực tiếp của credential stuffing và brute-force — khác với đa số endpoint, lần đăng nhập thất bại ở đây là **tín hiệu bảo mật**, không chỉ là nhiễu.

## 8. Checklist trước buổi phỏng vấn

Ôn lại tối hôm trước. Nếu bạn giải thích được từng dòng thành tiếng mà không cần ghi chú, bạn đã sẵn sàng.

- [ ] Phân biệt được authentication và authorization kèm ví dụ cụ thể, không cần gợi ý
- [ ] So sánh được session và JWT về thu hồi, tính stateless và dùng giữa nhiều service
- [ ] Giải thích được bên trong JWT có gì, và vì sao "đã ký" không có nghĩa là "đã mã hóa"
- [ ] Trình bày được toàn bộ luồng OAuth Authorization Code + OIDC từng bước
- [ ] Biết vì sao mật khẩu cần bcrypt/Argon2 chứ không phải SHA-256, và vì sao cần salt
- [ ] Nêu tên và cách phòng chống CSRF, XSS đánh cắp token và session fixation
- [ ] Có sẵn một ví dụ thực tế: một bug hoặc sự cố auth bạn từng xử lý và cách khắc phục

## Tổng kết

> [!TIP]
> Khi được yêu cầu "thêm chức năng đăng nhập" trong vòng system design, đừng vội nhảy ngay vào "dùng JWT". Hãy nêu **trade-off trước** — bao nhiêu service cần xác minh danh tính, có cần thu hồi tức thì không, đang hỗ trợ những client nào (web, mobile, bên thứ ba) — rồi để lập luận đó dẫn bạn tới session, token hay kết hợp cả hai. **Thứ tự suy nghĩ đó** chính là thứ phân biệt câu trả lời senior với junior.

*Tham khảo: Authentication for Software Engineering Interviews*
