import React from "react";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/server";
import FormModifyUsername from "@/_components/FormModifyUsername";
import DisplayQuizzes from "@/_components/DisplayQuizzes";
import DisplayCreatedQuizzes from "@/_components/DisplayCreatedQuizzes";

const Profile = async ({ params }) => {
  const { userId } = await params; //Get the userId from the URL
  const superbase = createClient(); //Access to the database

  //Get profile information of the user:
  const { data: user } = await superbase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const { data: quizzes } = await superbase
    .from("quizzes")
    .select("*")
    .eq("created_by", userId);

  // console.log(quizzes);

  const { data: playedQuizzes } = await superbase
    .from("results")
    .select("*, quizzes(*)")
    .eq("user_id", userId);

  // console.log(playedQuizzes);

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
          <FormModifyUsername />
          <p>Member since: {user.created_at.split("T")[0]}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Quizzes created</h2>
        <DisplayCreatedQuizzes quizzes={quizzes} />
      </div>
      <div>
        <h2 className="text-2xl mb-4">Quizzes played</h2>
        <DisplayQuizzes quizzes={playedQuizzes} />
      </div>
    </div>
  );
};

export default Profile;
