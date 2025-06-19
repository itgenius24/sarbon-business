FROM node:18-alpine
RUN mkdir app
WORKDIR app

RUN ls -la
COPY package*.json ./
RUN npm install
RUN ls -la

COPY . ./
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build


ENV NODE_ENV=production
# ENV HOST=0.0.0.0
# EXPOSE 80
ENTRYPOINT ["npm", "start"]
