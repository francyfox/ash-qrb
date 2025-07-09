FROM oven/bun:1.2.17 AS base
WORKDIR /usr/src/app

ADD ./backend .
COPY ./docker/certs /docker/certs



ENV NODE_ENV=production

ENTRYPOINT ["bun","index.js"]
EXPOSE 3000