```redis
FT.CREATE upload_idx on HASH PREFIX 1 upload: SCHEMA checksum TAG value TEXT
```