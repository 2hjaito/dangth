---
layout: Post
title: "Davish 发布两周，以及 23 岁就开始“竹节化”的脊椎"
slug: 2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23
subtitle: "从一个加班的夜晚，到一款用 Go 编写、基于 SSH 的 VPS 管理应用：vibe-coding、社区反馈，以及强直性脊柱炎"
author: "Trần Hữu Đang"
date: "2026-11-17"
image: /images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp
tags:
  - Davish
  - Go
  - Wails
  - Svelte
  - SSH
  - VPS
  - AI
  - Open Source
published: true
---

![会安古镇](/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp)

<p align="center"><em>会安古镇</em></p>

## 1. 你是怎么管理 VPS 的？

以前，我管理 VPS 的方式相当枯燥。靠着一点 Docker 和 CI/CD 的基础知识，运维各个服务倒也不算太辛苦，只是我用的机器配置比较寒酸，所以总得紧紧盯着磁盘、CPU 和内存。

我写了不少监控脚本，并用 Zalo 机器人接收故障通知。但要敲的命令实在太多，对我这种并非专业运维的人来说挺累的……

有一天晚上和 Tech Lead 一起加班——我负责 CI/CD 和 VPS 管理，所以一有问题我会先上去处理，再汇报结果——我意识到自己需要一款功能完整的管理软件来管那台 VPS（其实还有好几台！）。我受够了为了管几台服务器就要打开十几个终端窗口。我想要一个让眼睛轻松一点的应用，最好能点一点，而不是一直敲命令。

就在当晚，我请我最好的朋友 Claude 帮我做了这个应用的 UI/UX，外加一整套品牌设计、全部 vibe-coding 规则和设计规划。也就在那天夜里，第一个 commit 推了上去，应用已经完成了大约 5 个管理多台 VPS 的功能。我给它起名叫 **Davish**（Davi + SH）。

![Claude 当晚为 Davish 完成的品牌形象与设计稿](/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/claude-design.webp)

<p align="center"><em>Claude 当晚为 Davish 完成的品牌形象与设计稿</em></p>

简单来说，对我这种“技术穷人”而言，装 aaPanel 太麻烦了，还得额外开一个端口用来登录……我需要的是一个直接通过 SSH 连接、不用在 VPS 上安装任何东西的应用。Davish 做到了这一点，界面还挺像 macOS。

---

## 2. 第一次用 Go——为我自己的 Java Swing 时代画上句号

我是 Java 出身，一个正宗的 Java 信徒（关注我够久的朋友应该都知道）。Go 对我来说并不陌生——在微服务场景里它经常和 Java 一起出现。但我第一次真正学 Go，也正是直接用它写这个应用的时候。听起来挺吓人的，但如今的 AI 已经强大到足以打消这种顾虑。

明明 Electron 和 Swing 才是我的强项，为什么我选择了 **Go + Wails + Svelte**？

很简单：我需要一个轻量、流畅又安全的应用。Electron 太重，Swing 也该退休了。而 Go 拥有广泛使用、久经考验的 SSH 生态，我相信它能保证我的连接安全。（这份信任后来遭到了相当严苛的考验——留到最后再说。）

---

## 3. 是 AI 让我堕落，还是我自己在堕落？

说实话，如果回到没有 AI 的年代，光是这个应用的一半就足以吃掉我 6 个月的编码时间。没有 AI，Davish 大概只会停留在纸上和我的脑子里。

但写完之后，我反而对自己更加怀疑了。

点子是我的，架构是我审定的，但大部分代码却是 vibe-code 出来的。我的角色逐渐从写代码的人变成了 review 的人。而最让人不舒服的问题是：一个刚开始学 Go 的人，到底能把 Go 代码 review 到什么程度？

我能读懂逻辑、理解运行流程、发现明显的错误。但对于处理 SSH 密钥、连接、保存登录信息这些敏感部分，我不得不承认，自己是信任多于理解。以前要做这样的东西，我必须挖到最底层；现在，AI 在我提出问题之前就已经把答案递了过来。

AI 没有让我变差，但它让我懒得深挖。而这才是真正可怕的地方：效率飙升，深度却在不知不觉中悄悄变薄。

> [!TIP]
> **我得到的教训：** AI 是快速交付的绝佳杠杆，但凡是涉及安全的部分，你仍然必须自己弄懂，不能只是“以 review 为主”。

---

## 4. 两周出差，外加卧床养病

Davish 于 10 月 30 日发布，而就在第二天（10 月 31 日），我要去岘港出差。于是几乎整个出差期间，我都把这个应用晾在了一边。

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/checkin.webp"
  width="50%"
  alt="出差打卡"
/>

<p align="center"><em>出差打卡</em></p>

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/da-nang.webp"
  width="50%"
  alt="岘港"
/>

<p align="center"><em>岘港</em></p>

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp"
  width="50%"
  alt="会安"
/>

<p align="center"><em>会安</em></p>

即便如此，Davish 自己还是开了个好头。刚下飞机，我就意外地看到了几篇关于它的文章和非常友好的反馈：

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/greeklite.webp"
  width="50%"
  alt="Geek Lite（@QingQ77）在 X 上介绍 Davish 的帖子，浏览量超过 3,400"
/>

<p align="center"><em>Geek Lite（@QingQ77）在 X 上介绍 Davish 的帖子，浏览量超过 3,400</em></p>

中文社区似乎挺感兴趣的，所以中文版紧接着就发布了。

一天后，一位 Reddit 用户给出了积极的评价，并希望能有西班牙语版本。和上次一样，我马上做好并发布了。

接下来是一些具体的 bug 反馈，大多出现在 Windows 和 Linux 上——这两个系统我当时还没能好好测试。

然后就到了“最精彩”的部分：fix → feat → fix 的循环不停转着，而我最顽固的老毛病发作了——**强直性脊柱炎**。

这种病会让脊椎骨逐渐粘连在一起，就像一根有很多节的竹子。它大约从 2024 年底就跟着我了，但直到 2026 年初我才去做检查，知道了它的存在。Bruhhhhh。医生叮嘱我不要久坐——结果它偏偏挑在我坐得最久的时候发作，哈哈。

19 号我有复诊，但不知为何这次比以往严重得多，严重影响了活动：走路困难，只能坐着或者慢慢挪动……

不过没关系。检查结果显示这种病来自基因，是自发且慢性的——也就是说它会自然出现，而且无法彻底治愈。只能庆幸它不算太严重，坚持锻炼的话还是可以控制的。

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/xn.webp"
  width="50%"
  alt="检测结果：HLA-B27 基因阳性，这是强直性脊柱炎的常见标志"
/>

<p align="center"><em>检测结果：HLA-B27 基因阳性，这是强直性脊柱炎的常见标志</em></p>

> [!WARNING]
> **给同龄 Z 世代朋友们的提醒：** 这种病大多在 40 岁之前发病。请保持经常运动的习惯，别像我一样通宵写代码。

---

## 5. 当 Linux 运维说出“100% No”

Davish 吸引了不少用户，但大多数是自托管玩家，而不是系统管理员——在后者的圈子里，终端和 Ansible 才是真爱，大佬们敲 shell 的速度比一个因系统被攻击而惊慌失措的 vibe-coder 还要快。

那个圈子相当挑剔，他们不接受把 SSH 密钥交给一个“外来”的、依赖大量第三方库的应用，比如 Davish。

我曾直接问过：

> "I built an agentless GUI for managing Linux servers over SSH. Would you trust something like this on production boxes?"

——结果很多人回答得干脆利落，大意就是：**“100% No”** =)))

听着扎心，但他们说得对。这也正好戳中了我在第 3 部分的自白：连我自己在安全相关的部分都还是信任多于理解，又凭什么要求别人信任？光相信 Go 是不够的——用户需要清楚地看到密钥存在哪里、数据会不会离开自己的电脑，以及应用依赖了哪些东西。

所以我在这里说清楚：Davish 完全运行在你的电脑上，直接通过 SSH 连接，不会在服务器上安装任何东西。密码和 passphrase 只保存在操作系统的钥匙串（keychain）中。sudo 密码永远不会被保存：应用每个会话只询问一次，仅保存在内存中，闲置 15 分钟后自动遗忘。对于 `~/.ssh/config` 和 Ansible inventory，Davish 只读不写。更新在安装前会校验签名。详情请见 [SECURITY.md](https://github.com/2hjaito/davish/blob/main/SECURITY.md)。

我意识到 Davish 目前还不适合重要的生产服务器——它更适合 homelab 和个人项目。但谁知道呢，如果围绕 Davish 的社区足够大、源码被审查得足够多，总有一天它会配得上出现在生产环境中。

---

## 结语

好久没写博客了，不得不说这两周真的很漫长。现在我一边做康复训练，让后背少“竹”一点，一边等着即将到来的兵役体检。与此同时，Davish 会继续更新——修复 Windows/Linux 上的 bug 和把安全部分讲清楚，是我优先要做的两件事。

Davish 发布约两周后：

| 指标 | 数据 |
| --- | --- |
| Star / Fork | 120 / 20 |
| 安装包下载量 | 542（macOS 227，Windows 221，Linux 94） |
| 发布版本 | 41（从 v0.3 到 1.14.2） |
| Commit / 已合并 PR | 554 / 161 |

读到这里还没给 Davish 点 star 的朋友，请支持我一颗星，也欢迎试用：[https://github.com/2hjaito/davish](https://github.com/2hjaito/davish)
