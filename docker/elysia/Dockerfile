FROM oven/bun:1.1.16
WORKDIR /app
COPY package.json bun.lockb ./
COPY packages/ash-qrb-server ./packages/ash-qrb-server

RUN bun install

ENV NODE_ENV=development
ENV PORT 3000
ENV HOSTNAME localhost
EXPOSE 3000
CMD bun --filter './packages/ash-qrb-server' dev