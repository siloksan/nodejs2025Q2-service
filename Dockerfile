FROM node:22-alpine3.20 AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

COPY prisma ./prisma/

FROM node:22-alpine3.20 AS prod

WORKDIR /app

COPY --from=base /app /app

EXPOSE $PORT

CMD ["sh", "/app/entrypoint.sh"]
