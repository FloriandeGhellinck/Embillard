alter table "public"."games"
  add constraint "games_winner_id_fkey"
  foreign key (winner_id)
  references "public"."users"
  (id) on update restrict on delete restrict;
alter table "public"."games" alter column "winner_id" drop not null;
alter table "public"."games" add column "winner_id" uuid;
