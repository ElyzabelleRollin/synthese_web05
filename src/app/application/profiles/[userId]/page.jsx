import React from "react";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/server";
import FormModifyUsername from "@/app/_components/profile/FormModifyUsername";
import styles from "@/app/_components/profile/profile.module.css";
import DisplayQuizzes from "@/app/_components/quizzes/DisplayQuizzes";
import DisplayCreatedQuizzes from "@/app/_components/quizzes/DisplayCreatedQuizzes";

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

  const { data: playedQuizzes } = await superbase
    .from("results")
    .select("*, quizzes(*)")
    .eq("user_id", userId);

  return (
    <div className={styles.profilepage}>
      <div className={styles.profile}>
        <div className={styles.leftpanel}>
          <Link href="/application/upload" className={styles.editavatar}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </Link>
          <img
            src={user.avatar ? user.avatar : "/placeholder.jpg"}
            alt={user.username}
            className={styles.avatar}
          />
          <h1 className={styles.username}>{user.username}</h1>
          <div className={styles.infos}>
            <div className={styles.titles}>
              <p>Member since</p>
              <p>Email</p>
            </div>
            <div className={styles.data}>
              <p>{user.created_at.split("T")[0]}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <div className={styles.rightpanel}>
          <FormModifyUsername />
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
