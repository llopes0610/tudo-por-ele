// components/Header.jsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-[#0f1724] text-white sticky top-0 z-50 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-bold text-xl tracking-wide">TUDO POR ELE</Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/">Início</Link>
          <Link href="/estudos">Estudos</Link>
          <Link href="/videos">Vídeos</Link>
          <Link href="/proposito">Propósito</Link>
        </nav>

        <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Abrir menu">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0f1724]/95 px-4 pb-4">
          <Link href="/" className="block py-2">Início</Link>
          <Link href="/estudos" className="block py-2">Estudos</Link>
          <Link href="/videos" className="block py-2">Vídeos</Link>
          <Link href="/proposito" className="block py-2">Propósito</Link>
        </div>
      )}
    </header>
  )
}
