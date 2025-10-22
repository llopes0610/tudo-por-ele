import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Tudo Por Ele",
  description:
    "Estudo, fé e razão à luz das Escrituras — Teologia Reformada para os nossos dias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-[var(--brand-secondary)] text-[#0f1724]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
