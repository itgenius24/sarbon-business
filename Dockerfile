FROM node:18-alpine
RUN mkdir app
WORKDIR app


COPY package*.json ./
RUN npm install

COPY . ./

RUN chmod +x scripts/*.sh
ENV NODE_OPTIONS=--max_old_space_size=8192
RUN npm run build


ENV NODE_ENV=production
# ENV HOST=0.0.0.0
# EXPOSE 80
ENTRYPOINT ["npm", "start"]
