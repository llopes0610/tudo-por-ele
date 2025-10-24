import { promises as fs } from "fs";
import path from "path";

export async function DELETE(req) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug obrigatório." }), {
        status: 400,
      });
    }

    const filePath = path.join(process.cwd(), "src", "data", "estudos.json");
    const raw = await fs.readFile(filePath, "utf8").catch(() => "[]");
    const arr = raw ? JSON.parse(raw) : [];

    const next = arr.filter((e) => e.slug !== slug);
    await fs.writeFile(filePath, JSON.stringify(next, null, 2), "utf8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    console.error("deleteEstudo error:", e);
    return new Response(JSON.stringify({ error: "Erro ao excluir o estudo." }), {
      status: 500,
    });
  }
}
