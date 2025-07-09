FROM caddy:2.9.1-alpine

ARG PORT
ARG CADDY_BACKEND_HOST

COPY frontend /var/www/html
COPY ../docker/caddy/Caddyfile /etc/caddy/Caddyfile
COPY ../docker/certs /srv/certs

RUN caddy fmt --overwrite /etc/caddy/Caddyfile