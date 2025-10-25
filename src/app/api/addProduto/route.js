import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), "src", "data", "produtos.json");

    // Lê o arquivo atual (ou cria vazio se não existir)
    let produtos = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      produtos = fileContent ? JSON.parse(fileContent) : [];
    } catch {
      produtos = [];
    }

    // Adiciona o novo produto
    const novoProduto = {
      id: Date.now(),
      nome: data.nome,
      imagem: data.imagem,
      link: data.link,
      categoria: data.categoria,
      descricao: data.descricao,
    };

    produtos.push(novoProduto);

    // Salva o arquivo JSON formatado
    await fs.writeFile(filePath, JSON.stringify(produtos, null, 2), "utf8");

    return new Response(
      JSON.stringify({ success: true, produto: novoProduto }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao salvar o produto." }),
      { status: 500 }
    );
  }
}
