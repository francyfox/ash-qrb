# CI

## Github actions (by ssh on your host)

Use all secrets from env files (apps/packages) and root folder and pass to `Settings/Secrets and variables/Actions`.

```dotenv
CERT_CLOUDFLARE # sert for client/backend
PRIVATE_CLOUDFLARE

PRIVATE_KEY #ssh
SSH_USER
SECRETS # paste here all env secrets
```

Change artifacts target in `.github/workflows/build.yml`

```yaml
      - name: Copy files to VPS
        uses: appleboy/scp-action@master
        with:
          host: ${{ vars.HOST }}
          username: ${{ secrets.SSH_USER }}
          port: 22
          key: ${{ secrets.PRIVATE_KEY }}
          source: "build/*"
          target: "/home/fox/server" # your path
```
## Local

Use `*.build.yml` from `docker/` and copy to root directory.
Change `docker-compose.prod.yml` build - dockerfile on actual names
Fill .env file (need to contain all env, from apps/packages too)

Run `docker-compose -f docker-compose.prod.yml up --build`

## Gitlab CI

TODO



