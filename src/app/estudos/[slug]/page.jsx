import studies from "../../../data/estudos.json";
import Link from "next/link";

export async function generateStaticParams() {
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }) {
  const study = studies.find((s) => s.slug === params.slug);
  return {
    title: `${study?.title || "Estudo"} | Tudo Por Ele`,
    description: study?.excerpt || "Estudo teológico reformado",
  };
}

export default function StudyPage({ params }) {
  const study = studies.find((s) => s.slug === params.slug);

  if (!study) {
    return (
      <div className="text-center text-gray-600 mt-20">
        <h1 className="text-2xl font-semibold mb-4">Estudo não encontrado</h1>
        <Link href="/estudos" className="text-[#0f1724] underline">
          Voltar para lista de estudos
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-[#0f1724] mb-2">{study.title}</h1>
      <p className="text-sm text-[#8aa2b8] mb-6">{study.date}</p>

      {/* conteúdo HTML do estudo */}
      <div
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: study.content }}
      />

      <div className="mt-10 text-center">
        <Link
          href="/estudos"
          className="inline-block bg-[#0f1724] text-white px-4 py-2 rounded"
        >
          ← Voltar para estudos
        </Link>
      </div>
    </article>
  );
}
