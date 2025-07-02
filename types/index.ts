export type Genre = 'Romance';

export interface Book {
  id: string;
  genre: Genre;
  wordCount: number;
  wordsWritten: number;
  value: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  apply: (gameState: GameState) => GameState;
}

export interface GameState {
  money: number;
  books: Book[];
  currentBook: Book | null;
  upgrades: Upgrade[];
  wordsPerClick: number;
  wordsPerSecond: number;
  bookValueMultiplier: number;
  trendingGenre: Genre;
}
