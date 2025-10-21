import VideosGrid from "../../components/VideosGrid";

export const metadata = {
  title: "Vídeos | Tudo Por Ele",
  description: "Vídeos teológicos reformados e estudos em vídeo",
};

export default function VideosPage() {
  return (
    <section>
      <h1 className="text-3xl text-center text-[#0f1724] mb-8">
        Vídeos Teológicos
      </h1>
      <VideosGrid />
    </section>
  );
}
