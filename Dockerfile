FROM node:16.18.1 
RUN apt update && apt install -y yarn

RUN mkdir app
WORKDIR app

COPY . ./
RUN yarn install

RUN yarn build


# FROM node:10.16.3-alpine
# RUN mkdir app
# WORKDIR app

# COPY --from=builder /app/ /app/
# ENV NODE_ENV=production
# ENV HOST=0.0.0.0

# EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
