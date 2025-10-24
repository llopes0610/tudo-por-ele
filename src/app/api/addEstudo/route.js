import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), "src/data/estudos.json");
    const body = await req.json();

    // Lê o conteúdo atual do arquivo de estudos
    let estudos = [];
    try {
      const data = await fs.readFile(filePath, "utf8");
      estudos = JSON.parse(data || "[]");
    } catch {
      estudos = [];
    }

    // Cria slug automático
    const slug = body.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const novoEstudo = {
      slug,
      title: body.title || "Sem título",
      category: body.category || "Sem categoria",
      excerpt: body.excerpt || "",
      content: body.content || "",
      creditos: body.creditos || "",
      video: body.video || "",
      date: new Date().toISOString().split("T")[0],
    };

    // Adiciona e salva
    estudos.push(novoEstudo);
    await fs.writeFile(filePath, JSON.stringify(estudos, null, 2), "utf8");

    return new Response(
      JSON.stringify({ success: true, message: "Estudo salvo com sucesso!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao salvar estudo:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
