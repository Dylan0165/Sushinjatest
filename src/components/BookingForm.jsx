import './BookingForm.css'
import { useState } from 'react'

function BookingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    adults: 2,
    children: 0,
    childSeats: 0,
    allYouCanDrink: false,
    specialWishes: ''
  })

  // Generate date options (next 60 days, excluding Mondays)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 60; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      
      // Skip Mondays (day 1)
      if (date.getDay() !== 1) {
        const dateString = date.toISOString().split('T')[0]
        const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']
        const monthNames = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
        
        const dayName = dayNames[date.getDay()]
        const day = date.getDate()
        const month = monthNames[date.getMonth()]
        const year = date.getFullYear()
        
        dates.push({
          value: dateString,
          label: `${dayName} ${day} ${month} ${year}`
        })
      }
    }
    
    return dates
  }

  // Generate time slots (17:00 - 22:00, 15 min intervals)
  const getAvailableTimes = () => {
    const times = []
    const startHour = 17
    const endHour = 22
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let min = 0; min < 60; min += 15) {
        if (hour === endHour && min > 0) break // Stop at 22:00
        
        const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
        times.push(timeString)
      }
    }
    
    return times
  }

  const availableDates = getAvailableDates()
  const availableTimes = getAvailableTimes()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Prijsberekening
  const calculateTotal = () => {
    const ADULT_PRICE = 40
    const CHILD_PRICE = 18
    const DRINK_PRICE = 25

    const adults = parseInt(formData.adults) || 0
    const children = parseInt(formData.children) || 0
    const totalPersons = adults + children

    const foodTotal = (adults * ADULT_PRICE) + (children * CHILD_PRICE)
    const drinkTotal = formData.allYouCanDrink ? (totalPersons * DRINK_PRICE) : 0
    const total = foodTotal + drinkTotal

    return {
      adults,
      children,
      totalPersons,
      foodTotal,
      drinkTotal,
      total
    }
  }

  const priceBreakdown = calculateTotal()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.date && formData.time) {
      const reservationData = {
        ...formData,
        totalAmount: priceBreakdown.total,
        breakdown: priceBreakdown
      }
      onSubmit(reservationData)
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        adults: 2,
        children: 0,
        childSeats: 0,
        allYouCanDrink: false,
        specialWishes: ''
      })
      alert(`🥷 Reservering bevestigd!\n\nTotaalbedrag: €${priceBreakdown.total.toFixed(2)}\n\nJe ontvangt een bevestiging per e-mail.`)
    } else {
      alert('⚠️ Vul alstublieft alle verplichte velden in.')
    }
  }

  return (
    <section className="booking-form-section" id="booking">
      <div className="booking-container">
        <div className="section-header">
          <span className="section-icon">🗡️</span>
          <h2 className="booking-title">Reserveer je Ninja Ervaring</h2>
          <p className="booking-subtitle">Vul onderstaande gegevens in voor je stealth dining</p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Personal Info */}
            <div className="form-group">
              <label htmlFor="name">
                <span className="label-icon">👤</span>
                Naam *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Je volledige naam"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="je@email.nl"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <span className="label-icon">📱</span>
                Telefoonnummer
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+31 6 12345678"
              />
            </div>

            {/* Date & Time */}
            <div className="form-group">
              <label htmlFor="date">
                <span className="label-icon">📅</span>
                Datum * (Maandag gesloten)
              </label>
              <select
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              >
                <option value="">Kies een datum...</option>
                {availableDates.map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="time">
                <span className="label-icon">🕐</span>
                Tijd * (17:00-22:00)
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Kies een tijd...</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time} uur
                  </option>
                ))}
              </select>
              <small style={{color: '#d4764e', fontSize: '0.85rem', marginTop: '0.3rem', display: 'block'}}>
                * Laatste reservering om 22:00
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="guests">
                <span className="label-icon">👥</span>
                Aantal personen *
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16].map(num => (
                  <option key={num} value={num}>{num} personen</option>
                ))}
              </select>
            </div>

            {/* Age Distribution */}
            <div className="form-group">
              <label htmlFor="adults">
                <span className="label-icon">👨‍👩‍👧‍👦</span>
                Aantal volwassenen *
              </label>
              <select
                id="adults"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16].map(num => (
                  <option key={num} value={num}>{num} volwassenen</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="children">
                <span className="label-icon">👶</span>
                Aantal kinderen (0-12 jaar)
              </label>
              <select
                id="children"
                name="children"
                value={formData.children}
                onChange={handleChange}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} kinderen</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="childSeats">
                <span className="label-icon">🪑</span>
                Kinderstoelen nodig
              </label>
              <select
                id="childSeats"
                name="childSeats"
                value={formData.childSeats}
                onChange={handleChange}
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} kinderstoelen</option>
                ))}
              </select>
            </div>

            {/* All You Can Drink */}
            <div className="form-group full-width">
              <label htmlFor="allYouCanDrink" style={{flexDirection: 'row', cursor: 'pointer', alignItems: 'center'}}>
                <input
                  type="checkbox"
                  id="allYouCanDrink"
                  name="allYouCanDrink"
                  checked={formData.allYouCanDrink}
                  onChange={handleChange}
                  style={{width: 'auto', marginRight: '0.8rem', cursor: 'pointer', accentColor: '#d4764e'}}
                />
                <span className="label-icon">🍶</span>
                <span>All You Can Drink toevoegen (+€25 p.p.)</span>
              </label>
              <small style={{color: '#5a4a3a', fontSize: '0.9rem', marginTop: '0.5rem', display: 'block', marginLeft: '2rem'}}>
                Inclusief sake, bier, wijn, frisdrank en thee gedurende 2,5 uur
              </small>
            </div>

            {/* Special Wishes */}
            <div className="form-group full-width">
              <label htmlFor="specialWishes">
                <span className="label-icon">📝</span>
                Speciale wensen
              </label>
              <textarea
                id="specialWishes"
                name="specialWishes"
                value={formData.specialWishes}
                onChange={handleChange}
                placeholder="Bijv. allergieën, verjaardag, dieetwensen..."
                rows="4"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          {priceBreakdown.totalPersons > 0 && (
            <div className="price-summary">
              <h3 className="price-summary-title">
                <span className="price-icon">💰</span>
                Totaaloverzicht
              </h3>
              
              <div className="price-breakdown">
                {priceBreakdown.adults > 0 && (
                  <div className="price-line">
                    <span className="price-description">
                      All You Can Eat - Volwassenen ({priceBreakdown.adults}x)
                    </span>
                    <span className="price-amount">€{(priceBreakdown.adults * 40).toFixed(2)}</span>
                  </div>
                )}
                
                {priceBreakdown.children > 0 && (
                  <div className="price-line">
                    <span className="price-description">
                      All You Can Eat - Kinderen ({priceBreakdown.children}x)
                    </span>
                    <span className="price-amount">€{(priceBreakdown.children * 18).toFixed(2)}</span>
                  </div>
                )}

                {formData.allYouCanDrink && (
                  <div className="price-line highlight">
                    <span className="price-description">
                      🍶 All You Can Drink ({priceBreakdown.totalPersons}x)
                    </span>
                    <span className="price-amount">€{priceBreakdown.drinkTotal.toFixed(2)}</span>
                  </div>
                )}

                <div className="price-divider"></div>

                <div className="price-line total">
                  <span className="price-description">
                    <strong>Totaal te betalen</strong>
                  </span>
                  <span className="price-amount total-amount">
                    €{priceBreakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="payment-info">
                <p>💳 Betaling vindt plaats bij aankomst in het restaurant</p>
                <p style={{fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8}}>
                  * Prijzen zijn inclusief BTW
                </p>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">
            <span className="button-icon">🥷</span>
            Bevestig Reservering {priceBreakdown.total > 0 && `(€${priceBreakdown.total.toFixed(2)})`}
            <span className="button-shine"></span>
          </button>
        </form>

        <div className="booking-info">
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h4>Via telefoon</h4>
              <p>+31 6 12345678</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📧</span>
            <div>
              <h4>Via e-mail</h4>
              <p>info@sushinja.nl</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🕐</span>
            <div>
              <h4>Openingstijden</h4>
              <p>Di-Zo: 17:00-23:00<br/>Maandag gesloten</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
