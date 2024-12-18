FROM node:23

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npx", "prisma", "migrate", "deploy"]