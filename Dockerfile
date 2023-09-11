FROM node:14

WORKDIR /api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .


CMD ["node", "index.js"]

EXPOSE 4000