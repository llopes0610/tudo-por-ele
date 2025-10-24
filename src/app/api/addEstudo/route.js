import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), "src", "data", "estudos.json");
    let arr = [];
    try {
      const raw = await fs.readFile(filePath, "utf8");
      arr = raw ? JSON.parse(raw) : [];
    } catch {
      arr = [];
    }

    // não duplicar slug
    if (arr.some((e) => e.slug === body.slug)) {
      return new Response(JSON.stringify({ error: "Slug já existente." }), {
        status: 400,
      });
    }

    const novo = {
      slug: body.slug,
      title: body.title,
      date: body.date ?? new Date().toISOString().split("T")[0],
      excerpt: body.excerpt || "",
      category: body.category || "",
      content: body.content || "",
      video: body.video || null,
    };

    arr.unshift(novo);
    await fs.writeFile(filePath, JSON.stringify(arr, null, 2), "utf8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    console.error("addEstudo error:", e);
    return new Response(JSON.stringify({ error: "Erro ao salvar o estudo." }), {
      status: 500,
    });
  }
}
