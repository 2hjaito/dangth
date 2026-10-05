---
title: "Rebuilding Reddit's Comment System: From Python Monolith to Go Microservices"
slug: tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices
subtitle: Lessons on data migration strategy, performance, and consistency at scale
author: [Trần Hữu Đang] 
date: "2025-12-15"
image: /images/post/2025-12-15-tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices/banner.webp
tags:
  - Backend
  - Kiến trúc hệ thống
  - Microservices
  - Golang
  - Python
  - Hiệu năng
  - Migration
  - Reddit
published: true

---

<!-- # Tái Thiết Hệ Thống Comment của Reddit: Từ Python Monolith Đến Go Microservices -->
Hey fellow Backend Engineers and System Architects,

In the development world, maintaining an old, massive-scale core system is always a challenge. Recently, Reddit carried out a notable "major surgery": completely rebuilding the Comment system — one of the most important and highest-traffic components — moving it from an old Python monolith service to a modern microservices architecture using **Go (Golang)**.

This isn't just another routine tech migration project. It's a textbook case study of how engineering teams solve **scalability, performance,** and **maintainability** problems in a high-load environment. Reddit's success in extracting a "core model" from the old monolith offers many valuable lessons that any backend engineer considering a migration should look into.


![](/images/post/2025-12-15-tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices/banner.webp)

---

## The Old Architecture's Context: The Challenges of a Python Monolith

<img 
  src="/images/post/2025-12-15-tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices/python-monolith-architecture.webp"
  width="50%"
  alt="Python monolith architecture"
/>


Before deciding to migrate, all of Reddit's core data models — including **Comments, Accounts, Posts,** and **Subreddits** — lived together inside a single Python service. This was a classic **monolith** architecture.

- **Architecture:** The old Python Monolith.
- **Problems at scale:**
  - **Unstable performance:** As traffic surged, the system started showing high latency, especially at higher percentiles ($p99$).
  - **Degraded reliability:** Isolating failures was hard, so a problem in one part of the system could affect the entire service. This sometimes led to latency spikes as high as 15 seconds.
  - **Complex maintainability:** Many teams shared and maintained the same massive codebase, slowing down development velocity and increasing deployment risk.

Reddit realized that to keep scaling and preserve the user experience, they needed a more flexible, robust, and stable architecture.


---

> [!INFO]
> **What is a Monolith?**
> - A monolith is a software architecture where all components (database, business logic, UI) are packaged and deployed as a single code unit.
> - Pros: Easy to develop initially, easy to deploy.
> - Cons: Hard to scale independently, hard to maintain as the codebase grows, a failure in one part can bring down the whole system.

## Why Did Reddit Choose Go and a Microservices Architecture?

<img 
  src="/images/post/2025-12-15-tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices/go-microservices-comment-service.webp"
  width="50%"
  alt="go-microservices-comment-service"
/>

The first step in the migration was identifying which component should be prioritized for conversion. The **Comments** system was chosen because it had:

* **A distinctive workload:** **High write/read** volume and a requirement for **low latency** to ensure a real-time interactive experience.

After identifying the need, Go was chosen to replace the Python monolith for the following core advantages:

* **Concurrency and Performance:** Go is designed with outstanding concurrency handling through **goroutines**, making it a great fit for I/O-bound, high-throughput services like a comment system. This promised a significant improvement in latency.
* **Operational Simplicity:** Go produces standalone binaries, making packaging, deployment, and operations much simpler than Python's runtime environment.
* **Ecosystem:** The tooling ecosystem supporting microservices (such as RPC frameworks) and the language's strictness (static typing) help increase the new system's stability and safety.

> [!TIP]
> **Go (Golang) for Backend**
> - Go stands out for its efficient concurrency management through Goroutines, ideal for services that need to handle thousands of requests at once (I/O Bounded Workloads).
> - Go is a compiled language, so its performance is usually superior to interpreted languages like Python (for CPU-bound tasks).

---

## A Careful, Safe Migration Strategy

<img 
  src="/images/post/2025-12-15-tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices/tap-compare-read-migration.webp"
  alt="tap-compare-read-migration"
/>

The biggest challenge in migrating a running core system is guaranteeing **data correctness** and the **user experience (zero downtime/impact)**. Reddit applied an extremely careful gradual rollout strategy:

### 1. Handling Read Endpoints

To manage risk, Reddit used **Tap-Compare Testing** for read endpoints:

* **Creating a copy:** A very small fraction of production traffic is "tapped" and sent simultaneously to both services: the old service (Python) and the new service (Go).
* **Comparing and checking:** The system compares the results returned by both services. If there's any discrepancy, the system logs an error and raises an alert.
* **Returning the old result:** The result returned to the end user always comes from the old Python service, so there's no impact if the new Go service errors out or returns incorrect data.

This method let them validate the correctness of the logic in a real-world environment without affecting users.


### 2. Handling Write Endpoints


Write endpoints (e.g., creating a new comment, editing) are more complex because they interact with and modify multiple storage layers (database, cache, event store). To avoid corrupting production data:

* **Using Sister Datastores:** Reddit created separate secondary data stores (**sister datastores**) for testing purposes.
* **Isolated Testing:** Write tests on the new Go system only affected these *sister datastores*.
* **Ensuring Consistency:** Data written to the secondary store was compared against the original data (written to the production store by the Python system) to ensure correctness and consistency before switching over live traffic.

This strategy helped ensure **backward compatibility** and **data integrity** throughout the migration.

> [!WARNING]
> **Data Consistency risk during Migration:**
> - When migrating write endpoints, the biggest risk is corrupting or losing production data.
> - Using **Sister Datastores** (parallel databases used only for testing) is an essential solution to minimize this risk, allowing write operations and correctness checks to run in parallel before fully cutting over to the new system.

---

## Results Achieved: Outstanding Performance


<img 
  src="/images/post/2025-12-15-tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices/write-migration-sister-datastore.webp"
  alt="write-migration-sister-datastore"
/>

After completing the migration, every comment-related endpoint was running on the new Go microservices architecture. This was the first time a core model was successfully split out of the Python monolith.

* **Write performance improvement:** The $p99$ latency of write endpoints **dropped to roughly half** compared to the old Python system.
* **System stability:** The new Go system delivered much higher stability. Latency spikes that used to reach 15 seconds were eliminated, resulting in much greater stability and lower latency.
* **Long-term benefits:** Scalability and maintainability improved significantly, allowing Reddit to handle its massive comment volume more efficiently and speeding up the pace of new feature development.


---

## Lessons Learned for Backend Engineers

This conversion wasn't just a language change — it was a comprehensive shift in architecture and operational mindset.

* **Migration is a multi-dimensional engineering project:** Moving from Python to Go, especially in a high-load system, involves solving a whole range of **edge cases** such as differences in serialization behavior, database query optimization, and the strain placed on the ORM/DB under heavy traffic. Thorough preparation is critical.
* **The importance of Testing and Observability:** **Tap-compare testing** and creating **sister datastores** are essential techniques for verifying the correctness of logic and data during a migration. **Close observability** and a **gradual rollout** are key to handling issues as they arise without affecting users.
* **When Microservices & Go are truly necessary:** Reddit's case study confirms that for systems requiring **extremely high throughput** and **low latency**, moving to a microservices architecture with a language that handles concurrency as well as Go is a sound strategy that delivers clear performance and scalability benefits.

Migration isn't a trend — it's a strategic decision that must be carefully weighed based on the bottlenecks of the current system.

---

## Conclusion

<img 
  src="/images/post/2025-12-15-tai-thiet-he-thong-comment-cua-reddit-tu-python-monolith-den-go-microservices/tap-compare-read-migration.webp"
  alt="tap-compare-read-migration"
/>

Reddit's Comment system rebuild is a textbook example of how a large platform can successfully modernize its core components. It proves that, with a safe, controlled, data-focused migration strategy, moving from a monolith architecture to microservices can deliver remarkable performance and stability.

---

## 💬 Discussion Questions for the Community

As a Backend Engineer or System Architect, what do you think about this case study?

* For a high write/read system you're building or maintaining, do you think splitting it into a microservice and using a concurrency-strong language (like Go) is the optimal solution? What are the trade-offs?
* Have you ever run into difficulties migrating a system (due to a language, database, or architecture change)? How did you handle **data consistency** and **backward compatibility** issues?
* Theo kinh nghiệm của bạn, điều gì nên được ưu tiên hàng đầu trong một cuộc migration lớn: **Hiệu năng và tốc độ triển khai** hay **Độ ổn định và tính đúng đắn của dữ liệu (data correctness)**?