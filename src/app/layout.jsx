import "./globals.css";
import Script from "next/script";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Tudo Por Ele",
  description: "Estudo, fé e razão à luz das Escrituras — Teologia Reformada para os nossos dias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}

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