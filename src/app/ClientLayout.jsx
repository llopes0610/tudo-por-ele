"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Header />
      {/* Mostra o Hero somente na página inicial */}
      {pathname === "/" && <Hero />}
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
