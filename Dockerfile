# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy toàn bộ source vào
COPY . .

ENV NODE_ENV=production
RUN npm run build


# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.davipress ./.davipress


ENV NODE_ENV=production
ENV PORT=1210
EXPOSE 1210

CMD ["npm", "run", "start", "--", "-p", "1210"]
