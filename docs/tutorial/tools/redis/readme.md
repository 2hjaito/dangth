# REDIS SERIES — Pub/Sub & Streams

> Nguồn: @p4prateek.tech
> Ghi chú chuyển đổi: PDF gồm 11 trang (1/10 → 10/10 + Bonus), đã sắp xếp lại theo đúng thứ tự series. Nội dung giữ nguyên tiếng Anh như bản gốc, kể cả lỗi chính tả trong ảnh (đánh dấu [sic]). Lưu ý: số thứ tự trong tiêu đề ảnh lệch so với số trang (ví dụ trang 2/10 có tiêu đề "1. Redis Pub/Sub Basics"), mình giữ nguyên cả hai.

---

## 1/10 — REDIS: PUB/SUB & STREAMS
**Real-time messaging. Your way.**

💬 *Same Redis. Different tools. Different use cases. Let's break it down!*

### PUB/SUB
*Broadcast in real-time?*
- Fire and forget.
- Blazing fast. ⚡
- No message history.

```
Publisher → Channel → Subscriber
                    → Subscriber
                    → Subscriber
```

### STREAMS
*Events · Messages · Real-time · Scalable systems*
- Persistent messages.
- Consumer groups.
- Reliable and scalable.

```
Producer → Stream [|||||] → Consumer Group: Consumer 1
                                            Consumer 2
                                            Consumer 3
```

### Use cases
✅ Real-time updates
✅ Notifications
✅ Activity feeds
✅ Event processing
✅ Microservices
✅ Chat systems
✅ And more…

*Right tool for the right problem!*

### redis — SIMPLE. FAST. POWERFUL.
- ⚡ High performance
- ⚙️ Simple APIs
- 🗄️ In-memory (with persistence)
- ↗️ Scales easily
- 💎 Widely used in production

*More than just a cache!*

### WHAT YOU'LL LEARN
1. Pub/Sub basics
2. Redis Streams
3. Consumer groups
4. Reliability & retries
5. Real-world use cases
6. System design deep dive

*10 PAGES OF GOODNESS →*

🚀 MESSAGES POWER POSSIBILITIES.

> "Real-time systems aren't magic. They just have the right data flow."

**REAL-TIME | RELIABLE | SCALABLE | PRACTICAL**

---

## 2/10 — 1. REDIS PUB/SUB BASICS
**Real-time, fire-and-forget messaging**

Redis Pub/Sub allows clients to **publish** messages to a **channel** and all **subscribed clients** receive the message in **real-time**.

💬 *Simple idea. Powerful for real-time systems!*

### Diagram
**Publishers (any client)**
- App 1 — `PUBLISH events "OrderCreated"`
- Server — `PUBLISH events "UserSignedUp"`
- Mobile — `PUBLISH events "ProductUpdated"`

→ **Redis (Pub/Sub)** → **Channel (e.g. "events")** → 

**Subscribers**
- `SUBSCRIBE events` → Subscriber 1 (Web App)
- `SUBSCRIBE events` → Subscriber 2 (Background Worker)
- `SUBSCRIBE events` → Subscriber 3 (Mobile App)

*One message is sent by the publisher and delivered to **all active subscribers** of that channel.*

### 1. WHAT IS REDIS PUB/SUB?
✅ A messaging pattern where clients can:
- Publish a message to a channel
- Subscribe to a channel to receive messages

✅ All subscribers receive the message in real-time.
✅ It is **fire-and-forget** (no persistence, no ack).
✅ Used for real-time communication between services, apps or users.

⭐ Think of it like a live announcement system — whoever is listening, gets the message! 📢

### 2. HOW IT WORKS?
1. A client subscribes to a channel using `SUBSCRIBE`.
2. A publisher sends a message to that channel using `PUBLISH`.
3. Redis immediately pushes the message to all currently subscribed clients.
4. If a client is not subscribed at the time of publishing, it **will not receive the message**.

⭐ Redis keeps a list of active subscribers for each channel and pushes the message to them over their open connection.

### 3. EXAMPLE COMMANDS
```
# Terminal 1 - Subscriber
127.0.0.1:6379> SUBSCRIBE events
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "events"
3) (integer) 1
```
*← Client is now listening to the 'events' channel*

```
# Terminal 2 - Publisher
127.0.0.1:6379> PUBLISH events "OrderCreated:123"
(integer) 1
```
*← Message sent to channel 'events'*

```
# Output in Subscriber (Terminal 1)
1) "message"
2) "events"
3) "OrderCreated:123"
```
*← Subscriber receives the message instantly!*

### 4. KEY CHARACTERISTICS
✅ Real-time message delivery
✅ No message persistence (messages are lost if no subscribers)
✅ No acknowledgment (fire-and-forget)
✅ Supports multiple subscribers
✅ Lightweight and high performance
✅ Pattern-based subscriptions (e.g. news.*)
✅ Works across different clients (any Redis supported language)

⚡ *Fast · Simple · Ephemeral*

### 5. COMMON USE CASES
- 💬 Real-time chat applications
- 🔔 Notifications (in-app / live)
- 📊 Live dashboards and analytics
- 🎮 Online gaming (live events)
- 📡 Live updates (sports, stock prices)
- 👥 Microservices communication
- (•) Presence systems (user online/offline)
- ⋮ And many more…

🚀 Real-time ideas. Real-world impact.

> "Sometimes, you just need to say it once, to everyone who's listening."

**Next up:** 3. Pub/Sub Internals (How Redis delivers messages) → 2/10

---

## 3/10 — 2. HOW REDIS PUB/SUB WORKS
**A look under the hood – simple, fast and efficient.**

Redis Pub/Sub is built into the Redis server. When a client **publishes** a message, Redis looks up all **active subscribers** of that channel and pushes the message to them **immediately** over their open connections.

💬 *No queues. No disk. Just instant delivery!*

### 1. HIGH LEVEL FLOW
```
Publisher (Client A) ── PUBLISH events "OrderCreated" ──► Redis Server
                                                           │ Pushes message to all active subscribers
                                                           ├─► Subscriber 1 (Web App)
                                                           ├─► Subscriber 2 (Worker Service)
                                                           └─► Subscriber 3 (Mobile App)
Channels
  events -> [client1, client2, client3]
  orders -> [client4]
  ...
```
⭐ **Key point:** Redis maintains an in-memory mapping of channels to **active client connections** and pushes messages to all of them in **real-time**.

### 2. SUBSCRIBE FLOW (CLIENT SIDE)
A client opens a connection and subscribes to a channel.
```
# Terminal 1 - Subscribe to a channel
127.0.0.1:6379> SUBSCRIBE events
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "events"
3) (integer) 1
```
*The connection stays open and Redis will **push** messages whenever they are published.*

### 3. PUBLISH FLOW (CLIENT SIDE)
Any client can publish a message to a channel.
```
# Terminal 2 - Publish a message
127.0.0.1:6379> PUBLISH events "OrderCreated:123"
(integer) 3
```
The number **3** means the message was delivered to 3 active subscribers.

### 4. WHAT HAPPENS INSIDE REDIS?
1. Client sends PUBLISH command.
2. Redis looks up the list of active subscribers for the channel (e.g. **events**).
3. Redis serializes the message and writes it to each subscriber's connection buffer.
4. Each subscriber receives the message immediately over their open TCP connection.
5. No message is stored on disk or in memory after delivery (it's ephemeral).

*Redis uses an efficient in-memory publish/subscribe engine. It's extremely fast — O(N) where N is the number of subscribers for that channel.*

### 5. MULTIPLE CHANNELS
Clients can subscribe to multiple channels.
```
127.0.0.1:6379> SUBSCRIBE events orders
Reading messages...
1) "psubscribe"   [sic]
2) "events"
3) (integer) 1
1) "subscribe"
2) "orders"
3) (integer) 2
```
*A client can subscribe to **multiple channels** in a single connection.*

### 6. PATTERN SUBSCRIPTIONS
Subscribe to multiple channels using a pattern (wildcards).
```
127.0.0.1:6379> PSUBSCRIBE news.*
Reading messages...
1) "psubscribe"
2) "news.*"
3) (integer) 1

1) "pmessage"
2) "news.*"
3) "news.sports"
4) "Match started!"
```
*Useful for scaling when you have many **dynamic channels** (e.g. per user, per topic).*

### 7. UNEXPECTED DISCONNECTIONS
If a subscriber disconnects, it stops receiving messages immediately.

Subscriber ──✗ (Connection lost) ──► Redis

*Messages sent during this time are lost!*

### 8. IMPORTANT LIMITATIONS
❌ No message persistence
❌ No acknowledgment
❌ Messages are lost if no active subscribers
❌ Not suitable for critical or durable workflows
❌ Does not scale to very large fan-out like dedicated messaging systems (e.g. Kafka).

⭐ Use Redis Streams if you need persistence, replay or reliable processing.

🚀 Fast. Simple. Real-time.

> "Redis Pub/Sub is like a live concert — if you're not there, you miss it!"

**Next up:** 4. Redis Streams Basics (Persistent Messaging) → 3/10

---

## 4/10 — 4. REDIS STREAMS BASICS
**Persistent messaging with a log.**

Redis Streams is an **append-only log** data structure that stores messages in memory (and can be persisted). Messages have **unique IDs** and can be read by **multiple consumers**, even after they are published.

💬 *Unlike Pub/Sub, Streams keep messages, so you can read them later!*

### 1. WHAT ARE REDIS STREAMS?
✅ An append-only log of messages
✅ Each message has a **unique ID**
✅ Messages are persisted (can be read later)
✅ Supports multiple consumers
✅ Built for **reliable** and **scalable** event processing
✅ Ideal for background jobs, event sourcing, activity feeds, etc.

⭐ Think of it as a durable message queue inside Redis!

### 2. STREAM DATA STRUCTURE
Stream (e.g. orders) →
| 1725350000000-0 | 1725350001000-0 | 1725350002000-0 | … |
|---|---|---|---|
| user: 1 | user: 2 | user: 3 | |
| action: signup | action: purchase | action: logout | |

*Messages are stored in order (by ID)*

*Each message has an ID (timestamp-seq) and a set of **field-value pairs**.*

### 3. ADDING MESSAGES – XADD
Use XADD to append a message to a stream.
```
# Add a message to stream "orders"
127.0.0.1:6379> XADD orders * user 1 action signup
"1725350000000-0"

# Another message
127.0.0.1:6379> XADD orders * user 2 action purchase
"1725350001000-0"
```
*Use `*` to auto-generate the ID based on current timestamp.*

### 4. READING MESSAGES – XREAD
Use XREAD to read messages from a stream.
```
# Read all messages from the beginning
127.0.0.1:6379> XREAD STREAMS orders 0
```
```
# Read only new messages (block for up to 5 seconds)
127.0.0.1:6379> XREAD BLOCK 5000 STREAMS orders $
```
*Use `0` to read from the start, `$` to read only new messages.*

Example output:
```
1) 1) "orders"
   2) 1) 1) "1725350000000-0"
         2) 1) "user"   "1"
            2) 1) "action" "signup"
```
⭐ XREAD can also block and wait for new messages!

### 5. READING A RANGE – XRANGE / XREVRANGE
Read messages within a specific ID range.
```
# Read from start to end
127.0.0.1:6379> XRANGE orders - +

# Read last 2 messages (in reverse order)
127.0.0.1:6379> XREVRANGE orders + - COUNT 2
```
*Use XRANGE to go **forward** in time, XREVRANGE to read latest messages.*

### 6. STREAM LENGTH & INFO
Get stream length and other details.
```
# Get number of messages
127.0.0.1:6379> XLEN orders
(integer) 3

# Get stream info
127.0.0.1:6379> XINFO STREAM orders
1) "length"
2) (integer) 3
3) "first-entry"
4) 1) "1725350000000-0"
   2) 1) "user"   "1"
      2) "action" "signup"
5) "last-entry"
6) 1) "1725350002000-0"
   2) 1) "user"   "3"
      2) "action" "logout"
...
```
*Streams give you visibility into message count, first/last message, and more using **XINFO**.*

⭐ Useful for monitoring and debugging!

### 7. DELETING MESSAGES – XDEL
Remove messages from a stream (if no longer needed).
```
# Delete a specific message by ID
127.0.0.1:6379> XREL orders 1725350000000-0   [sic – XDEL]
(integer) 1
```
*Usually you don't delete messages manually. Use **trimming** instead (e.g. XTRIM).*

### 8. TRIMMING STREAMS – XTRIM
Keep only recent messages to control memory usage.
```
# Keep only the last 100 messages
127.0.0.1:6379> XTRIM orders MAXLEN 100
(integer) 0
```
*Important for long-running systems to avoid unbounded growth.*

🚀 Persistent. Reliable. Flexible.

> "Streams turn events into opportunities — because nothing gets lost."

**Next up:** 5. Consumer Groups (Multiple Consumers) → 4/10

---

## 5/10 — 5. REDIS STREAMS CONSUMER GROUPS
**Scale your consumers. Process reliably.**

Consumer Groups allow multiple consumers to work together, where each **message is delivered to only one consumer** in the group, with support for **acknowledgment and retries**.

💬 *Multiple workers. One team. No lost messages!*

### 1. WHAT ARE CONSUMER GROUPS?
✅ Distribute messages across multiple consumers
✅ Each message is delivered to **only one** consumer in the group
✅ Track pending messages (unacknowledged)
✅ Support **retries** if a consumer fails
✅ Ideal for building **reliable and scalable** background processing systems

⭐ Think of it like a team where each task is picked up by one member, tracked, and completed.

### 2. HOW CONSUMER GROUPS WORK?
```
Producer ── XADD ──► Redis Stream (e.g. orders)
                     [ID:1][ID:2][ID:3][ID:4][ID:5]
                        │ ID:1 → Consumer 1
                        │ ID:2 → Consumer 2     } Consumer Group
                        │ ID:3 → Consumer 3     } (e.g. order-processors)
```
*Each message is delivered to **only one consumer** in the group (not to all consumers).*

### 3. CREATING A CONSUMER GROUP – XGROUP
Create a consumer group on a stream.
```
# Create a consumer group
127.0.0.1:6379> XGROUP CREATE orders order-group 0
OK
```
*`0` means **start reading from the beginning**. Use `$` to read only new messages.*

### 4. READING MESSAGES AS A CONSUMER
Read messages using a consumer in the group.
```
# Read messages as a specific consumer
127.0.0.1:6379> XREADGROUP GROUP order-group \
  consumer-1 COUNT 2 STREAMS orders >
```
*`>` means read only new messages (not already delivered to other consumers).*

### 5. ACKNOWLEDGING MESSAGES – XACK
Acknowledge that a message has been processed.
```
# Acknowledge a message
127.0.0.1:6379> XACK orders order-group \
  1725350000000-0
(integer) 1
```
*Once acknowledged, the message is removed from the **Pending Entries List (PEL)**.*

### 6. PENDING ENTRIES LIST (PEL)
Track unacknowledged messages.
```
# See pending messages summary
127.0.0.1:6379> XPENGROUP orders order-group   [sic – XPENDING]
1) (integer) 2              # total pending
2) "1725350000000-0"        # smallest ID
3) "1725350001000-0"        # largest ID
4) 1) "consumer-1"          # per consumer
   2) (integer) 2
```
*Messages stay in the PEL until they are acknowledged. If a consumer crashes, another consumer can claim them.*

### 7. CLAIMING STUCK MESSAGES – XCLAIM
If a consumer fails, another consumer can claim its messages.
```
# Claim pending messages (idle for > 60 seconds)
127.0.0.1:6379> XCLAIM orders order-group
  consumer-2 60000 1725350000000-0

1) 1) "1725350000000-0"
   2) 1) "user"   "1"
      2) "action" "signup"
```
*60000 = 60 seconds (min idle time).*

⭐ Redis 6.2+ provides XAUTOCLAIM to automatically claim and iterate over stale messages.

### 8. XAUTOCLAIM (SIMPLER RETRY)
Automatically claim and return pending messages.
```
# Auto-claim messages idle for > 60 seconds
127.0.0.1:6379> XAUTOCLAIM orders order-group \
  consumer-2 60000 0 COUNT 10
1) "1725350001000-0"          # next start ID
2) 1) 1) "1725350000000-0"
      2) 1) "user"   "1"
         2) "action" "signup"
3) (empty array)              # no deleted IDs
```

### 9. MULTIPLE CONSUMERS IN ACTION
Start multiple consumers, each will get different messages.
```
# Terminal 1
XREADGROUP GROUP order-group \
  consumer-1 COUNT 1 STREAMS orders >
```
```
# Terminal 2
XREADGROUP GROUP order-group \
  consumer-2 COUNT 1 STREAMS orders >
```
*Messages are distributed across consumers. Each message is delivered **to only one consumer**.*

### 10. KEY TAKEAWAYS
✅ Consumer groups enable scalable and reliable processing
✅ Each message is delivered to **only one** consumer
✅ Use XACK to acknowledge processed messages
✅ Use XPENDING to monitor unacknowledged messages
✅ Use XCLAIM or XAUTOCLAIM for retries
✅ Handle failures and ensure idempotent processing
✅ Perfect for background jobs, event processing, and microservices

⭐ Build resilient systems with Redis Streams!

🚀 More than a cache. A reliable message backbone.

> "Failures happen. Good systems pick up where they left off."

**Next up:** 6. Reliability & Retries (XACK, XPENDING, XAUTOCLAIM) → 5/10

---

## 6/10 — 6. PUB/SUB vs STREAMS
**Same Redis. Different mindsets.**

Both Pub/Sub and Streams are useful, but they solve **different problems**. Let's compare them side by side.

💬 *Right tool for the right use case! Understand the difference, don't just memorize it.*

### REDIS PUB/SUB — Fire and forget. Real-time broadcast.
```
Publisher ── PUBLISH (channel, message) ──► Redis (Pub/Sub) ──► Subscriber 1
                                                            ──► Subscriber 2
                                                            ──► Subscriber 3
```
*Message is pushed to all active subscribers immediately. If a subscriber is not connected, the message is **lost**.*

### REDIS STREAMS — Persistent log. Reliable processing.
```
Producer ── XADD (stream, data) ──► Redis (Streams) ──► Consumer Group: Consumer 1
                                                                        Consumer 2
                                                                        Consumer 3
```
*Message is stored in a **persistent log**. Consumers can read at their own pace, with **acknowledgments, retries** and history.*

### Comparison
| Feature | Pub/Sub | Streams |
|---|---|---|
| Message persistence | ❌ No (fire and forget) | ✅ Yes (stored in memory, can be persisted) |
| Message history | ❌ No (once sent, it's gone) | ✅ Yes (can read old messages) |
| Delivery model | Broadcast to all active subscribers | Distributed (via consumer groups) |
| Acknowledgment (ACK) | ❌ No | ✅ Yes (XACK) |
| Retry on failure | ❌ No (message lost) | ✅ Yes (pending entries, XCLAIM) |
| Multiple consumers | ✅ Yes (all receive same message) | ✅ Yes (competing or parallel via groups) |
| Ordering guarantee | Best effort (per connection) | Ordered by ID (per stream) |
| Use case | Real-time notifications, chat, live updates | Reliable event processing, background jobs, activity feeds |
| Memory usage | Low (no storage) | Higher (stores messages, can trim) |
| Data structure | Channels (in-memory) | Streams (append-only log) |

### 7. WHEN TO USE PUB/SUB?
✅ Real-time notifications (e.g. live chat, typing indicators)
✅ Live updates (e.g. stock prices)
✅ Presence / online-offline status
✅ Fan-out to multiple services
✅ When occasional message loss is acceptable
✅ Simple and low-latency communication

⭐ Use Pub/Sub when you only care about real-time delivery, not durability.

### 8. WHEN TO USE STREAMS?
✅ When you need message persistence
✅ Background job processing
✅ Reliable event processing
✅ Activity feeds, audit logs
✅ Handling spikes with multiple workers
✅ When you need retry and failure recovery
✅ Building scalable systems with consumer groups

⭐ Use Streams when you can't afford to lose messages and need reliable, scalable processing.

### 9. REAL-WORLD ANALOGY
📢 **Pub/Sub = Live Announcement**
- Like a stadium announcement.
- Everyone hears it if they are there at that moment.
- If you weren't there, you missed it.

📦 **Streams = Mailbox / To-Do List**
- Like a mailbox where messages are stored until you read them.
- You can pick them up later.
- You can acknowledge, retry, and ensure nothing is lost.

🚀 Different tools. Different strengths. Build better systems.

> "Real-time is great. Reliability is greater."

**Next up:** 7. Message Delivery Semantics & Ordering → 6/10

---

## 7/10 — 7. REAL-WORLD ARCHITECTURES
**From chat to event processing.**

Let's see how Redis Pub/Sub and Streams are used in real systems, and how to design them for **scale**, **reliability** and **production**.

💬 *Same Redis. Different architectures. Real impact.*

### 1. LIVE CHAT (PUB/SUB)
Real-time, low-latency message delivery.
```
Web App (user 1)    ── PUBLISH chat:room1 "Hello!" ──►            ──► User 1
Mobile App (user 2) ─────────────────────────────────► Redis      ──► User 2   Subscribed clients
Web App (user 3)    ── PUBLISH chat:room1 "Hello!" ──► (Pub/Sub)  ──► User 3   (room1)
```
✅ Great for live chat, typing indicators, presence updates.
✅ If a user is offline, the message is **lost** (use Streams if you need history).

### 2. NOTIFICATIONS (PUB/SUB)
Broadcast real-time events to multiple services.
```
Event Producers                                              Interested Services
- Order Service                                              - Email Service
- Payment Service  ── PUBLISH notifications ──► Redis ──►    - SMS Service
- User Service        "order.created"          (Pub/Sub)     - Push Service
- Inventory Service                                          - Analytics
```
⭐ Use Pub/Sub for real-time fan-out where durability is not critical (e.g. UI notifications, cache invalidation, live dashboards).

### 3. BACKGROUND JOB PROCESSING (STREAMS)
Reliable, scalable, and retryable processing.
```
Producers (e.g. Web App, Services)                         Consumer Group (workers)
- New Signup                                               - Worker 1
- Image Processing  ── XADD jobs {...} ──► Redis ──►       - Worker 2
- Report Generation                       (Streams)        - Worker 3
- ...
```
✅ Messages are persisted and processed by worker consumers.
✅ If a worker fails, another worker can **claim** the message (XCLAIM).

### 4. ACTIVITY FEED (STREAMS)
Store user activities and allow replay.
```
User Actions                                                    Consumers
- Post created                                                  - Feed Service
- Comment added  ── XADD activity (userId, type, ...) ──► Redis ─► - Recommendation Service
- User followed                                     (Streams)   - Analytics
- Like on post                                                  - Notification Service
- ...
```
⭐ Streams keep history, so you can replay and build derived data (e.g. generate feeds, run analytics, reprocess).

### 5. MICROSERVICES EVENT PIPELINE (STREAMS)
Reliable event-driven communication between services.
```
Services                                                         Consumers (Consumer Group)
- Order Service                                                  - Inventory Service
- Payment Service  ── XADD domain-events (eventType, data) ──► Redis ──► - Notification Service
- Warehouse Service                                      (Streams)       - Audit Service
- ...                                                                    - Search Indexer
```
✅ Use Streams for cross-service events where durability and retries matter.
✅ Each service processes events independently at its own pace.

### 6. HYBRID ARCHITECTURE (PUB/SUB + STREAMS)
Use both together for the best of both worlds.
```
Event Source (e.g. Order Created) ──► Publish to both ──► Redis (Pub/Sub) ──► Real-time UI updates (to active users)
                                                     └──► Redis (Streams) ──► Reliable background processing (workers, analytics)
```
⭐ Common pattern: Use Pub/Sub for real-time user experience and Streams for durable processing.

### 7. SCALING CONSIDERATIONS
✅ Use Redis Cluster for horizontal scaling
✅ Keep message size small
✅ Use multiple consumer groups to scale workers
✅ Monitor pending entries (XPENDING)
✅ Set retention policies (XTRIM) for Streams
✅ Use connection pooling
✅ Handle backpressure (slow consumers)

### 8. PRODUCTION TIPS
✅ Set appropriate stream retention (time/size)
✅ Monitor consumer lag (XPENDING)
✅ Use XAUTOCLAIM for failed consumers
✅ Make processing idempotent
✅ Use dead-letter stream for poison messages
✅ Set alerts for high pending messages
✅ Test failure scenarios (kill workers, network issues)

> "Design for failures, not just happy paths. Redis gives you the tools, use them wisely."

🚀 Real systems. Real users. Redis makes it happen.

> "From live updates to durable pipelines — Redis fits, if you design it right."

**Next up:** 8. Reliability & Failure Scenarios (What can go wrong?) → 7/10

---

## 8/10 — 8. FAILURE SCENARIOS & RETRY
**Things go wrong. Here's how Redis handles it.**

In real systems, network issues, consumer failures, and spikes happen. Let's see what happens in **Pub/Sub** and **Streams**, and how to handle failures and **retries**.

💬 *Plan for failures. That's how you build reilable [sic] systems!*

### 1. PUB/SUB – SUBSCRIBER DISCONNECTS
In Pub/Sub, if a subscriber is not connected, the message is lost.
```
Publisher ── PUBLISH "order.created" ──► Redis (Pub/Sub) ──✗ Subscriber 1 (disconnected)
                                                         ──► Subscriber 2 (connected)
```
❌ No message buffering  ❌ No history
❌ No retry              ❌ Message is lost forever

⭐ Use Pub/Sub only for real-time, non-critical updates where occasional loss is acceptable.

### 2. STREAMS – CONSUMER CRASHES
In Streams, if a consumer doesn't acknowledge, the message stays in the Pending Entries List (PEL).
```
Producer ── XADD orders {...} ──► Redis (Streams) ──► Consumer Group (order-workers)
                                                       - Worker 1 (crashed) ✗
                                                       - Worker 2 (healthy)
```
**Pending Entries List (PEL)**
- Message ID: 1725350000000-0
- Consumer: worker-1
- Status: pending

*The message is **not lost**! It stays in the PEL until it's acknowledged or **claimed by another** consumer.*

### 3. CHECKING PENDING MESSAGES – XPENDING
Use XPENDING to see unacknowledged messages in a consumer group.
```
# Check pending summary
127.0.0.1:6379> XPENDING orders order-group
1) (integer) 3              # total pending
2) "1725350000000-0"        # smallest ID
3) "1725350001000-0"        # largest ID
4) 1) "worker-1"            # per consumer
   2) (integer) 3
```
*Shows total pending, ID range and how many messages each consumer has not acknowledged.*

### 4. CLAIMING PENDING MESSAGES – XCLAIM
If a consumer fails, another consumer can claim its messages.
```
# Claim pending messages from a failed consumer
127.0.0.1:6379> XCLAIM orders order-group \
  worker-2 60000 1725350000000-0
1) 1) "1725350000000-0"
   2) 1) "user"   "1"
      2) "action" "signup"
```
*Claims messages idle for > 60 seconds from worker-1 and assigns them to worker-2.*

⭐ Redis 6.2+ provides XAUTOCLAIM to automatically claim and iterate over pending messages.

### 5. AUTO-CLAIM (SIMPLER RETRY) – XAUTOCLAIM
Use XAUTOCLAIM to efficiently claim and process pending messages.
```
# Auto-claim messages (Redis 6.2+)
127.0.0.1:6379> XAUTOCLAIM orders order-group \
  worker-2 60000 0 COUNT 10
1) "1725350001000-0"           # next start ID
2) 1) 1) "1725350000000-0"
      2) 1) "user"   "1"
         2) "action" "signup"
   2) 1) "1725350000100-0"
      2) 1) "user"   "2"
         2) "action" "purchase"
3) (empty array)
```
*Automatically claims idle messages and returns them. Keeps iterating from the last ID.*

⭐ Use XAUTOCLAIM in production to simplify retry logic.

### 6. RETRY PATTERN IN WORKER
Typical worker flow with retry and idempotency.
```
XREADGROUP (read new messages)
        ↓
Process message (business logic)
        ↓
    Success? ── Yes ──► XACK (acknowledge)
        │
        No
        ↓
Leave unacked (in PEL) ──► Retry later (via XAUTOCLAIM)
```
**Tips:**
✅ Make processing idempotent
✅ Use retries with backoff
✅ Monitor PEL size (XPENDING)
✅ Set alerts for high pending
✅ Use dead-letter stream for poison messages

### 7. DEAD LETTER STREAM (DLQ)
For messages that keep failing, move them to a DLQ.
```
# After N failed attempts, move to DLQ
127.0.0.1:6379> XADD orders-dlq * \
  original_id 1725350000000-0 \
  error "Invalid data" \
  payload "{...}"
```
*Keeps your main stream clean and lets you inspect and handle failed messages separately.*

### 8. KEY TAKEAWAYS
✅ Pub/Sub has no retry – messages are lost if subscriber is down
✅ Streams keep unacknowledged messages in the PEL
✅ Use XPENDING to monitor stuck messages
✅ Use XCLAIM or XAUTOCLAIM to retry failed messages
✅ Make consumers idempotent
✅ Use a dead-letter stream for poison messages
✅ Monitor, alert, and set retention policies

⭐ Failure handling is not an afterthought – it's a core part of the design.

🚀 Handle failures. Retry smart. Build reliable systems.

> "It's not about if things fail, it's about how well you recover."

**Next up:** 9. Performance, Scaling & Best Practices → 8/10

---

## 9/10 — 9. PRODUCTION BEST PRACTICES
**Build reliable, scalable, and efficient systems.**

Redis is simple to use, but production systems need careful design. Here are practical best practices for using **Pub/Sub** and **Streams** at scale.

💬 *Good design is not about using features. It's about using them wisely.*

### 1. CHOOSE THE RIGHT TOOL
Use Pub/Sub or Streams based on your requirements.

**Use Pub/Sub when:**
✅ Real-time, low-latency updates
✅ No need to store history
✅ Live notifications (chat, presence)
✅ Fan-out to many subscribers
✅ Occasional message loss is OK

📢 *"Fire and forget."*

**Use Streams when:**
✅ You need message persistence
✅ Reliable processing with retries
✅ Background jobs, event pipelines
✅ Multiple consumers (worker groups)
✅ Audit logs, activity feeds
✅ You can't afford to lose messages

🗄️ *"Store, process, and never lose events."*

### 2. DESIGN STREAM KEY STRATEGY
Use clear and consistent key naming.
```
# Good key patterns
orders                    # for single stream
orders:events             # domain based
orders:{region}:events    # with hash tag (for clustering)
user-activity             # another stream
notifications             # another stream
```
*Use **hash tags** (e.g. {region}) if you are using **Redis Cluster** so that related keys go to the same shard.*

❌ Avoid too many small streams (management overhead).
❌ Avoid unbounded growth (set retention/trim policy).

### 3. SET RETENTION POLICY
Prevent unbounded memory usage.
```
# Keep only last 100,000 messages
XTRIM orders MAXLEN 100000

# Approximate trimming (faster)
XTRIM orders MAXLEN ~ 100000

# Or trim by time (keep last 7 days)
XTRIM orders MINID ~ 1693440000000
```
Use appropriate retention based on:
✅ Your use case
✅ Available memory
✅ Compliance needs
✅ Reprocessing window

### 4. MONITOR STREAMS & CONSUMERS
Keep an eye on stream health.
```
# Stream length
XLEN orders

# Pending messages summary
XPENDING orders orders-group

# Detailed pending messages
XPENDING orders orders-group - + 10

# Consumer group info
XINFO GROUPS orders

# Stream info
XINFO STREAM orders
```
**Monitor for:**
✅ Growing PEL (consumers slow)
✅ Stuck messages (no ACK)
✅ Consumer lag
✅ Stream length (memory)
✅ Failed consumers
✅ Unusual retry counts

📊 Set up alerts before it becomes a problem.

### 5. HANDLE IDEMPOTENCY
Messages can be processed more than once.

Your consumer should be idempotent, because:
✅ Retries can cause duplicates
✅ XAUTOCLAIM can reassign unprocessed messages
✅ Network issues can lead to reprocessing

💡 *Use a unique business key (e.g. orderId) and ensure your processing logic is idempotent.*

⭐ Idempotency turns "at-least-once" delivery into a non-issue.

### 6. SCALING CONSIDERATIONS
Scale based on your workload.

**Vertical scaling:**
✅ Start with a powerful Redis instance
✅ Use enough memory for your data
✅ Monitor CPU and memory usage

**Horizontal scaling (Redis Cluster):**
✅ Use clustering for higher throughput
✅ Use hash tags for related keys
✅ Keep stream keys balanced across shards

**For high throughput:**
✅ Use multiple consumer groups
✅ Increase number of consumers
✅ Batch process messages
✅ Keep message size small
✅ Use pipelining
✅ Avoid heavy processing in Redis (do it in workers)

⚙️ Redis is fast, but don't block it. Keep heavy work in your application.

### 7. SECURITY & ACCESS CONTROL
Protect your Redis instance.
```
# Require authentication
AUTH <password>

# Use ACL (Redis 6+)
ACL SETUSER app on >password \
  +xadd +xread +xack ~orders:*

# Use TLS for network encryption
rediss://...
```
✅ Enable authentication
✅ Use ACLs with least privilege
✅ Use TLS in production
✅ Restrict network access (VPC, firewall rules)
✅ Monitor access logs
✅ Separate environments (dev/staging/prod)

### 8. COMMON PITFALLS TO AVOID
❌ Using Pub/Sub for critical events (messages can be lost)
❌ Not setting retention (streams grow indefinitely)
❌ Not handling retries and failures
❌ Ignoring pending messages
❌ Using a single consumer for high-throughput workloads
❌ Storing large messages (keep them small, e.g. < 10KB)
❌ Doing heavy processing in Redis (keep it fast)
❌ Not monitoring stream health
❌ Forgetting idempotency (duplicate processing)
❌ No alerts for consumer failures or high PEL

💀 *It works in development… but will it work at scale?*

🚀 Plan. Monitor. Scale. Stay reliable.

> "A reliable system is not built by chance, but by good practices."

**Next up:** 10. Interview Q&A & Summary → 9/10

---

## 10/10 — 10. SUMMARY & NEXT STEPS
**Key takeaways, comparison, and where to go next.**

We covered Redis basics, Pub/Sub, Streams, use cases, failure handling, and best practices. Let's **summarize everything** and see what's next!

💬 *You now have the complete picture. Time to build something awesome! 🚀*

### 1. THE BIG PICTURE
Redis gives you multiple building blocks for different needs.
| Building block | Purpose |
|---|---|
| Pub/Sub | Real-time, fire and forget (broadcast) |
| Streams | Persistent, reliable (event log) |
| Data Structures | Strings, Hashes, Lists, Sets, Sorted Sets, etc. |
| Other Features | Caching, Rate limiting, Distributed locks, etc. |

### 2. PUB/SUB vs STREAMS – QUICK RECAP
| Feature | Pub/Sub | Streams |
|---|---|---|
| Message delivery | Broadcast (all active subscribers) | Persistent (stored in log) |
| Message history | No | Yes |
| Acknowledgment | No | Yes (XACK) |
| Retry on failure | No (message lost) | Yes (XPENDING + XCLAIM) |
| Multiple consumers | Yes (same message to all) | Yes (competing/parallel) |
| Ordering guarantee | Best effort | Ordered by ID (per stream) |
| Use case | Real-time notifications, chat, live updates | Reliable processing, background jobs, audits |

### 3. WHEN TO USE WHAT?
**Use Pub/Sub when:**
✅ Real-time, low-latency delivery
✅ No need to store history
✅ Live notifications (chat, presence)
✅ Fan-out to many subscribers
✅ Simple and lightweight

📢 *"Fire and forget."*

**Use Streams when:**
✅ You need message persistence
✅ Reliable processing with retries
✅ Background jobs, event pipelines
✅ Multiple consumers (worker groups)
✅ Audit logs, activity feeds

🗄️ *"Store, process, and never lose events."*

### 4. REAL-WORLD ARCHITECTURE
```
Producers                                        Consumers
- Web App      ──►  Redis Pub/Sub   ──►          - Notification Service
- Mobile App                                     - Worker Service
- Services     ──►  Redis Streams   ──►          - Analytics Pipeline
- IoT Devices                                    - Audit / Monitoring
```
⭐ Many real systems use both: Pub/Sub for real-time user experience and Streams for reliable, durable processing.

### 5. CODE EXAMPLES – SIDE BY SIDE
**Pub/Sub (Publish)**
```python
# Publish a message
redis.publish(
    "chat:room1",
    "Hello, Redis!"
)
```
**Streams (Add message)**
```python
# Add a message to a stream
redis.xadd("orders", {
    "orderId": "123",
    "item": "laptop"
})
```
**Pub/Sub (Subscribe)**
```python
# Subscribe to a channel
for message in redis.pubsub().listen():
    print(message)
```
**Streams (Read with consumer group)**
```python
# Read messages
redis.xreadgroup(
    groupname="workers",
    consumername="worker-1",
    streams={"orders": ">"},
) count=10   # [sic – như trong ảnh]
```

### 6. KEY TAKEAWAYS
✅ Redis is fast, simple, and powerful
✅ Pub/Sub = real-time, no persistence
✅ Streams = persistent, reliable, and scalable
✅ Use consumer groups for parallel processing
✅ Handle failures with XPENDING, XCLAIM, XAUTOCLAIM
✅ Set appropriate retention policies (XTRIM)
✅ Design for idempotency
✅ Monitor stream health and consumer lag
✅ Use the right tool for the right use case
✅ Follow security best practices

💡 *Right tool. Right mindset. Bigger impact.*

### 7. WHAT'S NEXT?
You've completed the Redis series! Here are some ideas to continue:
✅ Build a real-time chat app (Pub/Sub)
✅ Build a background job processor (Streams)
✅ Explore Redis for caching and rate limiting
✅ Try Redis Cluster and high availability
✅ Integrate Redis in your own projects

*Don't just learn it. Build it. That's how it sticks!* 🚀

### 8. FINAL THOUGHTS
Redis is just one piece of the puzzle, but it's a powerful one. Understanding its strengths and limitations helps you design better, more resilient, and scalable systems.

⭐ Same Redis. Many possibilities. Use it wisely.

💬 *Keep building. You got this!*

🏔️ Small concepts. Big systems. Keep learning.

> "Tools don't make great systems. People do – with the right knowledge."

**Redis Series Complete! ✅** What should we cover next? Comment your suggestions!

Follow @p4prateek.tech for more system design visuals!

---

## BONUS — EXTRA CONCEPTS & RESOURCES
**Useful features, tools, and next steps.**

A few additional Redis features, tools, and learning resources to take your understanding to the **next level**.

💬 *Keep exploring! Redis is deep, and there's always more to learn!*

### 1. COMMON DATA STRUCTURES RECAP
Redis supports rich data structures out of the box.
| Type | Example | Use case |
|---|---|---|
| String | `SET key "value"` | Cache, counters, tokens |
| Hash | `HSET user:1 name "John"` | User profiles, objects |
| List | `LPUSH tasks "job1"` | Queues, activity feeds |
| Set | `SADD users "u1"` | Unique items, tags |
| Sorted Set | `ZADD leaderboard 100 "u1"` | Leaderboards, ranking |
| Stream | `XADD orders * item "laptop"` | Event logs, pipelines |
| Bitmap | `SETBIT active:users 100 1` | Feature flags, analytics |
| HyperLogLog | `PFADD page:views "u1"` | Unique count (approx) |
| Geo | `GEOADD stores 12.97 77.59 "BLR"` | Location-based queries |

### 2. CACHING PATTERNS
Common patterns to use Redis as a cache.

**Cache-Aside (Lazy Loading)**
1. Check Redis
2. If not found, fetch from DB
3. Store in Redis with TTL

→ *Most common*

**Write-Through**
1. Write to DB
2. Update Redis at the same time

→ *Consistent, but higher latency*

**Write-Back (Lazy Write)**
1. Write to Redis
2. Persist to DB asynchronously

→ *Fast, but risk of data loss*

**Refresh-Ahead**
1. Refresh cache before it expires
2. Use a background job

→ *Avoids cache miss latency*

❗ Always set an appropriate TTL to avoid stale data. Use cache invalidation strategies for updates (e.g. delete on write).

### 3. RATE LIMITING WITH REDIS
Control how many requests a user can make.

**Fixed Window (simple)**
```
INCR user:123
EXPIRE user:123 60
```
- Allow N requests per window
- Simple but can have bursts at the boundary

**Sliding Window (more accurate)**
```
ZADD req:123 <timestamp> <id>
ZREMRANGEBYSCORE req:123
  0 <now - window>
ZCARD req:123
```
- Tracks individual requests
- More accurate, but higher cost

**Token Bucket (flexible)**
- Allow bursts up to bucket size
- Refill tokens over time
- Good for APIs with variable traffic

### 4. DISTRIBUTED LOCKING
Prevent multiple workers from doing the same work.
```python
# Acquire lock (with TTL)
SET lock:order:123 "token" NX EX 30

# Release lock (only if token matches)
if redis.get("lock:order:123") == "token":
    redis.delete("lock:order:123")
```
**Use cases:**
✅ Prevent duplicate processing
✅ Ensure single worker executes a task
✅ Useful in distributed systems

❗ Always set a TTL to avoid deadlocks. Use a unique token and verify it before releasing the lock.

### 5. LEADERBOARD EXAMPLE (SORTED SET)
Build a real-time leaderboard.
```
# Add or update score
ZADD game:leaderboard 250 "alice"
ZADD game:leaderboard 180 "bob"
ZADD game:leaderboard 300 "charlie"

# Get top 3 users
ZREVRANGE game:leaderboard 0 2 WITHSCORES
```
🏆 *Sorted Sets are perfect for leaderboards, ranking and real-time scores.*

### 6. GEO QUERIES EXAMPLE
Find nearby locations (e.g. stores, drivers).
```
# Add locations
GEOADD stores 12.97 77.59 "BLR"
GEOADD stores 13.08 80.27 "Chennai"
GEOADD stores 19.07 72.87 "Mumbai"

# Find stores within 100 km
GEORADIUS stores 12.97 77.59 100 km
WITHDIST
```
📍 *Use Geo for location-based features like nearby stores, ride sharing, food delivery, etc.*

### 7. USEFUL TOOLS
Tools to work with Redis.
| Tool | Purpose |
|---|---|
| redis-cli | Command line interface (built-in) |
| Redis Insight | GUI for browsing and monitoring |
| redis-benchmark | Benchmark performance |
| Redis Desktop Manager | Alternative GUI tool |
| Monitoring (Prometheus) | Metrics and alerting |

**Helpful command:** `redis-cli monitor` — See real-time commands being executed.

### 8. NEXT STEPS
Keep learning and building!
✅ Try Redis Cluster and high availability
✅ Explore Redis modules (Bloom filter, JSON, Search)
✅ Build real-world projects (chat app, rate limiter, activity feed)
✅ Learn about persistence and replication in depth
✅ Understand performance tuning
✅ Follow Redis official docs and community
✅ Apply concepts in your own system design

🚩 *Learn → Build → Experiment → Improve → Repeat!*

🚀 Same tool. Bigger possibilities. Keep building.

> "It's not just a database. It's a superpower in your system design toolkit."

**Redis Series Complete!** What should I cover next? Comment your suggestions!

Follow @p4prateek.tech for more system design visuals!