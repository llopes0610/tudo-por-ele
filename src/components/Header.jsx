"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#0f1724] text-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* 🔰 Logo do Brasão */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo-brasao.png"
            alt="Logo Tudo Por Ele"
            className="h-12 w-auto drop-shadow-[0_2px_6px_rgba(255,215,0,0.6)]"
          />
          <span className="hidden md:block text-lg font-serif font-semibold text-gray-100 tracking-wide">
            TUDO POR ELE
          </span>
        </Link>

        {/* 🔗 Navegação */}
        <nav className="space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={`hover:text-yellow-400 transition-colors ${
              pathname === "/" ? "text-yellow-400" : ""
            }`}
          >
            Início
          </Link>
          <Link
            href="/estudos"
            className={`hover:text-yellow-400 transition-colors ${
              pathname === "/estudos" ? "text-yellow-400" : ""
            }`}
          >
            Estudos
          </Link>
          <Link
            href="/videos"
            className={`hover:text-yellow-400 transition-colors ${
              pathname === "/videos" ? "text-yellow-400" : ""
            }`}
          >
            Vídeos
          </Link>
          <Link
            href="/proposito"
            className={`hover:text-yellow-400 transition-colors ${
              pathname === "/proposito" ? "text-yellow-400" : ""
            }`}
          >
            Propósito
          </Link>
           <Link
            href="/produtos"
            className={`hover:text-yellow-400 transition-colors ${
              pathname === "/produtos" ? "text-yellow-400" : ""
            }`}
          >
            Produtos
          </Link>
        </nav>
      </div>
    </header>
  );
}
