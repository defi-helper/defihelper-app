FROM node:16-alpine AS build

WORKDIR /app

ARG REACT_APP_PORTIS_ID
ARG REACT_APP_SENTRY
ARG REACT_APP_FORTMATIC_KEY
ARG REACT_APP_TELEGRAM_BOT_USERNAME
ARG REACT_APP_AMCHARTS_LICENCE
ARG REACT_APP_AMPLITUDE
ARG REACT_APP_UNISENDER_API

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}
ARG REACT_APP_ENV
ENV REACT_APP_ENV ${REACT_APP_ENV:-production}
ARG REACT_APP_MAIN_URL
ENV REACT_APP_MAIN_URL ${REACT_APP_MAIN_URL:-https://defihelper.io/}
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL:-https://backend.defihelper.io/api}
ARG REACT_APP_TREZOR_URL
ENV REACT_APP_TREZOR_URL ${REACT_APP_TREZOR_URL:-https://app.defihelper.io}
ARG REACT_APP_TREZOR_EMAIL
ENV REACT_APP_TREZOR_EMAIL ${REACT_APP_TREZOR_EMAIL:-admin@defihelper.io}
ARG REACT_APP_WAVES_NODE_URL
ENV REACT_APP_WAVES_NODE_URL ${REACT_APP_WAVES_NODE_URL:-https://nodes.wavesnodes.com}
ARG REACT_APP_SID_LIFE_TIME
ENV REACT_APP_SID_LIFE_TIME ${REACT_APP_SID_LIFE_TIME:-31536000}
ARG REACT_APP_ADAPTERS_HOST
ENV REACT_APP_ADAPTERS_HOST ${REACT_APP_ADAPTERS_HOST:-https://adapters.defihelper.io}
ARG REACT_APP_WS_API_URL
ENV REACT_APP_WS_API_URL ${REACT_APP_WS_API_URL:-wss://backend.defihelper.io/api}
ARG REACT_APP_SCANNER_HOST
ENV REACT_APP_SCANNER_HOST ${REACT_APP_SCANNER_HOST:-https://watcher.defihelper.io}

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN apk add git
COPY package*.json ./
RUN npm set-script prepare ""
RUN npm ci --no-audit
COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /app
COPY deployments/dockerfiles/app/default.conf /etc/nginx/conf.d/default.conf
COPY deployments/dockerfiles/app/prerenderer.conf /etc/nginx/prerenderer.conf
COPY deployments/dockerfiles/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .
EXPOSE 8080
