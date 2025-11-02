import './Features.css'

function Features() {
  const features = [
    {
      id: 1,
      title: 'Gratis verzending',
      description: 'Voor bestellingen boven €50'
    },
    {
      id: 2,
      title: 'Veilig betalen',
      description: 'Alle betalingen zijn beveiligd'
    },
    {
      id: 3,
      title: '30 dagen retour',
      description: 'Niet tevreden? Geld terug'
    }
  ]

  return (
    <section className="features">
      <div className="features-container">
        <h2>Waarom kiezen voor ons?</h2>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
