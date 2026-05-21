import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="page-wrapper">
        <section className="contact-section anim-fade-up">
          <span className="contact-tag">CONTACT</span>
          <h2 className="contact-title">Nous contacter</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-label">AGENCE</p>
              <p>STK Architecture</p>
              <p>Montreuil, Île-de-France</p>
            </div>
            <div className="contact-info">
              <p className="contact-label">EMAIL</p>
              <p>contact@stk-architecture.fr</p>
            </div>
            <div className="contact-info">
              <p className="contact-label">SITE</p>
              <p>stk-architecture.fr</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
