FROM node:23

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN chmod +x ./script.sh

EXPOSE 3000

ENTRYPOINT [ "./script.sh" ]