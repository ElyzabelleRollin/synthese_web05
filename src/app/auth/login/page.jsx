"use client";
import { oauthSigninAction } from "@/app/_actions/auth";
import React from "react";

const LoginPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4 mt-4">Page d'authentification</h1>
      <button
        className="bg-slate-600 p-2 rounded-lg"
        onClick={oauthSigninAction}
      >
        Connexion avec Github
      </button>
    </div>
  );
};

export default LoginPage;
