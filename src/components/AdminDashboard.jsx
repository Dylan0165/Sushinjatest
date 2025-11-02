import './AdminDashboard.css'

function AdminDashboard({ bookings }) {
  const totalBookings = bookings.length
  const totalGuests = bookings.reduce((sum, b) => sum + parseInt(b.guests), 0)

  return (
    <section className="admin-section">
      <div className="admin-container">
        <h2 className="admin-title">📊 Admin Dashboard</h2>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalBookings}</div>
            <p className="stat-label">Totale reserveringen</p>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalGuests}</div>
            <p className="stat-label">Verwachte gasten</p>
          </div>
          <div className="stat-card">
            <div className="stat-value">✅</div>
            <p className="stat-label">Alle geaccepteerd</p>
          </div>
        </div>

        {/* Bookings list */}
        <div className="bookings-list">
          <h3>Alle reserveringen</h3>
          
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>🍣 Nog geen reserveringen. Wacht tot klanten hun reservering indienen.</p>
            </div>
          ) : (
            <div className="bookings-table-wrapper">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Naam</th>
                    <th>E-mail</th>
                    <th>Datum</th>
                    <th>Tijd</th>
                    <th>Personen</th>
                    <th>Notities</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td><strong>{booking.name}</strong></td>
                      <td>{booking.email}</td>
                      <td>{new Date(booking.date).toLocaleDateString('nl-NL')}</td>
                      <td>{booking.time}</td>
                      <td><span className="guests-badge">{booking.guests}</span></td>
                      <td className="wishes-cell">{booking.specialWishes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
