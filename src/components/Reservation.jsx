import './Reservation.css'
import BookingForm from './BookingForm'

function Reservation({ onSubmit }) {
  return (
    <section className="reservation-section" id="reserveren">
      <div className="reservation-container">
        <div className="reservation-header">
          <span className="reservation-icon">🥷</span>
          <h2 className="reservation-title">Reserveer je Tafel</h2>
          <p className="reservation-subtitle">Stealth dining experience</p>
        </div>

        <div className="reservation-content">
          <div className="reservation-info">
            <div className="info-box highlight">
              <h3>🕐 Openingstijden & Reserveren</h3>
              <p><strong>Dinsdag - Zondag: 17:00 - 23:00</strong></p>
              <p><strong>Maandag: Gesloten</strong></p>
              <p style={{marginTop: '1rem', fontSize: '0.95rem'}}>
                ⏰ Laatste reservering om 22:00<br/>
                ⚡ Reserveer binnen deze tijden
              </p>
            </div>

            <div className="info-box">
              <h3>🍱 All You Can Eat</h3>
              <p>€40,00 per persoon</p>
              <p>€18,00 kinderen (0-12 jaar)</p>
              <p style={{marginTop: '0.8rem', color: '#d4764e'}}>
                🍶 +€25 p.p. All You Can Drink
              </p>
            </div>

            <div className="info-box">
              <h3>� Locatie</h3>
              <p>Ninjastraat 1</p>
              <p>1012 AB Amsterdam</p>
              <p style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>📞 +31 20 123 4567</p>
            </div>

            <div className="info-box">
              <h3>ℹ️ Belangrijk</h3>
              <p>✓ Reserveren verplicht voor 6+ personen</p>
              <p>✓ Annuleren tot 24u van tevoren</p>
              <p>✓ Geef leeftijden door bij reservering</p>
              <p>✓ Kinderstoelen beschikbaar</p>
            </div>
          </div>

          <BookingForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  )
}

export default Reservation
