import EstudosList from "../../components/EstudosList";

export const metadata = {
  title: "Estudos | Tudo Por Ele",
  description: "Lista de estudos teológicos reformados",
};

export default function EstudosPage() {
  return (
    <section>
      <h1 className="text-3xl text-center text-[#0f1724] mb-8">
        Estudos Teológicos
      </h1>
      <EstudosList />
    </section>
  );
}
