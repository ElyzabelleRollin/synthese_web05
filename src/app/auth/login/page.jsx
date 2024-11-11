import { oauthSigninAction } from "@/app/_actions/auth";
import React from "react";
import { createClient } from "@/app/_lib/supabase/client";
import AllButton from "@/_components/AllButton"

const LoginPage = async () => {
  const supabase =  await createClient();
  console.log(supabase);
  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4 mt-4">Page d'authentification</h1>
      <AllButton name="Connexion avec Github"  action={oauthSigninAction}/>
    </div>
  );
};

export default LoginPage;
