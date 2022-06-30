alter table "public"."games"
  add constraint "games_looser_id_fkey"
  foreign key ("looser_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
