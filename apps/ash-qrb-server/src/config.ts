import env from "env-var";

export const config = {
	NODE_ENV: env
		.get("NODE_ENV")
		.default("development")
		.asEnum(["production", "test", "development"]),

	PORT: env.get("PORT").default(3000).asPortNumber(),
	API_URL: env
		.get("API_URL")
		.default(`https://${env.get("PUBLIC_DOMAIN").asString()}`)
		.asString(),
	DATABASE_URL: env.get("DATABASE_URL").required().asString(),
	POSTHOG_API_KEY: env
		.get("POSTHOG_API_KEY")
		.default("it's a secret")
		.asString(),
	POSTHOG_HOST: env.get("POSTHOG_HOST").default("localhost").asString(),
	LOCK_STORE: env.get("LOCK_STORE").default("memory").asEnum(["memory"]),
	JWT_SECRET: env.get("JWT_SECRET").required().asString(),
};
