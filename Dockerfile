FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env ./
CMD ["node", "index.js"]