import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Slug não informado." }),
        { status: 400 }
      );
    }

    // Caminho do arquivo JSON
    const filePath = path.join(process.cwd(), "src", "data", "estudos.json");
    const data = await fs.readFile(filePath, "utf8");
    const estudos = JSON.parse(data || "[]");

    // Remove o estudo correspondente ao slug
    const atualizados = estudos.filter((e) => e.slug !== slug);

    // Salva o novo conteúdo
    await fs.writeFile(filePath, JSON.stringify(atualizados, null, 2), "utf8");

    return new Response(
      JSON.stringify({ success: true, message: "Estudo removido com sucesso!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao remover estudo:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao remover estudo." }),
      { status: 500 }
    );
  }
}
