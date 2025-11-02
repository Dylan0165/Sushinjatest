import './App.css'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import { useState } from 'react'

function App() {
  const [bookings, setBookings] = useState([])

  const handleNewBooking = (bookingData) => {
    setBookings([...bookings, { ...bookingData, id: Date.now() }])
  }

  return (
    <div className="app">
      <Topbar />
      <Hero />
      <Menu />
      <Reservation onSubmit={handleNewBooking} />
      <Footer />
    </div>
  )
}

export default App
