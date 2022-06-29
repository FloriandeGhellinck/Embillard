export type TypeOfWin = "eight_ball" | "normal_win" | null;

export type Game = {
  date: string;
  winner: string;
  looser: string;
  typeOfWin: TypeOfWin;
};

export type GameList = Game[];
