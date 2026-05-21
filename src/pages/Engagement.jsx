import { useNavigate } from "react-router-dom";
import "./Engagement.css";

const BIOME_EXAMPLES = [
  { nature: "Martin-pêcheur", tech: "TGV Japonais", desc: "Le bec fuselé de l'oiseau a inspiré le nez du train pour réduire le bruit au passage des tunnels." },
  { nature: "Termitière",     tech: "Eastgate Building", desc: "Ce centre commercial au Zimbabwe consomme 90% d'énergie en moins grâce à une ventilation passive inspirée des termitières." },
  { nature: "Requin",         tech: "Combinaisons de natation", desc: "La peau micro-striée du requin a inspiré des combinaisons ultra-rapides qui réduisent la résistance à l'eau." },
];

export default function Engagement() {
  const navigate = useNavigate();

  return (
    <div className="engagement-page">
      <div className="page-wrapper">

        {/* ── SECTION BIOMIMÉTISME ── */}
        <section className="eng-section anim-fade-up">
          <span className="eng-tag">LE VIVANT COMME MODÈLE</span>
          <h2 className="eng-title">Qu'est-ce que le biomimétisme ?</h2>
          <p className="eng-intro">
            Le biomimétisme — du grec <em>bios</em> (vie) et <em>mimesis</em> (imitation) — consiste à observer
            comment la nature résout ses problèmes et à s'en inspirer pour concevoir des innovations durables.
            En 3,8 milliards d'années d'évolution, le vivant a développé des solutions optimisées que nous
            commençons seulement à comprendre et à reproduire.
          </p>

          <div className="eng-quote">
            <blockquote>
              "La nature est le plus grand ingénieur qui soit."
            </blockquote>
          </div>

          <div className="eng-examples">
            {BIOME_EXAMPLES.map((ex, i) => (
              <div key={i} className="eng-example-card">
                <div className="example-pair">
                  <span className="example-nature">{ex.nature}</span>
                  <span className="example-arrow">→</span>
                  <span className="example-tech">{ex.tech}</span>
                </div>
                <p className="example-desc">{ex.desc}</p>
              </div>
            ))}
          </div>

          <div className="eng-domains">
            <h3 className="domains-title">Les domaines d'application</h3>
            <div className="domains-grid">
              {["Architecture", "Matériaux", "Énergie", "Eau", "Robotique", "Médecine"].map(d => (
                <span key={d} className="domain-tag">{d}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="eng-divider" />

        {/* ── RÈGLES DU JEU ── */}
        <section className="eng-section anim-fade-up">
          <span className="eng-tag">COMMENT JOUER</span>
          <h2 className="eng-title">Règles du jeu</h2>

          <p className="eng-intro">
            Ce jeu vous invite à découvrir les liens entre le vivant et les innovations humaines.
            Il ne s'agit pas de mémoire — mais d'association et de compréhension.
          </p>

          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-number">01</div>
              <h4>Observez la carte</h4>
              <p>Un élément du vivant s'affiche — animal, plante, phénomène naturel. Observez-le attentivement.</p>
            </div>
            <div className="rule-card">
              <div className="rule-number">02</div>
              <h4>Choisissez parmi 4</h4>
              <p>Quatre applications humaines vous sont proposées. Une seule correspond à l'élément du vivant affiché.</p>
            </div>
            <div className="rule-card">
              <div className="rule-number">03</div>
              <h4>Utilisez les indices</h4>
              <p>À chaque erreur, un indice se déverrouille pour vous guider. Vous avez 4 tentatives par paire.</p>
            </div>
            <div className="rule-card">
              <div className="rule-number">04</div>
              <h4>Gagnez des XP</h4>
              <p>Plus vous trouvez vite, plus vous gagnez de points. Les erreurs coûtent des XP. Évoluez vers la Forêt.</p>
            </div>
          </div>

          {/* XP table */}
          <div className="rules-xp">
            <h3 className="rules-xp-title">Système de points</h3>
            <div className="xp-table">
              {[
                ["1er coup",        "+100 XP", "var(--rank-tree)"],
                ["2ème coup",       "+60 XP",  "var(--mint-dark)"],
                ["3ème coup",       "+30 XP",  "var(--brown)"],
                ["4ème coup",       "+10 XP",  "var(--brown-light)"],
         
              ].map(([label, xp, color]) => (
                <div key={label} className="xp-row">
                  <span className="xp-label">{label}</span>
                  <span className="xp-value" style={{ color }}>{xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ranks */}
          <div className="rules-ranks">
            <h3 className="rules-xp-title">Système de rangs</h3>
            <div className="ranks-row">
              {[
                { emoji:"🌱", label:"Graine", xp:"0–199 XP" },
                { emoji:"🌿", label:"Pousse", xp:"200–449 XP" },
                { emoji:"🌳", label:"Arbre",  xp:"450–749 XP" },
                { emoji:"🌲", label:"Forêt",  xp:"750+ XP" },
              ].map(r => (
                <div key={r.label} className="rank-card">
                  <span className="rank-card-emoji">{r.emoji}</span>
                  <span className="rank-card-label">{r.label}</span>
                  <span className="rank-card-xp">{r.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="eng-cta anim-fade-up">
          <p>Prêt à explorer les liens entre le vivant et l'architecture ?</p>
          <button className="btn btn-dark btn-lg" onClick={() => navigate("/jeu")}>
            Commencer le jeu →
          </button>
        </div>

      </div>
    </div>
  );
}
