import React from 'react'
import { createClient } from '../../../_lib/supabase/server';
import Link from 'next/link';
import FormModifyUsername from '@/_components/FormModifyUsername';

const Profile = async ({params}) => {
    const { userId } = await params; //Get the userId from the URL
    const superbase = await createClient(); //Access to the database
  
    //Get profile information of the user:
    const { data: user } = await superbase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
  
    return (
      <div className="p-4 w-3/4 mx-auto">
        <div className="flex gap-10 mt-4 mb-4">
          <div>
          <img
            src={user.avatar ? user.avatar : "/placeholder.jpg"}
            alt={user.username}
            style={{ width: "300px", height: "auto" }}
          />
          <Link href="/application/upload">Change profile picture</Link>
          </div>
          <div>
            <h1 className="text-4xl mb-4">{user.username}</h1>
           <FormModifyUsername/>
            <p>Member since: {user.created_at.split("T")[0]}</p>
          </div>
        </div>
      </div>
    );  
}

export default Profile