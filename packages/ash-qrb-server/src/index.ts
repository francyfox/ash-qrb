import { Elysia } from "elysia";
import type { Config } from "@netlify/functions"

const app = new Elysia().get("/", () => ";) Hello Elysia");

console.log(
  `;) Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default async (req: Request) => {
  return app.handle(req)
}

export const config: Config = {
  path: ["/"],
};