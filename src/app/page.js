import Link from "next/link";
import studies from "../data/estudos.json";

export default function Home() {
  const recent = studies.slice(0, 3);

  return (
    <section>
      <div
        className="h-72 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url('/hero.jpg')` }}
      ></div>

      <h2 className="text-3xl text-center mt-8 text-[#0f1724]">
        Estudos Recentes
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {recent.map((s) => (
          <article key={s.slug} className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="text-sm text-[#8aa2b8]">{s.date}</p>
            <p className="mt-3 text-gray-600">{s.excerpt}</p>
            <Link
              href={`/estudos/${s.slug}`}
              className="inline-block mt-4 bg-[#0f1724] text-white px-4 py-2 rounded"
            >
              Ler Mais
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
