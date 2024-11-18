import React from 'react'
import { createClient } from "@/app/_lib/supabase/server";
import Link from 'next/link';
import { logout } from "@/app/_actions/auth";

const Navigation = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav style={{ display: 'flex', gap: '2em', backgroundColor: 'lightgray', padding: '2em' }}>
      <li style={{ listStyle: "none" }}><Link href="/">Accueil</Link></li>
      <li style={{ listStyle: "none" }}><Link href="/auth/login">Connexion</Link></li>
      {user && <li style={{ listStyle: "none" }}><Link href={`/application/profiles/${user.id}`}>Profil</Link></li>}
      <form action={logout}>
        {user &&

          <button>Déconexion</button>
        }
      </form>
    </nav>
  )
}
export default Navigation