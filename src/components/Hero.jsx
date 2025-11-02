import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-smoke"></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="ninja-logo">
          <img src="../../../Afbeeldingen/Logo Sushinja.png" alt="Sushinja" className="hero-logo-image" />
        </div>
        
        <h1 className="hero-brand">SUSHINJA</h1>
        <div className="hero-tagline">忍者 · NINJA SUSHI EXPERIENCE</div>
        
        <div className="hero-divider">
          <span className="divider-left"></span>
          <span className="ninja-star">✦</span>
          <span className="divider-right"></span>
        </div>
        
        <p className="hero-description">
          Stealth dining in de schaduw. Reserveer je ultieme sushi ervaring.
        </p>
        
        <div className="hero-cta">
          <a href="#booking" className="ninja-button primary">
            <span className="button-icon">🗡️</span>
            Reserveer Nu
          </a>
          <a href="#menu" className="ninja-button secondary">
            <span className="button-icon">📜</span>
            Bekijk Menu
          </a>
        </div>
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span>Snelle service</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎌</span>
            <span>Authentiek Japans</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔥</span>
            <span>Fresh daily</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


