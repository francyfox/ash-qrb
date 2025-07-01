FROM oven/bun:1.2.17 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock turbo.json /temp/dev/
ADD .husky /temp/dev/.husky
ADD apps/ash-client /temp/dev/apps/ash-client
ADD packages /temp/dev/packages
RUN rm /temp/dev/apps/ash-client/.env && mv /temp/dev/apps/ash-client/.env.prod /temp/dev/apps/ash-client/.env
# RUN cd /temp/dev && bun install
# RUN cd /temp/dev && bun install && bun run build

# FROM caddy:2.9.1-builder-alpine AS caddy-builder
# RUN xcaddy build \
    --with github.com/caddy-dns/cloudflare

FROM caddy:2.9.1-alpine
# COPY --from=caddy-builder /usr/bin/caddy /usr/bin/caddy

ARG PORT
ARG CADDY_BACKEND_HOST

COPY docker/caddy/Caddyfile /etc/caddy/Caddyfile
# COPY --from=install /temp/dev/apps/ash-client/dist /srv
# COPY --from=install /temp/dev/apps/ash-client/dist /srv
COPY docker/certs /srv/certs
COPY --from=install /temp/dev/apps/ash-client/dist /var/www/html

RUN caddy fmt --overwrite /etc/caddy/Caddyfile