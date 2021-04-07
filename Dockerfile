FROM node:12.13 As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only-development
COPY . .
RUN npm run build

FROM node:12.13 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]

FROM ubuntu:18.04
WORKDIR /home/mongobi
RUN apt-get update
RUN apt-get install -y libssl1.0.0 libssl-dev libgssapi-krb5-2 wget
RUN wget https://info-mongodb-com.s3.amazonaws.com/mongodb-bi/v2/mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1.tgz
RUN tar -xvzf mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1.tgz
WORKDIR /home/mongobi/mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1
RUN mkdir /logs
RUN ls
RUN echo $PATH
RUN install -m755 bin/mongo* /usr/local/bin/
EXPOSE 3307
CMD ["mongosqld", "--config=/home/mongobi/mongosqld.conf"]