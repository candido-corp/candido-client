FROM node:20.15-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g serve
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]