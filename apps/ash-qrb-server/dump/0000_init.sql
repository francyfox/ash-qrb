CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qrb_plugin_groups" (
	"qrb_id" text NOT NULL,
	"plugin_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qrb_plugin" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"config" jsonb DEFAULT '{"type":"object","required":["author"],"properties":{"author":{"type":"string","const":"noname"}}}'::jsonb,
	"npm" text,
	"git" text
);
--> statement-breakpoint
CREATE TABLE "qrb" (
	"id" text PRIMARY KEY NOT NULL,
	"status" integer DEFAULT 1,
	"name" varchar(70) NOT NULL,
	"body" jsonb DEFAULT '{"en":null,"ru":null}'::jsonb,
	"qr_code" text,
	"qr_code_terminal" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"public_id" text DEFAULT 'vdW0W7BQ3oZf5QlpqBcL3' NOT NULL,
	"status" integer DEFAULT 0,
	"image" text,
	"name" varchar(70) NOT NULL,
	"company_name" varchar(40) NOT NULL,
	"email" varchar(38),
	"email_verified" boolean DEFAULT false NOT NULL,
	"phone" varchar(12),
	"phone_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qrb_plugin_groups" ADD CONSTRAINT "qrb_plugin_groups_qrb_id_qrb_id_fk" FOREIGN KEY ("qrb_id") REFERENCES "public"."qrb"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qrb_plugin_groups" ADD CONSTRAINT "qrb_plugin_groups_plugin_id_qrb_plugin_id_fk" FOREIGN KEY ("plugin_id") REFERENCES "public"."qrb_plugin"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qrb" ADD CONSTRAINT "qrb_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;