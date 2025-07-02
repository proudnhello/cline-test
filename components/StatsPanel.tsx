import { GameState } from '../types';

interface StatsPanelProps {
  gameState: GameState;
}

export default function StatsPanel({ gameState }: StatsPanelProps) {
  return (
    <div>
      <h2>Stats</h2>
      <p>Money: ${gameState.money.toFixed(2)}</p>
      <p>Words per Second: {gameState.wordsPerSecond}</p>
      <p>Words per Click: {gameState.wordsPerClick}</p>
    </div>
  );
}
