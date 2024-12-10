//Imports:
import { createClient } from "../../_lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);

  // Get the "code" and "redirectedFrom" parameters
  const code = requestUrl.searchParams.get("code");
  const redirectedFrom = requestUrl.searchParams.get("redirectedFrom");

  if (code) {
    // Exchange the code for a session
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to the original page or default to the homepage
  const redirectUrl = redirectedFrom
    ? new URL(redirectedFrom, requestUrl.origin).toString()
    : requestUrl.origin;

  console.log("[FINAL REDIRECT URL]", redirectUrl);
  return NextResponse.redirect(redirectUrl);
}
