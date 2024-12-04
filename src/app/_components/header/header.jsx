import React from "react";
import styles from "./header.module.css";
import { logout } from "../../_actions/auth";
import { createClient } from "@/app/_lib/supabase/server";
import Primarybutton from "../primarybutton/primarybutton";
import Secondarybutton from "../secondarybutton/secondarybutton";
import Link from "next/link";

const header = async () => {
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
    <div className={styles.header}>
      <Link href="/" className={styles.logo}>
        <img src="https://utfs.io/f/7ixYXIUQkVedUo8zBoZYmcDdAI86bMeKsjlPa0RLOGXuotWf" alt="hoothoot logo" className={styles.logo} />
      </Link>
      <nav className={styles.nav}>
        <li className={styles.item}>
          {!user && <Secondarybutton text="Login" iconright="Login" theme="dark" link={"/auth/login"} />}
        </li>
        <li className={styles.item}>
          {user && (
            <form action={logout}>
              {user && <Secondarybutton text="Logout" iconright="Logout" theme="dark" />}
            </form>
          )}
        </li>
        <li className={styles.item}>
          <Secondarybutton
            text="Find a quiz"
            iconright="ArrowRight"
            theme="dark"
            link={"/application/quizzes"}
          />
        </li>

        {/* Only users with 1000 xp or more can see the create quiz button */}
        <li className={styles.item}>
          {profile && profile.xp >= 1000 ? (
            <Primarybutton
              text="Create a quiz"
              iconright="ArrowRight"
              theme="dark"
              link={"/application/quizzes/create"}
            />
          ) : null}
        </li>

        <li className={styles.item}>
          {user && (
            <Link href={`/application/profiles/${user.id}`} className={styles.avatar}>
              <img src={profile.avatar} alt={profile.username} className={styles.img} />
            </Link>
          )}
        </li>
      </nav>
    </div>
  );
};

export default header;
