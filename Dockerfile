FROM node:22-alpine3.20 AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY prisma ./prisma/
RUN npx prisma generate

RUN npm run build

FROM node:22-alpine3.20 AS prod

WORKDIR /app

COPY --from=base /app/package*.json ./
COPY --from=base /app/prisma ./prisma/

RUN npm ci --only=production

COPY prisma ./prisma/
COPY --from=base /app/doc ./doc
COPY --from=base /app/dist ./dist/
COPY --from=base /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x /app/entrypoint.sh

EXPOSE $PORT

CMD ["sh", "/app/entrypoint.sh"]
