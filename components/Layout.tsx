"use client"

import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import ChatInterface from './ChatInterface'
import VisualizationPanel from './VisualizationPanel'
import Footer from './Footer'
import GLOBE from 'vanta/dist/vanta.globe.min'
import * as THREE from 'three'

export default function Layout() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00ffff,
          color2: 0x0000ff,
          size: 1.50,
          backgroundColor: 0x0a0a0a
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div ref={vantaRef} className="h-screen bg-[#0a0a0a] text-[#00ffff] flex flex-col relative overflow-hidden" style={{fontFamily: '"Orbitron", sans-serif'}}>
      <div className="cyberpunk-border absolute inset-0 z-0"></div>
      <div className="relative z-10 flex flex-col h-full p-4" style={{backgroundColor: "#000000a1"}}>
        <Header />
        <main className="flex-1 flex space-x-4 overflow-hidden">
          <Sidebar />
          <ChatInterface />
          <VisualizationPanel />
        </main>
        <Footer />
      </div>
    </div>
  )
}