export type TypeOfWin = "🎱" | "🥇" | null;

export type Game = {
  date: string;
  winner: string;
  looser: string;
  typeOfWin: TypeOfWin;
};

export type GameList = Game[];
