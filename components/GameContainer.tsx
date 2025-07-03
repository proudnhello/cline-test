'use client';

import { useState, useEffect } from 'react';
import { GameState, Book, Upgrade, Genre } from '../types';
import StatsPanel from './StatsPanel';
import BookDisplay from './BookDisplay';
import UpgradePanel from './UpgradePanel';

const availableUpgrades: Upgrade[] = [
  {
    id: 'fast-writer-1',
    name: 'Ergonomic Keyboard',
    description: 'Increases writing speed by 1 word per click.',
    cost: 10,
    apply: (gameState) => ({
      ...gameState,
      wordsPerClick: gameState.wordsPerClick + 1,
    }),
  },
  {
    id: 'fast-writer-2',
    name: 'Touch Typing Course',
    description: 'Increases writing speed by 5 words per click.',
    cost: 100,
    apply: (gameState) => ({
      ...gameState,
      wordsPerClick: gameState.wordsPerClick + 5,
    }),
  },
  {
    id: 'fast-writer-3',
    name: 'Mechanical Keyboard',
    description: 'Increases writing speed by 10 words per click.',
    cost: 500,
    apply: (gameState) => ({
      ...gameState,
      wordsPerClick: gameState.wordsPerClick + 10,
    }),
  },
  {
    id: 'hire-blogger',
    name: 'Hire Blogger',
    description: 'A local blogger writes 1 word per second for you.',
    cost: 25,
    apply: (gameState) => ({
      ...gameState,
      wordsPerSecond: gameState.wordsPerSecond + 1,
    }),
  },
  {
    id: 'hire-ghostwriter',
    name: 'Hire Ghostwriter',
    description: 'A professional ghostwriter adds 10 words per second.',
    cost: 250,
    apply: (gameState) => ({
      ...gameState,
      wordsPerSecond: gameState.wordsPerSecond + 10,
    }),
  },
  {
    id: 'hire-writing-team',
    name: 'Hire Writing Team',
    description: 'A team of writers adds 50 words per second.',
    cost: 1500,
    apply: (gameState) => ({
      ...gameState,
      wordsPerSecond: gameState.wordsPerSecond + 50,
    }),
  },
  {
    id: 'better-covers',
    name: 'Better Covers',
    description: 'Increases the value of your books by 10%.',
    cost: 50,
    apply: (gameState) => ({
      ...gameState,
      bookValueMultiplier: gameState.bookValueMultiplier * 1.1,
    }),
  },
  {
    id: 'professional-editing',
    name: 'Professional Editing',
    description: 'Increases the value of your books by 25%.',
    cost: 500,
    apply: (gameState) => ({
      ...gameState,
      bookValueMultiplier: gameState.bookValueMultiplier * 1.25,
    }),
  },
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign',
    description: 'Doubles the value of your books.',
    cost: 2000,
    apply: (gameState) => ({
      ...gameState,
      bookValueMultiplier: gameState.bookValueMultiplier * 2,
    }),
  },
  {
    id: 'unlock-fantasy',
    name: 'Unlock Fantasy',
    description: 'Allows you to write Fantasy novels.',
    cost: 200,
    apply: (gameState) => ({
      ...gameState,
      unlockedGenres: [...gameState.unlockedGenres, 'Fantasy'],
    }),
  },
  {
    id: 'unlock-sci-fi',
    name: 'Unlock Sci-Fi',
    description: 'Allows you to write Sci-Fi novels.',
    cost: 500,
    apply: (gameState) => ({
      ...gameState,
      unlockedGenres: [...gameState.unlockedGenres, 'Sci-Fi'],
    }),
  },
  {
    id: 'unlock-mystery',
    name: 'Unlock Mystery',
    description: 'Allows you to write Mystery novels.',
    cost: 1000,
    apply: (gameState) => ({
      ...gameState,
      unlockedGenres: [...gameState.unlockedGenres, 'Mystery'],
    }),
  },
  {
    id: 'unlock-thriller',
    name: 'Unlock Thriller',
    description: 'Allows you to write Thriller novels.',
    cost: 2500,
    apply: (gameState) => ({
      ...gameState,
      unlockedGenres: [...gameState.unlockedGenres, 'Thriller'],
    }),
  },
];

const initialState: GameState = {
  money: 0,
  books: [],
  currentBook: null,
  upgrades: [],
  wordsPerClick: 1,
  wordsPerSecond: 0,
  bookValueMultiplier: 1,
  unlockedGenres: ['Romance'],
  trendingGenre: 'Romance',
  trendTimer: 20,
  warningTime: 5,
  isTrendEnding: false,
};

const genres: Genre[] = ['Romance', 'Fantasy', 'Sci-Fi', 'Mystery', 'Thriller'];

export default function GameContainer() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    const trendInterval = setInterval(() => {
      setGameState(prev => {
        const newTimer = prev.trendTimer - 1;

        if (newTimer <= 0) {
          const newGenre = genres[Math.floor(Math.random() * genres.length)];
          const newDuration = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
          const newWarningTime = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
          return {
            ...prev,
            trendingGenre: newGenre,
            trendTimer: newDuration,
            warningTime: newWarningTime,
            isTrendEnding: false,
          };
        }

        const isEnding = newTimer <= prev.warningTime;
        return { ...prev, trendTimer: newTimer, isTrendEnding: isEnding };
      });
    }, 1000);

    return () => clearInterval(trendInterval);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        if (!prev.currentBook) return prev;

        const newWordsWritten =
          prev.currentBook.wordsWritten + prev.wordsPerSecond;

        if (newWordsWritten >= prev.currentBook.wordCount) {
          const bookValue = prev.currentBook.value * prev.bookValueMultiplier;
          const finalValue = prev.currentBook.genre === prev.trendingGenre ? bookValue * 3 : bookValue;
          return {
            ...prev,
            money: prev.money + finalValue,
            currentBook: null,
          };
        }

        return {
          ...prev,
          currentBook: {
            ...prev.currentBook,
            wordsWritten: newWordsWritten,
          },
        };
      });
    }, 1000);

    return () => clearInterval(gameLoop);
  }, []);

  const handleWrite = () => {
    if (!gameState.currentBook) return;

    setGameState((prev) => {
      const newWordsWritten =
        prev.currentBook!.wordsWritten + prev.wordsPerClick;

      if (newWordsWritten >= prev.currentBook!.wordCount) {
        const bookValue =
          prev.currentBook!.value * prev.bookValueMultiplier;
        const finalValue = prev.currentBook!.genre === prev.trendingGenre ? bookValue * 3 : bookValue;
        return {
          ...prev,
          money: prev.money + finalValue,
          currentBook: null,
        };
      }

      return {
        ...prev,
        currentBook: {
          ...prev.currentBook!,
          wordsWritten: newWordsWritten,
        },
      };
    });
  };

  const handlePurchaseUpgrade = (upgrade: Upgrade) => {
    if (gameState.money >= upgrade.cost) {
      setGameState((prev) => {
        const newState = upgrade.apply(prev);
        return {
          ...newState,
          money: newState.money - upgrade.cost,
          upgrades: [...newState.upgrades, upgrade],
        };
      });
    }
  };

  const createNewBook = (genre: Genre) => {
    const newBook: Book = {
      id: new Date().toISOString(),
      genre: genre,
      wordCount: 100,
      wordsWritten: 0,
      value: 10,
    };
    setGameState((prev) => ({ ...prev, currentBook: newBook }));
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Idle Book Writer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <StatsPanel gameState={gameState} />
          <BookDisplay book={gameState.currentBook} onWrite={handleWrite} />
          {!gameState.currentBook && (
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-center">Choose a Genre</h3>
              {gameState.unlockedGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => createNewBook(genre)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
                >
                  Write {genre}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:col-span-1">
          <UpgradePanel
            upgrades={availableUpgrades.filter(
              (u) =>
                !gameState.upgrades.some((purchased) => purchased.id === u.id)
            )}
            onPurchase={handlePurchaseUpgrade}
            money={gameState.money}
          />
        </div>
      </div>
    </div>
  );
}
