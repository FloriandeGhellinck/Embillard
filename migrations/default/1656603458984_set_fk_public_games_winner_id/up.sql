alter table "public"."games"
  add constraint "games_winner_id_fkey"
  foreign key ("winner_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
