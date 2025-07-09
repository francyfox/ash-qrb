FROM oven/bun:1.2.17 AS base
WORKDIR /usr/src/app

ADD ./backend /temp/dev
COPY ./docker/certs /usr/src/app/docker/certs

RUN cd /temp/dev

ENV NODE_ENV=production

ENTRYPOINT ["bun","index.js"]
EXPOSE 3000