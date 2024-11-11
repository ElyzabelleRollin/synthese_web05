"use server";
import { revalidatePath } from "next/navigation"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

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

// export const signUpNewUser = async (formData) =>{
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signUp({
//     email: formData.get('email'),
//     password: formData.get('password'),
//     options: {
//       emailRedirectTo: '/',
//     },
//   })
// }

// export const signInWithEmail= async() =>{
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: 'example@email.com',
//     password: 'example-password',
//   })
// }

export const logout = async () =>{
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  redirect("auth/login")
}

