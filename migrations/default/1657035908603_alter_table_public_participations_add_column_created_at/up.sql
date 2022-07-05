alter table "public"."participations" add column "created_at" timestamptz
 null default now();
