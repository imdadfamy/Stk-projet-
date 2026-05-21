import { useGameContext, getNextRank } from "../../context/GameContext";
import { RANKS } from "../../data/pairs";
import "./XPBar.css";

export default function XPBar() {
  const { totalXP, rank, nextRank } = useGameContext();

  const progressToNext = nextRank
    ? ((totalXP - rank.min) / (nextRank.min - rank.min)) * 100
    : 100;

  return (
    <div className="xpbar">
      <div className="xpbar-inner">
        {/* Rang steps */}
        <div className="xpbar-ranks">
          {RANKS.map((r, i) => {
            const unlocked = totalXP >= r.min;
            const current  = rank.label === r.label;
            return (
              <div key={r.label} className={`rank-step ${unlocked ? "unlocked" : ""} ${current ? "current" : ""}`}>
                <div className="rank-step-icon" style={{ color: unlocked ? r.color : "var(--grey-mid)" }}>
                  {r.emoji}
                </div>
                <span className="rank-step-label">{r.label.toUpperCase()}</span>
                {i < RANKS.length - 1 && (
                  <div className="rank-step-line">
                    <div className="rank-step-fill" style={{ width: unlocked ? "100%" : "0%", background: r.color }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* XP Counter */}
        <div className="xpbar-score">
          <span className="xpbar-label">PROGRÈS ACTUEL</span>
          <span className="xpbar-total">{totalXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="xpbar-progress">
        <div
          className="xpbar-progress-fill"
          style={{
            width: `${Math.min(progressToNext, 100)}%`,
            background: rank.color,
          }}
        />
      </div>
    </div>
  );
}
