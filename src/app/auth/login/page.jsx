import { oauthSigninAction } from "../../_actions/auth";
import React from "react";


const LoginPage = async () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4 mt-4">Page d'authentification</h1>
      <form action={oauthSigninAction}>
        <button>Connexion avec Github</button>
      </form>
      <form>
        <input type="email" name="email"/>
        <input type="password" name="password" />
        <button>Connexion avec courriel</button>
      </form>
      <form >
        <button>Créer un compte avec courriel</button>
      </form>
    </div>
  );
};

export default LoginPage;
