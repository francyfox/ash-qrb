# First run

- Run docker compose (start postgres db)
- Go to server app, run `bun run generate && bun run migrate` for db migration
- Configure .env files (use .env.example)
- Run from root `bun dev` or separately 

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `apps`: apps for front and back
- `packages`: additional packages shared between apps

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- Bun
- Elysia
- Nuxt 3 (comp. with 4 version)

### Build

To build all apps and packages, run the following command:

```
bun run build
```

### Develop

To develop all apps and packages, run the following command:

```
bun run dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today
> at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to
share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't
have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following
commands:

```
bunx turbo login
```

This will authenticate the Turborepo CLI with
your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
bunx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
