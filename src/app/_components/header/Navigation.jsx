import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import Link from "next/link";
import { logout } from "@/app/_actions/auth";

const Navigation = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile; //User informations

  //If the user is connected:
  if (user) {
    // Get profile information of the user:
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    profile = data;
  }

  return (
    <nav
      style={{
        display: "flex",
        gap: "2em",
        backgroundColor: "gray",
        padding: "2em",
      }}
    >
      <li style={{ listStyle: "none" }}>
        <Link href="/">Home</Link>
      </li>
      <li style={{ listStyle: "none" }}>
        <Link href="/auth/login">Login</Link>
      </li>
      <li style={{ listStyle: "none" }}>
        <Link href="/application/quizzes">Quizzes</Link>
      </li>
      {user && (
        <li style={{ listStyle: "none" }}>
          <Link href={`/application/profiles/${user.id}`}>Profile</Link>
        </li>
      )}
      <form action={logout}>{user && <button>Logout</button>}</form>
      {user && (
        <div className="flex">
          <div style={{ width: "3em", height: "100%" }}>
            <img src={profile.avatar} alt={profile.username} />
          </div>
          {user && <p>{profile.username ? profile.username : profile.email}</p>}
        </div>
      )}
    </nav>
  );
};
export default Navigation;
