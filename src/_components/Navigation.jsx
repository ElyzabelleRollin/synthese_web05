import React from 'react'
import { createClient } from '../app/_lib/supabase/server';
import Link from 'next/link';

const Navigation = async () => {
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
  return (
    <nav className='flex gap-3'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/auth/login">Login</Link></li>
        <li><Link href={`/application/profiles/${user.id}`}>Profile</Link></li>
    </nav>
  )

}

export default Navigation