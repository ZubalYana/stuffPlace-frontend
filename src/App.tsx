import './App.css'
import { MainPage } from './components/pages/MainPage'
import { AboutUs } from './components/pages/AboutUsPage'
import { AdvantagesPage } from './components/pages/AdvantagesPage'
import { OurUnitsPage } from './components/pages/OurUnitsPage'
import { OnSiteFacilities } from './components/pages/OnSiteFacilities'
import { Footer } from './components/pages/Footer'
import { WhatsUpIcon } from './components/elements/WhatsUpIcon'
function App() {

  return (
    <>
      <MainPage />
      <AboutUs />
      <AdvantagesPage />
      <OurUnitsPage />
      <OnSiteFacilities />
      <Footer />
      <WhatsUpIcon />
    </>
  )
}

export default App
