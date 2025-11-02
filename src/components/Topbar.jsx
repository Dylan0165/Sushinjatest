import './Topbar.css'

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-container">
        <div className="logo">
          <img src="../../../Afbeeldingen/Logo Sushinja.png" alt="Sushinja Logo" className="logo-image" />
          <div className="logo-text">
            <h1>SUSHINJA</h1>
            <span className="logo-subtitle">忍者寿司</span>
          </div>
        </div>
        
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#reserveren">Reserveren</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Topbar


