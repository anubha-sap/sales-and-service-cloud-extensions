FROM node:18.16.0-alpine
WORKDIR /.
COPY package*.json ./
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 3000
CMD npm run start:prod