FROM oven/bun:1.2.17 AS base
WORKDIR /usr/src/app

ADD ./backend /temp/dev
COPY certs /usr/src/app/docker/certs

RUN cd /temp/dev
RUN bun run migrate || { echo "Failure db migrate"; exit 1; } \
    | bun run push

ENV NODE_ENV=production

ENTRYPOINT ["bun","index.js"]
EXPOSE 3000