"use client"
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-4 animate-fade-in">
      <div className="text-2xl font-bold">PDFb</div>
      <div className="relative flex-1 max-w-2xl mx-4">
        <Input
          type="text"
          placeholder="Pesquisar PDFs..."
          className="w-full bg-[rgba(26,26,26,0.7)] border border-[rgba(0,255,255,0.5)] px-4 py-2 focus:outline-none focus:border-[#00cccc]"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-[#00ffff]"/>
      </div>
      <nav className="flex space-x-4">
        {['Biblioteca', 'Análises', 'Configurações'].map((item) => (
          <button key={item} className="text-[#00ffff] hover:text-white transition-colors">
            {item}
          </button>
        ))}
      </nav>
    </header>
  )
}