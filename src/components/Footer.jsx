import './Footer.css'

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-section">
          <h4>🥷 SUSHINJA</h4>
          <p>Stealth dining met authentieke Japanse sushi. Ervaar de kunst van de ninja in elke hap.</p>
        </div>
        <div className="footer-section">
          <h4>Snelle links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#booking">Reserveren</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 info@sushinja.nl</p>
          <p>📞 +31 6 12345678</p>
          <p>📍 Ninjastraat 1, Amsterdam</p>
        </div>
        <div className="footer-section">
          <h4>Openingstijden</h4>
          <p>Di-Vr: 17:00 - 23:00</p>
          <p>Za-Zo: 12:00 - 23:00</p>
          <p>Maandag: Gesloten</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 SUSHINJA. Alle rechten voorbehouden. | Made with 🗡️ & 🍣</p>
      </div>
    </footer>
  )
}

export default Footer

