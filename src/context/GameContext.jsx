import { createContext, useContext, useState, useCallback } from "react";
import { PAIRS, RANKS } from "../data/pairs";

const GameContext = createContext(null);

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export function getRank(xp) {
  return [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];
}
export function getNextRank(xp) {
  return RANKS.find(r => r.min > xp) || null;
}

export function GameProvider({ children }) {
  const [totalXP, setTotalXP]         = useState(0);
  const [challengeMode, setChallengeMode] = useState(false);
  const [pairsOrder, setPairsOrder]   = useState(() => shuffle(PAIRS));
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = useCallback((mode) => {
    setChallengeMode(mode);
    setPairsOrder(shuffle(PAIRS));
    setGameStarted(true);
  }, []);

  const resetGame = useCallback(() => {
    setTotalXP(0);
    setPairsOrder(shuffle(PAIRS));
    setGameStarted(false);
    setChallengeMode(false);
  }, []);

  const addXP = useCallback((val) => {
    setTotalXP(prev => Math.max(0, prev + val));
  }, []);

  const rank     = getRank(totalXP);
  const nextRank = getNextRank(totalXP);

  return (
    <GameContext.Provider value={{
      totalXP, addXP,
      challengeMode, setChallengeMode,
      pairsOrder,
      gameStarted, startGame, resetGame,
      rank, nextRank,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be inside GameProvider");
  return ctx;
}
