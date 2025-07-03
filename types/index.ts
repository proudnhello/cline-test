export type Genre = 'Romance' | 'Fantasy' | 'Sci-Fi' | 'Mystery' | 'Thriller';

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
  wordCountMultiplier: number;
  unlockedGenres: Genre[];
  trendingGenre: Genre;
  trendTimer: number;
  warningTime: number;
  isTrendEnding: boolean;
}
