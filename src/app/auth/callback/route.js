import { createClient } from "../../_lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  // le code est récupéré parmi les paramètres
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  console.log("[REQUEST URL]" + requestUrl);
  console.log("[CODE]" + code);

  if (code) {
    // supabase se charge d'échange le code "contre une session"
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // l'utilisateur est redirigé vers la page d'accueil du site
  return NextResponse.redirect(requestUrl.origin);
}
