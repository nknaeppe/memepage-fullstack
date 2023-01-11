# FROM node:16.17.1-alpine3.16 as build
# WORKDIR /usr/app
# COPY . /usr/app
# RUN npm ci
# RUN npm run build

FROM nginx:alpine-slim
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
# COPY --from=build /usr/app/build /usr/share/nginx/html