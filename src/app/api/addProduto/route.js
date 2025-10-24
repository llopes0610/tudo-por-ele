import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), "src/data/estudos.json");

    // Lê o arquivo atual
    const fileContent = await fs.readFile(filePath, "utf8");
    const estudos = fileContent ? JSON.parse(fileContent) : [];

    // Impede duplicidade de slug
    if (estudos.some((e) => e.slug === data.slug)) {
      return new Response(
        JSON.stringify({ error: "Slug já existente." }),
        { status: 400 }
      );
    }

    // Adiciona novo estudo
    const novoEstudo = {
      slug: data.slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      content: data.content,
      video: data.video || null,
    };

    estudos.unshift(novoEstudo);

    // Salva o novo JSON formatado
    await fs.writeFile(filePath, JSON.stringify(estudos, null, 2), "utf8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro ao salvar estudo:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao salvar o estudo." }),
      { status: 500 }
    );
  }
}
