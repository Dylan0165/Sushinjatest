import './Menu.css'

function Menu() {
  const menuItems = {
    nigiri: [
      { name: 'Zalm Nigiri', price: '3,50' },
      { name: 'Tonijn Nigiri', price: '4,00' },
      { name: 'Ebi Nigiri', price: '3,00' },
      { name: 'Unagi Nigiri', price: '4,50' },
      { name: 'Tamago Nigiri', price: '2,50' }
    ],
    maki: [
      { name: 'California Roll', price: '8,50' },
      { name: 'Spicy Tuna Roll', price: '9,50' },
      { name: 'Dragon Roll', price: '12,00' },
      { name: 'Rainbow Roll', price: '13,50' },
      { name: 'Vegetarische Roll', price: '7,00' }
    ],
    sashimi: [
      { name: 'Zalm Sashimi', price: '14,00' },
      { name: 'Tonijn Sashimi', price: '16,00' },
      { name: 'Mix Sashimi', price: '18,50' },
      { name: 'Deluxe Sashimi', price: '24,00' }
    ],
    special: [
      { name: 'Ninja Box (16st)', price: '25,00' },
      { name: 'Samurai Platter (32st)', price: '45,00' },
      { name: 'Vegan Selection', price: '18,00' }
    ]
  }

  return (
    <section className="menu-section" id="menu">
      <div className="menu-background-overlay"></div>
      
      <div className="menu-container">
        <div className="menu-header">
          <span className="menu-icon">📜</span>
          <h2 className="menu-title">Ons Menu</h2>
          <p className="menu-subtitle">Authentieke Japanse Keuken</p>
        </div>

        {/* All You Can Eat Banner */}
        <div className="ayce-banner">
          <div className="ayce-content">
            <h3 className="ayce-title">🍱 All You Can Eat</h3>
            <div className="ayce-pricing">
              <div className="ayce-price-item">
                <span className="ayce-price">€40,00</span>
                <span className="ayce-label">per persoon</span>
              </div>
              <div className="ayce-price-item">
                <span className="ayce-price">€18,00</span>
                <span className="ayce-label">kinderen onder 12</span>
              </div>
            </div>
            <p className="ayce-description">Onbeperkt genieten van onze volledige kaart</p>
            <div style={{
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(212, 118, 78, 0.1)',
              borderRadius: '6px',
              borderLeft: '4px solid #d4764e'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#2d2423',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                🍶 All You Can Drink optie: +€25,00 p.p.
              </p>
              <p style={{
                fontSize: '0.95rem',
                color: '#5a4a3a',
                lineHeight: '1.6'
              }}>
                Inclusief sake, bier, wijn, frisdrank en thee gedurende 2,5 uur
              </p>
            </div>
          </div>
        </div>

        {/* Menu Image */}
        <div className="menu-image-container">
          <img src="../../../Afbeeldingen/sushi plaatje 5.jpg" alt="Sushinja Menu" className="menu-image" />
          <div className="menu-image-overlay">
            <p>Bekijk onze volledige menukaart</p>
          </div>
        </div>

        {/* Menu Categories Grid */}
        <div className="menu-categories">
          {/* Nigiri Section */}
          <div className="menu-category">
            <h3 className="category-title">
              <span className="category-icon">🍣</span>
              Nigiri
            </h3>
            <div className="menu-items">
              {menuItems.nigiri.map((item, index) => (
                <div key={index} className="menu-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-dots"></span>
                  <span className="item-price">€{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maki Section */}
          <div className="menu-category">
            <h3 className="category-title">
              <span className="category-icon">🍱</span>
              Maki Rolls
            </h3>
            <div className="menu-items">
              {menuItems.maki.map((item, index) => (
                <div key={index} className="menu-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-dots"></span>
                  <span className="item-price">€{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sashimi Section */}
          <div className="menu-category">
            <h3 className="category-title">
              <span className="category-icon">🔪</span>
              Sashimi
            </h3>
            <div className="menu-items">
              {menuItems.sashimi.map((item, index) => (
                <div key={index} className="menu-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-dots"></span>
                  <span className="item-price">€{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Section */}
          <div className="menu-category">
            <h3 className="category-title">
              <span className="category-icon">⭐</span>
              Ninja Specials
            </h3>
            <div className="menu-items">
              {menuItems.special.map((item, index) => (
                <div key={index} className="menu-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-dots"></span>
                  <span className="item-price">€{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu
