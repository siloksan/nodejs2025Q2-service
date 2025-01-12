FROM node:22-alpine3.20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

COPY prisma ./prisma/

EXPOSE $PORT

CMD ["sh", "/app/entrypoint.sh"]
