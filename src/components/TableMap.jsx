import './TableMap.css'
import { useState } from 'react'

function TableMap() {
  const [selectedTable, setSelectedTable] = useState(null)
  const [hoveredTable, setHoveredTable] = useState(null)

  const tables = [
    { id: 1, x: 10, y: 10, seats: 2, available: true },
    { id: 2, x: 40, y: 15, seats: 4, available: true },
    { id: 3, x: 70, y: 12, seats: 2, available: false },
    { id: 4, x: 85, y: 20, seats: 6, available: true },
    { id: 5, x: 15, y: 50, seats: 4, available: true },
    { id: 6, x: 50, y: 55, seats: 8, available: true },
    { id: 7, x: 80, y: 60, seats: 4, available: false },
    { id: 8, x: 20, y: 85, seats: 2, available: true },
    { id: 9, x: 55, y: 80, seats: 6, available: true },
    { id: 10, x: 75, y: 90, seats: 4, available: true },
  ]

  return (
    <section className="table-map-section" id="tables">
      <div className="table-map-container">
        <h2 className="section-title">Kies je tafel</h2>
        <p className="section-subtitle">Selecteer een beschikbare tafel op ons interactieve plattegrond</p>

        <div className="table-map-wrapper">
          <div className="restaurant-layout">
            {/* Kitchen area */}
            <div className="kitchen-area">
              <div className="kitchen-text">🍳 Keuken</div>
            </div>

            {/* Tables */}
            <svg className="table-map" viewBox="0 0 100 100">
              {/* Decorative elements */}
              <rect x="0" y="0" width="100" height="100" fill="none" stroke="#e0d5c7" strokeWidth="0.5" />
              
              {/* Render tables */}
              {tables.map(table => (
                <g
                  key={table.id}
                  className={`table-group ${selectedTable?.id === table.id ? 'selected' : ''} ${
                    hoveredTable?.id === table.id ? 'hovered' : ''
                  } ${!table.available ? 'unavailable' : ''}`}
                  onClick={() => table.available && setSelectedTable(table)}
                  onMouseEnter={() => setHoveredTable(table)}
                  onMouseLeave={() => setHoveredTable(null)}
                >
                  <circle
                    cx={table.x}
                    cy={table.y}
                    r="4"
                    className="table-circle"
                  />
                  <text
                    x={table.x}
                    y={table.y + 0.8}
                    textAnchor="middle"
                    className="table-number"
                    fontSize="2"
                  >
                    {table.id}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="table-legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Beschikbaar</span>
            </div>
            <div className="legend-item">
              <div className="legend-color unavailable"></div>
              <span>Niet beschikbaar</span>
            </div>
            <div className="legend-item">
              <div className="legend-color selected"></div>
              <span>Geselecteerd</span>
            </div>
          </div>
        </div>

        {/* Selected table info */}
        {selectedTable && (
          <div className="selected-table-info">
            <h3>Tafel {selectedTable.id} geselecteerd</h3>
            <p>👥 {selectedTable.seats} zitplaatsen</p>
            <p>✓ Deze tafel is beschikbaar</p>
            <p>Vul je gegevens in en bevestig je reservering hierboven.</p>
          </div>
        )}

        {/* Info boxes */}
        <div className="table-info-grid">
          <div className="info-box">
            <div className="info-number">15+</div>
            <p>Gezellige tafels</p>
          </div>
          <div className="info-box">
            <div className="info-number">48</div>
            <p>Zitplaatsen totaal</p>
          </div>
          <div className="info-box">
            <div className="info-number">⭐</div>
            <p>Premium ervaring</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TableMap
