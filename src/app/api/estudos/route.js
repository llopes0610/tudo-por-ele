import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "estudos.json");
    let json = "[]";
    try {
      json = await fs.readFile(filePath, "utf8");
    } catch {
      // se não existir, devolve array vazio
      json = "[]";
    }
    const data = json ? JSON.parse(json) : [];
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify([]), { status: 200 });
  }
}
