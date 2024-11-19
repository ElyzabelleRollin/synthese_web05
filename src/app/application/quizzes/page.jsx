import { createClient } from "@/app/_lib/supabase/server";
import React from "react";
import Link from "next/link";
import QuizzesList from "@/app/_components/quizzes/QuizzesList";
import SearchBar from "@/app/_components/searchbar/SearchBar";

const QuizzesPage = async ({ searchParams }) => {
  const supabase = createClient();
  const searchQuery = searchParams.query || ""; // Retrieve the search query from the URL

  // Fetch quizzes based on the search query in the name column
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    .ilike("name", `%${searchQuery}%`);

  // Fetch profiles based on the search query in the username column
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${searchQuery}%`);

  return (
    <div>
      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} />

      {/* Display quizzes based on the search */}
      {quizzes && quizzes.length > 0 ? (
          <QuizzesList quizzes={quizzes}/>
      ) : (
        <p>No quizzes found</p>
      )}

      {/* Optionally, you can display profiles based on the search */}
      {profiles && profiles.length > 0 && (
        <div className="mt-4">
          <h2>Profiles</h2>
          <div className="grid grid-cols-3 gap-4">
            {profiles.map((profile) => (
              <div key={profile.id} className="border p-4 bg-slate-400">
                <h3>{profile.username}</h3>
                <p>{profile.bio}</p>
                <Link href={`/profiles/${profile.username}`}>View Profile</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
