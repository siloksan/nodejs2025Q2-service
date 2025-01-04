FROM node:22.9-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install --force
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start:dev" ]
