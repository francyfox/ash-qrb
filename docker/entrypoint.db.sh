#!/bin/sh

psql --username="$POSTGRES_USER" "$POSTGRES_DB" -f /etc/dev/0000_init.sql <<-EOSQL
EOSQL