"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const oauthSigninAction = async (formData) => {
  const supabase = createClient();

  // Retrieve the optional "redirectedFrom" value from the form data
  const redirectedFrom = formData.get("redirectedFrom");

  console.log("[REDIRECTED FROM]", redirectedFrom);
  console.log(
    `${getURL()}auth/callback` +
      (redirectedFrom ? `?redirectedFrom=${redirectedFrom}` : "")
  );

  // Perform the OAuth sign-in with GitHub
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      // Include "redirectedFrom" in the redirectTo URL if present
      redirectTo:
        `${getURL()}auth/callback` +
        (redirectedFrom ? `?redirectedFrom=${redirectedFrom}` : ""),
    },
  });

  if (error) {
    console.error("[AUTH LOGIN ERROR]", error);
    throw new Error("Authentication failed. Please try again.");
  } else {
    console.log("[SUCCESSFUL]", data.url);
    // Redirect the user to GitHub
    return redirect(data.url);
  }
};

const getURL = () => {
  let url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  url = url.startsWith("http") ? url : `https://${url}`;
  // Ensure trailing slash
  return url.endsWith("/") ? url : `${url}/`;
};

export const logout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("[AUTH LOGOUT ERROR]", error);
    throw new Error("Logout failed. Please try again.");
  }

  return redirect("/auth/login");
};
