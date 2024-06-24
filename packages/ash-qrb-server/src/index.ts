import { Elysia } from "elysia";
import type { Context } from "@netlify/functions"

const app = new Elysia().get("/v3/api/", () => ";) Hello Elysia");

console.log(
  `;) Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default async (req: Request, context: Context) => {
  return app.handle(req)
}