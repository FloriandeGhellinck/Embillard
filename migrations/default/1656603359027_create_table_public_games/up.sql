CREATE TABLE "public"."games" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "winner_id" uuid NOT NULL, "looser_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "win_type" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
