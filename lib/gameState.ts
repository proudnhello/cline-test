import { supabase } from './supabaseClient'
import { GameState } from '@/types';

export async function saveGameState(userId: string, gameState: GameState) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ user_id: userId, game_state: gameState });

  if (error) {
    console.error('Error saving game state:', error);
  }
}

export async function loadGameState(userId: string): Promise<GameState | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('game_state')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error loading game state:', error);
    return null;
  }

  return data?.game_state || null;
}
