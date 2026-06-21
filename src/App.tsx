import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import Calculator from './components/Calculator'
import Gallery from './components/Gallery'
import WhyUs from './components/WhyUs'
import WhatToExpect from './components/WhatToExpect'
import ServiceArea from './components/ServiceArea'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import Cursor from './components/Cursor'
import ServicesPage from './pages/ServicesPage'

function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Cursor />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Calculator />
        <Gallery />
        <WhyUs />
        <WhatToExpect />
        <ServiceArea />
        <Reviews />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!ready && <Preloader onDone={() => setReady(true)} />}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </>
  )
}
