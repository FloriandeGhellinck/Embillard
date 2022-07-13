import { StringValueNode } from "graphql";

export type TypeOfWin = "🎱" | "🥇" | null;

export type Game = {
  date: string;
  winner: string;
  looser: string;
  winType: TypeOfWin;
};

export type GameConfirm = "confirmed" | "deleted";

export type GameList = Game[];

export type CookieUser = {
  name: string;
  id: string;
};
