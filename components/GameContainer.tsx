'use client';

import { useState, useEffect } from 'react';
import { GameState, Book, Upgrade } from '../types';
import StatsPanel from './StatsPanel';
import BookDisplay from './BookDisplay';
import UpgradePanel from './UpgradePanel';

const availableUpgrades: Upgrade[] = [
  {
    id: 'fast-writer',
    name: 'Fast Writer',
    description: 'Increases writing speed by 1 word per click.',
    cost: 10,
    apply: (gameState) => ({
      ...gameState,
      wordsPerClick: gameState.wordsPerClick + 1,
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
    id: 'better-covers',
    name: 'Better Covers',
    description: 'Increases the value of your books by 10%.',
    cost: 50,
    apply: (gameState) => ({
      ...gameState,
      bookValueMultiplier: gameState.bookValueMultiplier * 1.1,
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
    <div>
      <h1>Idle Book Writer</h1>
      <StatsPanel gameState={gameState} />
      <BookDisplay book={gameState.currentBook} onWrite={handleWrite} />
      {!gameState.currentBook && (
        <button onClick={createNewBook}>New Book</button>
      )}
      <UpgradePanel
        upgrades={availableUpgrades.filter(
          (u) => !gameState.upgrades.some((purchased) => purchased.id === u.id)
        )}
        onPurchase={handlePurchaseUpgrade}
      />
    </div>
  );
}
