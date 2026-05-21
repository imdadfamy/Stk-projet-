import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { startGame } = useGameContext();

  const handleMode = (mode) => {
    startGame(mode);
    navigate("/engagement");
  };

  return (
    <div className="home-page">
      <div className="home-inner page-wrapper">

        {/* Left column */}
        <div className="home-left anim-fade-up">
          <span className="home-tag">BIOMIMÉTISME & INNOVATION</span>

          <h1 className="home-title">
            <em>Le vivant</em><br />
            comme modèle
          </h1>

          <p className="home-subtitle">
            Découvrez les liens entre le vivant et les innovations humaines à
            travers une exploration architecturale et biologique immersive.
          </p>

          <div className="home-buttons">
            <button className="btn btn-dark" onClick={() => handleMode(false)}>
              <span className="btn-icon">🌿</span>
              MODE EXPLORATION
            </button>
            <button className="btn btn-mint" onClick={() => handleMode(true)}>
              <span className="btn-icon">⏱</span>
              MODE DÉFI — 30S
            </button>
          </div>
        </div>

        {/* Right column — hero card */}
        <div className="home-right anim-fade-in">
          <div className="home-hero-card">
            <div className="hero-card-corners">
              <span className="corner tl" /><span className="corner tr" />
              <span className="corner bl" /><span className="corner br" />
            </div>
            <div className="hero-card-img">
              {/* Placeholder — remplacer par <img src="..." alt="..." /> */}
              <div className="hero-placeholder">
                <span>🌿</span>
                <p>Biomimétisme<br />&amp; Architecture</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
