import { useRef } from 'react'
import './App.css'
import { MainPage } from './components/pages/MainPage'
import { AboutUs } from './components/pages/AboutUsPage'
import { AdvantagesPage } from './components/pages/AdvantagesPage'
import { OurUnitsPage } from './components/pages/OurUnitsPage'
import { OnSiteFacilities } from './components/pages/OnSiteFacilities'
import { Footer } from './components/pages/Footer'
import { WhatsUpIcon } from './components/elements/WhatsUpIcon'

function App() {
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const unitsRef = useRef<HTMLDivElement | null>(null)
  const facilitiesRef = useRef<HTMLDivElement | null>(null)
  const locationRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <MainPage refs={{ aboutRef, unitsRef, facilitiesRef, locationRef }} />

      <div ref={aboutRef}><AboutUs /></div>
      <div ref={unitsRef}><OurUnitsPage /></div>
      <div ref={facilitiesRef}><OnSiteFacilities /></div>
      <AdvantagesPage />
      <div ref={locationRef}><Footer /></div>
      <WhatsUpIcon />
    </>
  )
}

export default App
