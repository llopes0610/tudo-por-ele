import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Tudo Por Ele",
  description:
    "Estudo, fé e razão à luz das Escrituras — Teologia Reformada para os nossos dias.",
  openGraph: {
    title: "Tudo Por Ele",
    description:
      "Teologia reformada, estudos bíblicos e apologética — fé e razão à luz das Escrituras.",
    url: "https://tudoporele.com.br",
    siteName: "Tudo Por Ele",
    images: [
      {
        url: "/logo-brasao.png",
        width: 800,
        height: 600,
        alt: "Tudo Por Ele — Teologia Reformada",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* SEO / Google Search Console (substitua se tiver código de verificação) */}
        <meta
          name="google-site-verification"
          content="abc123xyz456..."
        />
      </head>

      <body className="bg-[#e9edf2] text-gray-900 min-h-screen flex flex-col">
        {/* ✅ Cabeçalho global */}
        <Header />

        {/* ✅ Conteúdo principal */}
        <main className="flex-grow">{children}</main>

        {/* ✅ Rodapé fixo */}
        <Footer />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Z5PXG0MF8J"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z5PXG0MF8J');
          `}
        </Script>
      </body>
    </html>
  );
}
