//Imports:
import localFont from "next/font/local";
import "./normalize.css";
import "./globals.css";
import Header from "@/app/_components/header/header";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { createClient } from "@/app/_lib/supabase/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Nunito } from "next/font/google";

// Font configurations:
const nunitoSans = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Hoothoot",
  description: "Create and play quizzes",
};

// Function to fetch user and profile data:
async function getUserAndProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user
  if (!user) {
    return { user: null, profile: null }; //If no user, return null
  }

  // Check if user is banned:
  const { data: profile } = await supabase
    .from("profiles")
    .select("banned, banned_reason")
    .eq("id", user.id)
    .single();
  return { user, profile };
}

export default async function RootLayout({ children }) {
  const { user, profile } = await getUserAndProfile();

  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Header />
        {/* Show banner if user is banned */}
        {user && profile?.banned && (
          <div className="bg-slate-400 p-4">
            <p>You are banned from using Hoothoot.</p>
            <p>{profile.banned_reason}</p>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
