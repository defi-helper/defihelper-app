FROM node:16-alpine AS build

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL:-https://backend.defihelper.io/api}
ARG REACT_APP_LAUNCH_APP_URL
ENV REACT_APP_LAUNCH_APP_URL ${REACT_APP_LAUNCH_APP_URL:-https://app.defihelper.io/}
ARG REACT_APP_AMCHARTS_LICENCE

RUN apk --update add git
COPY package*.json ./
RUN npm install -g husky cross-env
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /app
COPY deployments/dockerfiles/app/default.conf /etc/nginx/conf.d/default.conf
COPY deployments/dockerfiles/app/prerenderer.conf /etc/nginx/prerenderer.conf
COPY deployments/dockerfiles/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .
EXPOSE 8080
