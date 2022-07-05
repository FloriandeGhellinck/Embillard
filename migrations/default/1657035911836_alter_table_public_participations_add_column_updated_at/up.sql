alter table "public"."participations" add column "updated_at" timestamptz
 null default now();
