import { promises as fs } from "fs";
import path from "path";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { originalSlug, slug, title, date, excerpt, category, content, video } = body;

    const filePath = path.join(process.cwd(), "src", "data", "estudos.json");
    const raw = await fs.readFile(filePath, "utf8").catch(() => "[]");
    const arr = raw ? JSON.parse(raw) : [];

    const idx = arr.findIndex((e) => e.slug === originalSlug);
    if (idx === -1) {
      return new Response(JSON.stringify({ error: "Estudo não encontrado." }), {
        status: 404,
      });
    }

    // se mudou o slug, checar duplicidade
    if (originalSlug !== slug && arr.some((e) => e.slug === slug)) {
      return new Response(JSON.stringify({ error: "Slug já existente." }), {
        status: 400,
      });
    }

    arr[idx] = {
      ...arr[idx],
      slug,
      title,
      date: date ?? arr[idx].date,
      excerpt: excerpt ?? arr[idx].excerpt,
      category: category ?? arr[idx].category,
      content: content ?? arr[idx].content,
      video: video ?? arr[idx].video,
    };

    await fs.writeFile(filePath, JSON.stringify(arr, null, 2), "utf8");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    console.error("updateEstudo error:", e);
    return new Response(JSON.stringify({ error: "Erro ao atualizar o estudo." }), {
      status: 500,
    });
  }
}
