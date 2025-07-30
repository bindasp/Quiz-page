FROM node:18 AS builder

WORKDIR /app

COPY Quiz-front/package*.json ./

RUN npm install

COPY ./Quiz-front .

RUN npm run build

FROM nginx:alpine

COPY ./Quiz-front/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
