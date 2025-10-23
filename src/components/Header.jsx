"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Início", href: "/" },
    { name: "Propósito", href: "/proposito" },
    { name: "Estudos", href: "/estudos" },
    { name: "Produtos", href: "/produtos" },
  ];

  return (
    <header className="fixed top-0 w-full bg-[#0f1724]/95 backdrop-blur-sm border-b border-[#1e293b] shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* 🔰 Logo do Brasão */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo-brasao.png"
            alt="Logo Tudo Por Ele"
            width={42}
            height={42}
            className="drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
          />
          <span className="hidden md:block text-lg font-serif font-semibold text-gray-100 tracking-wide">
            TUDO POR ELE
          </span>
        </Link>

        {/* 🌐 Menu Desktop */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-100">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors hover:text-yellow-400 ${
                pathname === link.href ? "text-yellow-400" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 🍔 Botão Hamburguer Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-100 focus:outline-none"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 📱 Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0f1724]/95 backdrop-blur-md border-t border-[#1e293b] shadow-inner"
          >
            <ul className="flex flex-col items-center py-4 space-y-3 text-gray-100 text-base">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2 hover:text-yellow-400 transition-all ${
                      pathname === link.href ? "text-yellow-400" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
