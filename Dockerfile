# build environment
FROM node:17-alpine
WORKDIR /app
COPY . .
COPY package.json ./
RUN npm install -g npm@8.12.1
RUN npm install
EXPOSE 3000
CMD [ "npm","start" ]