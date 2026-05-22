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
  const [totalXP, setTotalXP]             = useState(0);
  const [challengeMode, setChallengeMode] = useState(false);
  const [pairsOrder, setPairsOrder]       = useState(() => shuffle(PAIRS));
  const [gameStarted, setGameStarted]     = useState(false);
  const [currentIdx, setCurrentIdx]       = useState(0);
  const [gameMode, setGameMode]           = useState(null); // "exploration" | "challenge"

  const startGame = useCallback((mode) => {
    // Si même mode et partie en cours — on continue
    if (gameStarted && gameMode === (mode ? "challenge" : "exploration")) {
      return;
    }
    // Nouveau mode ou première fois — on repart à zéro
    setChallengeMode(mode);
    setGameMode(mode ? "challenge" : "exploration");
    setPairsOrder(shuffle(PAIRS));
    setTotalXP(0);
    setCurrentIdx(0);
    setGameStarted(true);
  }, [gameStarted, gameMode]);

  const resetGame = useCallback(() => {
    setTotalXP(0);
    setPairsOrder(shuffle(PAIRS));
    setGameStarted(false);
    setChallengeMode(false);
    setCurrentIdx(0);
    setGameMode(null);
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
      currentIdx, setCurrentIdx,
      gameMode,
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