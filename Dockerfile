FROM node:18.17.0
RUN apt update && apt install -y yarn

RUN mkdir app
WORKDIR app

COPY . ./
RUN yarn install

RUN yarn build

ENTRYPOINT ["yarn", "start"]
