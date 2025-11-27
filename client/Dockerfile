FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24-alpine AS final

WORKDIR /app

COPY --from=builder /app/dist/standalone ./
COPY --from=builder /app/dist/static ./dist/static
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]