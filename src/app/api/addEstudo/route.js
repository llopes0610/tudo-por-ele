import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  const data = await req.json();
  const dataDir = path.join(process.cwd(), "src", "data");
  const filePath = path.join(dataDir, "estudos.json");

  try {
    // Garante a pasta
    await fs.mkdir(dataDir, { recursive: true });

    // Lê o arquivo se existir
    let estudos = [];
    try {
      const file = await fs.readFile(filePath, "utf8");
      estudos = JSON.parse(file);
    } catch {
      estudos = [];
    }

    // Cria slug automático
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    // Novo estudo
    const novoEstudo = {
      id: Date.now(),
      slug,
      date: new Date().toISOString().split("T")[0],
      ...data,
    };

    estudos.push(novoEstudo);

    await fs.writeFile(filePath, JSON.stringify(estudos, null, 2), "utf8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro ao salvar estudo:", error);
    return new Response(JSON.stringify({ error: "Erro ao salvar estudo" }), {
      status: 500,
    });
  }
}
