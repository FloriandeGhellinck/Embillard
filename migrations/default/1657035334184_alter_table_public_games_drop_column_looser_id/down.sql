alter table "public"."games"
  add constraint "games_looser_id_fkey"
  foreign key (looser_id)
  references "public"."users"
  (id) on update restrict on delete restrict;
alter table "public"."games" alter column "looser_id" drop not null;
alter table "public"."games" add column "looser_id" uuid;
