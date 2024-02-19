FROM node:18-alpine
RUN mkdir app
WORKDIR app


COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build


ENV NODE_ENV=production
# ENV HOST=0.0.0.0
# EXPOSE 80
ENTRYPOINT ["npm", "start"]
