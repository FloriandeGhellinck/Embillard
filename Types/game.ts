import { StringValueNode } from "graphql";

export type TypeOfWin = "🎱" | "🥇" | null;

export type Game = {
  date: string;
  winner: string;
  looser: string;
  winType: TypeOfWin;
};

export type GameConfirm = "confirmed" | "deleted" | null;

export type GameList = Game[];

export type CookieUser = {
  name: string;
  id: string;
};

export type UserGame = {
  first_name: string;
  last_name: string;
  user_name: string;
  id: string;
  participations: {
    participation_type: "winner" | "looser";
    game: {
      win_type: TypeOfWin;
      participations: any[];
    };
  }[];
};

export type GamerUser = {
  win_type: TypeOfWin;
  date: string;
  participations: {
    participation_type: "winner" | "looser";
    user: {
      first_name: string;
      last_name: string;
      user_name: string;
    };
    game_confirmed: GameConfirm;
  };
  id: string;
};
