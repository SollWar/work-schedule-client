# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Генерируем статичный сайт
RUN npm run build

# --- Static Stage ---
FROM nginx:alpine AS runner

# Копируем экспортированный сайт в папку Nginx
COPY --from=builder /app/out /usr/share/nginx/html

# Открываем порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
