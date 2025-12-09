import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useRef, useState } from 'react'
import './App.css'
import { MainPage } from './components/pages/MainPage'
import { AboutUs } from './components/pages/AboutUsPage'
import { AdvantagesPage } from './components/pages/AdvantagesPage'
import { OurUnitsPage } from './components/pages/OurUnitsPage'
import { OnSiteFacilities } from './components/pages/OnSiteFacilities'
import { Footer } from './components/pages/Footer'
import { WhatsAppIcon } from './components/elements/WhatsAppIcon'
import { UnitsCatalogue } from './components/pages/UnitsCatalogue'
import { ResponsiveNavigation } from './components/elements/ResponsiveNavigation'

function App() {
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const unitsRef = useRef<HTMLDivElement | null>(null)
  const facilitiesRef = useRef<HTMLDivElement | null>(null)
  const locationRef = useRef<HTMLDivElement | null>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <Router>
      <Routes>

        <Route
          path='/'
          element={
            <>
              <MainPage
                refs={{ aboutRef, unitsRef, facilitiesRef, locationRef }}
                toggleMenu={toggleMenu}
                isMenuOpen={isMenuOpen}
              />
              <div ref={aboutRef}><AboutUs /></div>
              <AdvantagesPage />
              <div ref={unitsRef}><OurUnitsPage /></div>
              <div ref={facilitiesRef}><OnSiteFacilities /></div>
              <div ref={locationRef}><Footer /></div>
              <WhatsAppIcon />
              <ResponsiveNavigation
                refs={{ aboutRef, unitsRef, facilitiesRef, locationRef }}
                closeMenu={toggleMenu}
                isMenuOpen={isMenuOpen}
              />            </>
          }
        />

        <Route
          path='/units'
          element={<UnitsCatalogue unitsRef={unitsRef} />}
        />

      </Routes>
    </Router>
  )
}

export default App