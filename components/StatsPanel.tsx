import { GameState } from '../types';

interface StatsPanelProps {
  gameState: GameState;
}

export default function StatsPanel({ gameState }: StatsPanelProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-400">Money</p>
          <p className="text-2xl font-bold">${gameState.money.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-400">Market Trend</p>
          <p className={`text-2xl font-bold ${gameState.isTrendEnding ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
            {gameState.trendingGenre}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-400">Words/Second</p>
          <p className="text-2xl font-bold">{gameState.wordsPerSecond}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-400">Words/Click</p>
          <p className="text-2xl font-bold">{gameState.wordsPerClick}</p>
        </div>
      </div>
    </div>
  );
}
