import { NextResponse } from "next/server";

export function middleware(req) {
  const basicAuth = req.headers.get("authorization");

  // 🔐 Usuário e senha fixos (pode alterar)
  const username = "admin";
  const password = "tudoporele123";

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === username && pwd === password) {
      return NextResponse.next();
    }
  }

  return new Response("Acesso restrito — autenticação necessária.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Acesso Restrito"',
    },
  });
}

// 🔧 Protege apenas as rotas de /admin
export const config = {
  matcher: ["/admin/:path*"],
};
