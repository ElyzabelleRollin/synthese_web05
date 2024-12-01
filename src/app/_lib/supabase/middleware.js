//Imports:
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user

  let banned = false; //Init banned

  //Check if user is banned:
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("banned, banned_reason")
      .eq("id", user.id)
      .single();

    if (profile.banned) banned = true; //If user is banned, set banned to true
  }

  // If the user is not logged in or banned, redirect to the login page:
  if (
    (!user || banned) && // If the user is not logged in or banned
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/api/uploadthing")
  ) {
    const url = request.nextUrl.clone();

    // Add the `redirectedFrom` parameter if the user is trying to access a specific page:
    if (url.pathname !== "/") {
      url.searchParams.set("redirectedFrom", url.pathname);
    }

    // Redirect to the login page:
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  return supabaseResponse;
}
