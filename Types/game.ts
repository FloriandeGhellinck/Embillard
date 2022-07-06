export type TypeOfWin = "🎱" | "🥇" | null;

export type Game = {
  date: string;
  winner: string;
  looser: string;
  winType: TypeOfWin;
};

export type GameList = Game[];
