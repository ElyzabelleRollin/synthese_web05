//Imports:
import { createClient } from "@/app/_lib/supabase/server";
import React from "react";
import QuizzesList from "@/app/_components/quizzes/QuizzesList";
import SearchBar from "@/app/_components/searchbar/SearchBar";
import { NB_QUIZ_PAGE } from "@/app/constants/quiz"
import Footer from "@/app/_components/footer/footer";
import styles from "@/app/_components/quizzes/QuizzesPage.module.css";
import Tertiarybutton from "@/app/_components/tertiarybutton/tertiarybutton";
import Hero from "@/app/_components/hero/hero";

//Page to display all quizzes and user's profiles:
const QuizzesPage = async ({ searchParams }) => {
  const supabase = createClient(); //Access supabase
  const searchQuery = searchParams.query || ""; // Retrieve the search query from the URL

  // Fetch quizzes based on the search query in the name column:
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    .ilike("name", `%${searchQuery}%`)
    .range(0, NB_QUIZ_PAGE)

  // Fetch profiles based on the search query in the username column:
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${searchQuery}%`);

  return (
    <div className={styles.quizzespage}>
      <Hero />
      <div className={styles.content}>
        {/* Search bar */}
        <SearchBar searchQuery={searchQuery} />

        {/* Display quizzes based on the search */}
        {quizzes && quizzes.length > 0 ? (
          <QuizzesList quizzes={quizzes} />
        ) : (
          <p>No quizzes found</p>
        )}

        {/* Optionally, you can display profiles based on the search */}
        {profiles && profiles.length > 0 && (
          <div className={styles.profileslistcontainer}>
            <h2 className={styles.sectiontitle}>Profiles</h2>
            <div className={styles.profileslist}>
              {profiles.map((profile) =>
                profile.banned ? null : (
                  <div key={profile.id} className={styles.profilecard}>
                    <img
                      src={profile.avatar}
                      alt="user_avatar"
                      className={styles.avatar}
                    />
                    <div className={styles.profileinfo}>
                      <h3 className={styles.username}>{profile.username}</h3>
                      <Tertiarybutton
                        text="View Profile"
                        theme="dark"
                        link={`/application/profiles/${profile.id}`}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default QuizzesPage;
