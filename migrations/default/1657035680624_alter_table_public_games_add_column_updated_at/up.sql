alter table "public"."games" add column "updated_at" timestamptz
 null default now();
