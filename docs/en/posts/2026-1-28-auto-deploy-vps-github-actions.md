---
layout: Post
title: "Auto-Deploying to a VPS with GitHub Actions: From Manual Commands to Hands-Free"
slug: auto-deploy-vps-voi-github-actions-tu-go-lenh-tay-den-ranh-tay
subtitle: "A detailed guide to setting up CI/CD that auto-builds Docker and smartly handles Port conflicts"
author: "Trần Hữu Đang"
date: 2026-01-28
image: /images/post/2026-1-28-auto-deploy-vps-github-actions/main.png
tags:
  - DevOps
  - Docker
  - GitHub Actions
  - VPS
published: true
---


![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/main.png)

Hey everyone, anyone who's done web development has probably been through this: you finish coding a new feature, `git push` it, then have to open a Terminal, SSH into the VPS, and type a series of commands: `git pull`, `docker-compose down`, `up`...

But life isn't always that simple — sometimes you forget to `stop` the old container, or some service is "occupying" a Port, causing your next deploy to fail miserably. So annoying! Today I'll show you how to turn this process into something fully automated — smart enough to clean up Port conflicts on its own.

---

## Why do you need this workflow?

* **Saves time:** No more typing commands manually.
* **Avoids mistakes:** CI/CD runs off a script — no "forgetting" or "typos."
* **Smart Port conflict handling:** Automatically detects and "eliminates" containers hogging resources.
* **Production-grade:** Clean environment separation, maximum security.

**How the workflow works**
Before jumping into the configuration, let's take a look at the "flight plan" of this system. Understanding the flow clearly will keep you from getting lost in the later steps:

1. **Local**: You just write code, then `git push` to the `release` branch.
2. **GitHub Actions**: Acts as the "coordinator." It receives the signal and spins up a temporary environment to connect to your VPS via SSH.
3. **VPS (Destination)**: Receives the command from GitHub to run a chain of actions: **Fetch the new code** -> **Clean up Port 1210** -> **Build & bring up the container**.
---

## Step 1: Prepare the environment on the VPS

First, SSH into the VPS and make sure the system is in the best possible state.

```bash
# SSH vào root
ssh root@<IP_VPS_CUA_BAN>

# Cập nhật hệ thống
apt update -y && apt upgrade -y

```

![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/1.png)

---

## Step 2: Create an SSH Key – the "key" for GitHub Actions

For GitHub to be able to run commands on the VPS on your behalf, it needs its own key.

1. **Generate the key pair:**
```bash
ssh-keygen -t ed25519 -C "github-actions-dangth-prod" -f /root/.ssh/github_actions_dangth_prod

```


2. **Grant access:** Add the Public Key to the trusted list.
```bash
cat /root/.ssh/github_actions_dangth_prod.pub >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

```


![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/2.png)


> [!WARNING]
> **Extremely important note:**
> The file /root/.ssh/github_actions_dangth_prod (Private Key) is your server's "lifeline." Never push this file to GitHub or expose it to anyone. We'll only copy its contents to paste into GitHub Secrets in a later step!

---

## Step 3: A proper "premium" Docker Compose file

We'll create the `docker-compose.prod.yml` file. The key difference here is that I've dropped the fixed `image` tag, so Docker always builds the latest version from the source code that was just fetched.

```yaml
services:
  dangth:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: dangth-prod
    environment:
      - NODE_ENV=production
      - PORT=1210
    ports:
      - "1210:1210"
    restart: unless-stopped
    networks:
      - webnet

networks:
  webnet:

```

![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/3.png)
---

## Step 4: Solving the "pain" of Port 1210 conflicts

This is the most important part. Normally, if another container is already running on port 1210, your `up` command will just fail.

Instead of having to SSH in to find the PID and kill it, I'll integrate a "detective" script into GitHub Actions. It will:

1. Scan for any container currently using port 1210.
2. If found, immediately "eliminate" it (stop & rm).
3. Only then proceed to deploy the new version.

---

## Step 5: Setting up the GitHub Actions Workflow

Before pasting the code below into your project, you need to declare the secret "variables" so GitHub has access to the VPS.
Go to your Repository on `GitHub` -> `Settings` -> `Secrets and variables` -> `Actions`.

Click New repository secret and add the following variables:
- `PROD_HOST`: The VPS's IP.
- `PROD_USER`: Usually root.
- `PROD_KEY`: The content of the Private Key file you just created in Step 2.

Once that's done, create the file `.github/workflows/deploy-prod.yml` with the following content:

```yaml
name: Deploy Production - dangth

on:
  push:
    branches:
      - release

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production Server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_KEY }}
          script: |
            set -e
            cd /root/projects/dangth

            echo "👉 Pulling latest code..."
            git fetch origin release
            git reset --hard origin/release

            echo "👉 Checking for containers using port 1210..."
            # Lệnh tìm container ID dựa trên port đang publish
            OLD_CONTAINER_ID=$(docker ps -q --filter "publish=1210")
            if [ -n "$OLD_CONTAINER_ID" ]; then
              echo "⚠️ Found old container $OLD_CONTAINER_ID occupying port 1210. Removing..."
              docker stop $OLD_CONTAINER_ID
              docker rm $OLD_CONTAINER_ID
            fi

            echo "👉 Deploying new version with Docker Compose..."
            docker compose -p dangth-prod -f docker-compose.prod.yml up -d --build

            echo "✅ Deploy Finished Successfully!"
            docker ps

```

![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/4.png)

Now it's time to enjoy the results. Just do the familiar routine: commit the code you've poured your heart into and push it to the release branch. That's the "trigger" that kicks off the entire automated system we just set up.

![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/5.png)

Right away, the Actions tab on GitHub lights up. You can watch the process run step by step: from SSH-ing into the server, checking the Port, all the way to rebuilding the Docker image. Watching the machine do the work for you feels genuinely satisfying!
![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/6.png)


And here's the final result: a hopeful shade of green! Every command ran smoothly, and Port 1210 was handed over to the latest code version without any conflicts.

![HotJava Demo](/images/post/2026-1-28-auto-deploy-vps-github-actions/7.png)
---

## Conclusion

And that's it! From now on, every time you `git push origin release`, the system will run automatically. You no longer need to worry about forgetting to stop the old container or port conflicts. Everything gets automated and cleaned up neatly.

Optimizing your CI/CD not only frees up your hands, it also minimizes downtime for your application.

**Are you running into trouble configuring SSH, or hitting permission errors on your VPS? Leave a comment below or share your deployment experience — I'll be happy to help out! 👇**
