FROM node:24-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_CLIENT_URL
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_CONTACT_PHONE

ENV NEXT_PUBLIC_CLIENT_URL=$NEXT_PUBLIC_CLIENT_URL
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_CONTACT_PHONE=$NEXT_PUBLIC_CONTACT_PHONE

COPY package.json package-lock.json ./

RUN npm ci

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