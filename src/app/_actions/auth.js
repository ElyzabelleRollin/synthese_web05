"use server";
import { createClient } from "@/app/_lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const oauthSigninAction = async () => {
  const supabase = createClient();

  // afin que l'url du site soit dynamique et facilement migrable vers un hébergeur
  const origin = headers().get("origin");

  // on récupère ici l'url vers lequel envoyer l'utilisateur sur github. il n'est pas encore redirigé
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      // l'utilisateur sera redirigé avec son code à l'url suivant
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.log("[AUTH LOGIN ERROR]", err);
  } else {
    console.log("[SUCCESSFUL]", data.url);
    // on redirige finalement l'utilisateur vers github
    return redirect(data.url);
  }
};