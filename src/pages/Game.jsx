import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { ALL_APPLICATIONS, XP_RULES, TIMER_TOTAL } from "../data/pairs";
import "./Game.css";

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getWrong(correct, all) {
  return shuffle(all.filter(a => a.label !== correct.label)).slice(0, 3);
}

function FloatingXP({ value, id }) {
  return (
    <div key={id} className="floating-xp" style={{ color: "var(--rank-tree)" }}>
      +{value} XP
    </div>
  );
}

function TimerCircle({ timeLeft }) {
  const r = 18, circ = 2 * Math.PI * r;
  const frac = timeLeft / TIMER_TOTAL;
  const color = timeLeft <= 8 ? "#C04A2A" : timeLeft <= 18 ? "#C0902A" : "var(--mint-dark)";
  return (
    <div className="timer-circle">
      <svg width="48" height="48" style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx="24" cy="24" r={r} fill="none" stroke="var(--beige-dark)" strokeWidth="3" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - frac)}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.4s" }} />
      </svg>
      <span className="timer-number" style={{ color }}>{timeLeft}</span>
    </div>
  );
}

export default function Game() {
  const navigate = useNavigate();
 const { pairsOrder, challengeMode, addXP, rank, nextRank, gameStarted, totalXP, resetGame, currentIdx, setCurrentIdx } = useGameContext();

 
  const [idx, setIdx] = useState(currentIdx);
  const [choices, setChoices]         = useState([]);
  const [attempts, setAttempts]       = useState(0);
  const [wrongCards, setWrongCards]   = useState([]);
  const [banner, setBanner]           = useState(null);
  const [revealed, setRevealed]       = useState(false);
  const [successCard, setSuccessCard] = useState(null);
  const [pressedCard, setPressedCard] = useState(null);
  const [xpPop, setXpPop]             = useState(null);
  const [xpPopKey, setXpPopKey]       = useState(0);
  const [timeLeft, setTimeLeft]       = useState(TIMER_TOTAL);
  const [timerOn, setTimerOn]         = useState(false);
  const [screen, setScreen]           = useState("game");
  const timerRef = useRef(null);

  const pair = pairsOrder[idx];

  // Redirect si jeu pas démarré
  useEffect(() => {
    if (!gameStarted) navigate("/engagement");
  }, [gameStarted]);

  // Setup nouvelle carte
  const setupCard = useCallback(() => {
    if (!pair) return;
    setChoices(shuffle([pair.application, ...getWrong(pair.application, ALL_APPLICATIONS)]));
    setAttempts(0);
    setWrongCards([]);
    setBanner(null);
    setRevealed(false);
    setSuccessCard(null);
    setPressedCard(null);
    setTimeLeft(TIMER_TOTAL);
    if (challengeMode) setTimerOn(true);
    else setTimerOn(false);
  }, [idx, pair, challengeMode]);

  useEffect(() => { setupCard(); }, [idx]);

  // Timer — uniquement en mode défi
  useEffect(() => {
    if (!timerOn || !challengeMode) return;
    if (timeLeft <= 0) {
      setTimerOn(false);
      setBanner({
        type: "fail",
        data: { label: "Temps écoulé !", sub: "Passe à la suite !", color: "#8A3A2A", bg: "#F5E0DC" }
      });
      setTimeout(() => { setRevealed(true); setBanner(null); }, 1300);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, timerOn, challengeMode]);

  function popXP(val) {
    setXpPop(val);
    setXpPopKey(k => k + 1);
    setTimeout(() => setXpPop(null), 1400);
  }

  function pick(choice) {
    if (banner?.type === "success" || revealed) return;
    if (wrongCards.includes(choice.label)) return;

    setPressedCard(choice.label);
    setTimeout(() => setPressedCard(null), 300);

    if (choice.label === pair.application.label) {
      // ── BONNE RÉPONSE ──
      clearTimeout(timerRef.current);
      setTimerOn(false);
      const rule = XP_RULES[Math.min(attempts, 3)];
      let bonus = 0;
      if (challengeMode && attempts === 0) {
        bonus = timeLeft >= 20 ? 30 : timeLeft >= 12 ? 15 : 0;
      }
      const gained = rule.xp ;
      addXP(gained);
      popXP(gained);
      setSuccessCard(choice.label);
      setBanner({ type: "success", data: { ...rule, xp: gained, bonus } });
      setTimeout(() => { setRevealed(true); setBanner(null); }, 700);

    } else {
      // ── MAUVAISE RÉPONSE — pas de perte de points ──
      setWrongCards(w => [...w, choice.label]);
      setAttempts(a => a + 1);
    }
  }

 function next() {
  if (idx < pairsOrder.length - 1) {
    const newIdx = idx + 1;
    setIdx(newIdx);
    setCurrentIdx(newIdx);
  } else {
    setCurrentIdx(0);
    setScreen("end");
  }
}
  const indice =
    attempts === 1 ? pair?.indice1 :
    attempts === 2 ? pair?.indice2 :
    attempts === 3 ? pair?.indice3 : null;

  const barPct = (idx / pairsOrder.length) * 100;

  // ── ÉCRAN DE FIN ──
  if (screen === "end") {
    return (
      <div className="game-end" style={{ background: rank.bg }}>
        <div className="end-inner anim-fade-up">
          <div className="end-emoji anim-sprout">{rank.emoji}</div>
          <span className="end-rank-label">RANG ATTEINT</span>
          <h2 className="end-rank-name" style={{ color: rank.color }}>{rank.label}</h2>
          <p className="end-rank-desc">{rank.desc}</p>
          <div className="end-xp" style={{ color: rank.color }}>{totalXP} <span>XP</span></div>
          <p className="end-quote">"Concevoir juste, concevoir responsable."</p>
          <div className="end-buttons">
            <button className="btn btn-dark" onClick={() => { resetGame(); navigate("/"); }}>
              Rejouer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── ÉCRAN DE JEU ──
  return (
    <div className="game-page">
      {xpPop !== null && <FloatingXP value={xpPop} id={xpPopKey} />}

      {/* Barre de progression */}
      <div className="game-subheader">
        <div className="game-subheader-inner">
          <div className="game-progress-text">{idx + 1} / {pairsOrder.length} paires</div>
          <div className="game-progress-bar">
            <div className="game-progress-fill" style={{ width: `${barPct}%`, background: rank.color }} />
          </div>
          {challengeMode && !revealed && <TimerCircle timeLeft={timeLeft} />}
        </div>
      </div>

      <div className="game-inner page-wrapper">

        {/* Bannière succès uniquement */}
        {banner?.type === "success" && (
          <div className="game-banner anim-fade-up"
            style={{ background: banner.data.bg, borderColor: `${banner.data.color}30` }}>
            <span style={{ color: banner.data.color, fontWeight: 700 }}>{banner.data.label}</span>
            <span style={{ color: banner.data.color, opacity: 0.75, fontSize: 12 }}>
              {banner.data.bonus > 0 ? `⚡ +${banner.data.bonus} XP rapidité !` : `+${banner.data.xp} XP`}
            </span>
          </div>
        )}

        {/* Bannière temps écoulé */}
        {banner?.type === "fail" && (
          <div className="game-banner anim-fade-up"
            style={{ background: banner.data.bg, borderColor: `${banner.data.color}30` }}>
            <span style={{ color: banner.data.color, fontWeight: 700 }}>{banner.data.label}</span>
            <span style={{ color: banner.data.color, opacity: 0.75, fontSize: 12 }}>{banner.data.sub}</span>
          </div>
        )}

        <div className="game-layout">

          {/* GAUCHE — Carte vivant */}
          <div className="game-left">
            <span className="game-section-label">ÉLÉMENT DU VIVANT</span>
            <div
              className={`nature-card ${successCard ? "success" : ""}`}
              style={successCard ? { borderColor: rank.color, boxShadow: `0 8px 32px ${rank.color}40` } : {}}
            >
              <div className="card-corners">
                <span className="corner tl"/><span className="corner tr"/>
                <span className="corner bl"/><span className="corner br"/>
              </div>
              <div className="nature-card-img">
                {pair.nature.image
                  ? <img src={pair.nature.image} alt={pair.nature.label} />
                  : <div className="card-placeholder nature-placeholder"><span>🌿</span></div>
                }
              </div>
              <div className="nature-card-label">
                <span>{pair.nature.label}</span>
              </div>
            </div>

            {/* Indice — apparaît après chaque erreur */}
            {indice && (
              <div className="indice-box anim-fade-up">
                <span className="indice-icon">💡</span>
                <div>
                  <span className="indice-label">INDICE {attempts}</span>
                  <p className="indice-text">{indice}</p>
                </div>
              </div>
            )}

            {!revealed && attempts > 0 && attempts < 4 && (
              <p className="attempts-left">
                {4 - attempts} tentative{4 - attempts > 1 ? "s" : ""} restante{4 - attempts > 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* DROITE — Choix ou explication */}
          <div className="game-right">
            {!revealed ? (
              <>
                <span className="game-section-label">QUELLE APPLICATION EST INSPIRÉE DE CET ÉLÉMENT ?</span>
                <div className="choices-grid">
                  {choices.map(c => {
                    const wrong   = wrongCards.includes(c.label);
                    const correct = successCard === c.label;
                    const pressed = pressedCard === c.label;
                    return (
                      <button
                        key={c.label}
                        className={`choice-card ${wrong ? "wrong" : ""} ${correct ? "correct" : ""} ${pressed ? "pressed" : ""}`}
                        onClick={() => pick(c)}
                        disabled={wrong || !!successCard}
                        style={correct ? { borderColor: rank.color, background: rank.bg } : {}}
                      >
                        <div className="choice-img">
                          {c.image
                            ? <img src={c.image} alt={c.label} />
                            : <div className="card-placeholder app-placeholder"><span>🏛️</span></div>
                          }
                        </div>
                        <div className="choice-footer">
                          <span className="choice-label">{c.label}</span>
                          {correct && <span className="choice-tick">✓</span>}
                          {wrong   && <span className="choice-cross">✗</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="explication-panel anim-fade-up">
                <div className="explication-pair">
                  <span className="expl-nature">{pair.nature.label}</span>
                  <span className="expl-arrow">→</span>
                  <span className="expl-app">{pair.application.label}</span>
                </div>
                <span className="expl-tag">LIEN BIOMIMÉTIQUE</span>
                <p className="expl-lien">{pair.lien}</p>
                <div className="expl-divider" />
                <p className="expl-text">{pair.explication}</p>

                {nextRank && nextRank.min - totalXP <= 80 && (
                  <p className="expl-rank-nudge" style={{ color: rank.color }}>
                    {nextRank.emoji} Plus que {nextRank.min - totalXP} XP pour atteindre <strong>{nextRank.label}</strong> !
                  </p>
                )}

                <button className="btn btn-dark" onClick={next} style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}>
                  {idx < pairsOrder.length - 1 ? "Paire suivante →" : "Voir mes résultats"}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
