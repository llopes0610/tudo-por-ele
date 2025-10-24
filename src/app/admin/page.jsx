import Link from "next/link";

export default function AdminHome() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-serif font-bold text-[#0f1724] mb-8">
        Painel Administrativo
      </h1>
      <div className="space-x-4">
        <Link
          href="/admin/produto"
          className="px-6 py-3 bg-[#0f1724] text-white rounded-md hover:bg-[#1e293b] transition"
        >
          🛒 Gerenciar Produtos
        </Link>
        <Link
          href="/admin/estudos"
          className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
        >
          📖 Publicar Estudos
        </Link>
      </div>
    </main>
  );
}
