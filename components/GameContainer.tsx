'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, Book, Upgrade, Genre } from '../types';
import { supabase } from '../lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';
import { saveGameState, loadGameState } from '../lib/gameState';
import StatsPanel from './StatsPanel';
import BookDisplay from './BookDisplay';
import UpgradePanel from './UpgradePanel';

const availableUpgrades: Upgrade[] = [
  // Fast Writer Upgrades
  { id: 'fast-writer-1', name: 'Ergonomic Keyboard', description: 'Write +1 word per click.', cost: 10, apply: (gs) => ({ ...gs, wordsPerClick: gs.wordsPerClick + 1 }) },
  { id: 'fast-writer-2', name: 'Touch Typing Course', description: 'Write +2 words per click.', cost: 40, apply: (gs) => ({ ...gs, wordsPerClick: gs.wordsPerClick + 2 }) },
  { id: 'fast-writer-3', name: 'Mechanical Keyboard', description: 'Write +5 words per click.', cost: 150, apply: (gs) => ({ ...gs, wordsPerClick: gs.wordsPerClick + 5 }) },

  // Passive Writing Upgrades
  { id: 'hire-blogger', name: 'Hire Blogger', description: 'Writes +1 word per second.', cost: 20, apply: (gs) => ({ ...gs, wordsPerSecond: gs.wordsPerSecond + 1 }) },
  { id: 'hire-ghostwriter', name: 'Hire Ghostwriter', description: 'Writes +5 words per second.', cost: 120, apply: (gs) => ({ ...gs, wordsPerSecond: gs.wordsPerSecond + 5 }) },
  { id: 'hire-writing-team', name: 'Hire Writing Team', description: 'Writes +20 words per second.', cost: 500, apply: (gs) => ({ ...gs, wordsPerSecond: gs.wordsPerSecond + 20 }) },

  // Book Value Upgrades
  { id: 'better-covers', name: 'Better Covers', description: 'Book value +10%.', cost: 30, apply: (gs) => ({ ...gs, bookValueMultiplier: gs.bookValueMultiplier * 1.1 }) },
  { id: 'professional-editing', name: 'Professional Editing', description: 'Book value +20%.', cost: 150, apply: (gs) => ({ ...gs, bookValueMultiplier: gs.bookValueMultiplier * 1.2 }) },
  { id: 'marketing-campaign', name: 'Marketing Campaign', description: 'Book value +50%.', cost: 600, apply: (gs) => ({ ...gs, bookValueMultiplier: gs.bookValueMultiplier * 1.5 }) },

  // Genre Unlocks
  { id: 'unlock-fantasy', name: 'Unlock Fantasy', description: 'Allows you to write Fantasy novels.', cost: 80, apply: (gs) => ({ ...gs, unlockedGenres: [...gs.unlockedGenres, 'Fantasy'] }) },
  { id: 'unlock-sci-fi', name: 'Unlock Sci-Fi', description: 'Allows you to write Sci-Fi novels.', cost: 250, apply: (gs) => ({ ...gs, unlockedGenres: [...gs.unlockedGenres, 'Sci-Fi'] }) },
  
  // NEW: Word Count Reduction Upgrades
  { id: 'shorter-books-1', name: 'Concise Writing', description: 'Books require 10% fewer words.', cost: 200, apply: (gs) => ({ ...gs, wordCountMultiplier: gs.wordCountMultiplier * 0.9 }) },
  { id: 'shorter-books-2', name: 'Abridged Editions', description: 'Books require 15% fewer words.', cost: 750, apply: (gs) => ({ ...gs, wordCountMultiplier: gs.wordCountMultiplier * 0.85 }) },
];

const initialState: GameState = {
  money: 0,
  books: [],
  currentBook: null,
  upgrades: [],
  wordsPerClick: 1,
  wordsPerSecond: 0,
  bookValueMultiplier: 1,
  wordCountMultiplier: 1,
  unlockedGenres: ['Romance'],
  trendingGenre: 'Romance',
  trendTimer: 20,
  warningTime: 5,
  isTrendEnding: false,
};

const genres: Genre[] = ['Romance', 'Fantasy', 'Sci-Fi', 'Mystery', 'Thriller'];

export default function GameContainer() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const loadedState = await loadGameState(user.id);
        if (loadedState) {
          setGameState(loadedState);
        }
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (userId) {
      const saveInterval = setInterval(() => {
        saveGameState(userId, gameState);
      }, 60000); // Save every 60 seconds

      return () => clearInterval(saveInterval);
    }
  }, [userId, gameState]);

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
      const newState = upgrade.apply(gameState);
      const finalState = {
        ...newState,
        money: newState.money - upgrade.cost,
        upgrades: [...newState.upgrades, upgrade],
      };
      setGameState(finalState);
      if (userId) {
        saveGameState(userId, finalState);
      }
    }
  };

  const createNewBook = (genre: Genre) => {
    const baseWordCount = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random base between 50 and 100
    const newBook: Book = {
      id: new Date().toISOString(),
      genre: genre,
      wordCount: Math.floor(baseWordCount * gameState.wordCountMultiplier), // Apply multiplier
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
                !gameState.upgrades.some((purchased) => purchased.id === u.id) &&
                u.cost <= gameState.money * 10 
            )}
            onPurchase={handlePurchaseUpgrade}
            money={gameState.money}
          />
        </div>
      </div>
    </div>
  );
}
