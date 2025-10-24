import estudos from "@/data/estudos.json";
import EstudoClient from "./EstudoClient";

export async function generateMetadata({ params }) {
  const estudo = estudos.find((e) => e.slug === params.slug);

  if (!estudo) {
    return {
      title: "Estudo não encontrado | Tudo Por Ele",
      description: "Explore estudos reformados sobre a fé e as Escrituras.",
    };
  }

  const title = `${estudo.title} | Tudo Por Ele`;
  const description =
    estudo.summary ||
    "Estudo teológico reformado — uma análise bíblica sólida e centrada em Cristo.";

  // Miniatura automática
  let image = "/logo-brasao.png";
  if (estudo.video && estudo.video.includes("youtube.com/watch?v=")) {
    const match = estudo.video.match(/v=([^&]+)/);
    if (match && match[1]) {
      image = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
  } else if (estudo.image) {
    image = estudo.image;
  }

  const url = `https://tudoporele.com.br/estudos/${estudo.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Tudo Por Ele",
      images: [{ url: image, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function Page({ params }) {
  const estudo = estudos.find((e) => e.slug === params.slug);
  return <EstudoClient estudo={estudo} />;
}
