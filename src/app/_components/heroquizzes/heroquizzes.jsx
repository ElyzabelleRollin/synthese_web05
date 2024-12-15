import React from "react";
import styles from "./heroquizzes.module.css";
import PrimaryButton from "../primarybutton/primarybutton";
import SecondaryButton from "../secondarybutton/secondarybutton";
import { createClient } from "@/app/_lib/supabase/server";

const HeroQuizzes = async () => {
  const supabase = createClient();

  //Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;

  if (user) {
    try {
      // Fetch the XP from the profile of the user
      const { data, error } = await supabase
        .from("profiles")
        .select("xp")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("[FETCH ERROR]", error);
      } else {
        profile = data; // Assign data to profile
      }
    } catch (error) {
      console.log("[FETCH ERROR]", error); // Handle any other errors
    }
  }

  return (
    <section className={styles.heroQuizzes}>
      <img
        src="https://utfs.io/f/OJp1c0WpBPn044zNChP2dNPhVZpEjKqvARmbMJkY57cLWaws"
        alt="hero background"
        className={styles.herobg}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Choose Your Quiz Adventure!</h1>
        <p className={styles.text}>
          Step into the world of fun and learning! Explore a variety of exciting
          quizzes designed to challenge your mind and spark your curiosity.
          Whether you're competing with friends, testing your knowledge, or just
          having a good time, there’s a quiz waiting for everyone. Ready to dive
          in? Let the games begin!
        </p>
        <div className={styles.buttons}>
          {/* Only users with 1000 xp or more can see the create quiz button */}
          {profile && profile.xp >= 1000 ? (
            <PrimaryButton
              text="Create your own quiz!"
              iconright="ArrowRight"
              theme="light"
              link="/application/quizzes/create"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default HeroQuizzes;
