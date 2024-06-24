import { z } from "zod";

const toggle = z
	.enum(["true", "false", "0", "1"])
	.transform((v) => v === "true" || v === "1");

const envVariables = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	RUNTIME: z.enum(["bun", "edge"]).default("bun"),
});

export const env = envVariables.parse(process.env);
