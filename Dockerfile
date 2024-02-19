FROM node:18.17.0

RUN apt-get update && apt-get install -y yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
