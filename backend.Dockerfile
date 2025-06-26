FROM oven/bun:1.2.17 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock turbo.json /temp/dev/
ADD .husky /temp/dev/.husky
ADD apps/ash-qrb-server /temp/dev/apps/ash-qrb-server
RUN rm /temp/dev/apps/ash-qrb-server/.env && mv /temp/dev/apps/ash-qrb-server/.env.prod /temp/dev/apps/ash-qrb-server/.env
RUN cd /temp/dev && bun install

FROM base AS release
COPY --from=install /temp/dev/turbo.json turbo.json
COPY --from=install /temp/dev/bun.lock bun.lock
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=install /temp/dev/package.json package.json
COPY --from=install /temp/dev/apps apps

ENV NODE_ENV=production

CMD bun run dev