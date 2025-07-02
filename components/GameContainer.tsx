'use client';

import { useState, useEffect } from 'react';
import { GameState, Book, Upgrade } from '../types';
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
];

const initialState: GameState = {
  money: 0,
  books: [],
  currentBook: null,
  upgrades: [],
  wordsPerClick: 1,
  wordsPerSecond: 0,
  bookValueMultiplier: 1,
  trendingGenre: 'Romance',
};

export default function GameContainer() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        if (!prev.currentBook) return prev;

        const newWordsWritten =
          prev.currentBook.wordsWritten + prev.wordsPerSecond;

        if (newWordsWritten >= prev.currentBook.wordCount) {
          const bookValue = prev.currentBook.value * prev.bookValueMultiplier;
          return {
            ...prev,
            money: prev.money + bookValue,
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
        return {
          ...prev,
          money: prev.money + bookValue,
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

  const createNewBook = () => {
    const newBook: Book = {
      id: new Date().toISOString(),
      genre: 'Romance',
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
            <button
              onClick={createNewBook}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg text-2xl"
            >
              Start New Book
            </button>
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
