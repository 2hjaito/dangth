---
layout: Post
title: "Two weeks after launching Davish, and a spine turning to \"bamboo\" at 23"
slug: 2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23
subtitle: "From one late night at work to an SSH-based VPS manager written in Go: vibe-coding, community feedback, and living with ankylosing spondylitis"
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

![The old town of Hoi An](/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp)

<p align="center"><em>The old town of Hoi An</em></p>

## 1. How do you manage your VPS?

Managing my VPS used to be pretty boring. Thanks to some basic Docker and CI/CD knowledge, running the services wasn't too hard. The catch is that my hardware is pretty cheap, so I always had to keep a close eye on disk, CPU and RAM.

I wrote quite a few monitoring scripts and used a Zalo bot to get alerts when something went wrong. But typing that many commands wore out someone like me who isn't a systems specialist...

One evening, working late with my Tech Lead — I own the CI/CD and VPS side, so when something breaks I jump in first and report back — I realized I needed a proper management tool for that VPS (well, actually a bunch of others too!). I was tired of opening a dozen Terminal windows just to look after a few servers. I wanted an app that was easier on the eyes, one where I could click instead of type.

That same night, I asked my best friend Claude to put together the UI/UX for the app, along with a full branding kit, a complete set of vibe-coding rules and a design plan. Also that night, the first commit went up with an app that already had about 5 features for managing multiple VPSes. I named it **Davish** (Davi + SH).

![The Davish brand identity and design, built by Claude that same night](/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/claude-design.webp)

<p align="center"><em>The Davish brand identity and design, built by Claude that same night</em></p>

Put simply, for someone on a tight tech budget like me, installing aaPanel is too much hassle, and it means opening yet another port just to log in... I needed an app that connects straight over SSH, with nothing to install on the VPS. Davish does exactly that, and its interface looks quite a bit like macOS.

---

## 2. My first time with Go — closing my own Java Swing era

I started out as a Java dev, a true Java devotee (those who have followed me long enough know this). Go isn't foreign to me — it often shows up alongside Java in microservices work. But the first time I actually learned Go was also when I wrote this app. That sounds pretty scary, but AI today is strong enough to take that worry away.

Why did I pick **Go + Wails + Svelte** over Electron or Swing, when those are what I'm actually good at?

Simple: I needed an app that is light, smooth and secure. Electron is heavy, and Swing is ready for retirement. Go, on the other hand, has an SSH ecosystem that is widely used and battle-tested, and I trusted it to keep my connections safe. (That trust was put to a pretty harsh test later — more on that at the end.)

---

## 3. Is AI corrupting me — or am I corrupting myself?

Honestly, back in the years before AI, even half of this app would have eaten six months of my coding time. Without AI, Davish would probably still live only on paper and in my head.

But once the code was done, I started doubting myself more.

The idea is mine. I approved the architecture. But most of the lines were vibe-coded. My role slowly shifted from writer to reviewer. And the most uncomfortable question was: how well can someone who just started learning Go actually review Go code?

I can read the logic, follow the flow, and catch the obvious bugs. But for the sensitive parts — handling SSH keys, connections, storing login credentials — I have to admit I am trusting more than I understand. In the past, to build something like this, I would have had to dig down to the roots. Now AI hands me the answer before I even get to ask the question.

AI doesn't make me worse, but it makes me lazy about digging deep. And that is the scary part: productivity shoots up, while depth quietly thins out without me even noticing.

> [!TIP]
> **My takeaway:** AI is a great lever for shipping, but for anything that touches security, you still have to understand it yourself. You can't just "mostly review".

---

## 4. Two weeks of business travel and recovering in bed

Davish was released on 30/10, and the very next day (31/10) I had a business trip to Da Nang. So for almost the whole trip, I left the app on its own.

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/checkin.webp"
  width="50%"
  alt="Business trip check-in"
/>

<p align="center"><em>Business trip check-in</em></p>

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/da-nang.webp"
  width="50%"
  alt="Da Nang"
/>

<p align="center"><em>Da Nang</em></p>

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/hoi-an.webp"
  width="50%"
  alt="Hoi An"
/>

<p align="center"><em>Hoi An</em></p>

Even so, Davish got off to a pretty good start on its own. Right after landing, I was surprised to read a few posts and some very warm feedback about it:

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/greeklite.webp"
  width="50%"
  alt="Geek Lite (@QingQ77) introducing Davish on X, with over 3,400 views"
/>

<p align="center"><em>Geek Lite (@QingQ77) introducing Davish on X, with over 3,400 views</em></p>

The Chinese community seemed quite excited, so a Chinese version was released right after.

A day later, a Reddit user shared some positive words and asked for a Spanish version. Same as before, I built it and shipped it.

Next came specific bug reports, mostly on Windows and Linux — two operating systems I hadn't been able to test thoroughly at the time.

Then came the "best" part: the fix → feat → fix loop kept spinning, and my most stubborn illness struck — **ankylosing spondylitis**.

This disease makes the vertebrae gradually fuse together, like a bamboo stalk with many nodes. It has been with me since around late 2024, but I only got tested and found out it existed in early 2026. Bruhhhhh. The doctor told me not to sit for long periods — and it picked exactly the time I was sitting the most to flare up, haha.

I have a follow-up appointment on the 19th, but for some reason this flare-up is much worse, and it has seriously affected how I move: walking is hard, and I can only sit or move slowly...

But it's fine. The test results show the disease is genetic, spontaneous and chronic — meaning it just shows up on its own and can't be fully cured. I'm just grateful it's not too severe; with steady exercise it can still be kept under control.

<img
  src="/images/post/2026-11-17-2-tuan-ra-mat-davish-va-cot-song-bi-tre-hoa-o-tuoi-23/xn.webp"
  width="50%"
  alt="Test result: positive for the HLA-B27 gene, a common marker of ankylosing spondylitis"
/>

<p align="center"><em>Test result: positive for the HLA-B27 gene, a common marker of ankylosing spondylitis</em></p>

> [!WARNING]
> **A wake-up call for fellow Gen Z folks my age:** this disease mostly starts before 40. Keep moving regularly, and don't code through the night like I do.

---

## 5. When Linux admins say "100% No"

Davish reached quite a few users, but most of them are self-hosters, not sysadmins — the crowd for whom Terminal and Ansible are true love, where the big guys type shell faster than a panicking vibe-coder whose system is under attack.

That community is pretty demanding, and they won't hand their SSH keys to some "outsider" app that depends on lots of libraries, like Davish.

I once asked them directly:

> "I built an agentless GUI for managing Linux servers over SSH. Would you trust something like this on production boxes?"

— and a lot of them answered short and sweet, roughly: **"100% No"** =)))

It hurts, but they're right. And it hits exactly what I confessed in part 3: if I myself am still trusting more than I understand on the security side, how can I ask anyone else to trust it? Trust in Go isn't enough — users need to see clearly where keys are stored, whether anything leaves their machine, and what the app depends on.

So let me make it clear right here: Davish runs entirely on your machine and connects straight over SSH, with nothing installed on the server. Passwords and passphrases are stored only in the operating system's keychain. The sudo password is never saved: the app asks for it once per session, keeps it in memory and forgets it after 15 minutes of inactivity. For `~/.ssh/config` and Ansible inventory, Davish only reads, never writes. Updates have their signature checked before they are installed. See [SECURITY.md](https://github.com/2hjaito/davish/blob/main/SECURITY.md) for details.

I've come to see that Davish isn't a fit for critical prod boxes yet — it suits homelabs and personal projects better. But who knows: if the community around Davish grows big enough and the source code gets scrutinized enough, one day it may earn its place on prod.

---

## Wrapping up

It's been a while since I last blogged, and I have to say these 2 weeks felt long. Now I'm doing exercises to make my back a little less "bamboo", while waiting for my upcoming military service health check. In the meantime, Davish will keep getting updates — fixing Windows/Linux bugs and clarifying the security side are my two top priorities.

Davish after ~2 weeks:

| Metric | Number |
| --- | --- |
| Stars / Forks | 120 / 20 |
| Installer downloads | 542 (macOS 227, Windows 221, Linux 94) |
| Releases | 41 (from v0.3 to 1.14.2) |
| Commits / merged PRs | 554 / 161 |

If you've read this far and haven't starred Davish yet, please support me with a star and give it a try: [https://github.com/2hjaito/davish](https://github.com/2hjaito/davish)
