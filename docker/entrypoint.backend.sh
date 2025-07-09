#!/bin/sh

cd ./apps/ash-qrb-server || exit
bun run migrate || { echo "Failure db migrate"; exit 1; }
bun run push
bun run preview