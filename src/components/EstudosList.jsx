import Link from "next/link";

export default function EstudosList({ estudos }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl text-center mb-8 text-[var(--brand-primary)] font-serif">
        Estudos Recentes
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {estudos.map((e) => (
          <article className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3>{e.titulo}</h3>
            <p className="text-gray-500 text-sm mb-2">{e.data}</p>
            <p>{e.descricao}</p>
            <Link href={`/estudos/${e.slug}`} className="btn">
              Ler Mais
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
