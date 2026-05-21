import "./Agence.css";

export default function Agence() {
  return (
    <div className="agence-page">
      <div className="page-wrapper">
        <section className="agence-section anim-fade-up">
          <span className="agence-tag">L'AGENCE</span>
          <h2 className="agence-title">STK Architecture</h2>
          <p className="agence-text">
            Fondée en 2009 par Serap Gülmez, architecte D.P.L.G., STK Architecture conçoit des espaces qui
            répondent aux modes de vie contemporains sans rompre avec le vivant. Basée à Montreuil, l'agence
            intervient à Paris et en Île-de-France.
          </p>
          <p className="agence-text">
            À taille humaine, l'équipe développe une approche sensible et exigeante où chaque projet cherche
            à être juste pour ses habitants, cohérent avec son contexte, responsable vis-à-vis de son territoire.
          </p>
          <div className="agence-values">
            {["Architecture bioclimatique", "Biomimétisme", "Éco-conception", "Matériaux biosourcés"].map(v => (
              <span key={v} className="agence-tag-value">{v}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
