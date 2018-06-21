FROM node:carbon

WORKDIR /usr/hello-world-api

COPY ./package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 80

CMD ["npm", "start"]