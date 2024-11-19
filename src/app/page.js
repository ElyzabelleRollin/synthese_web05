import Link from "next/link";
import QuizzesList from "../_components/QuizzesList";
import { createClient } from "./_lib/supabase/server";

export default function Home() {


  return (
    <div className="p-2">
      <h1 className="text-4xl">Home</h1>
      <Link href="/application/quizzes/create">Create your own quizz</Link>
      {/* <QuizzesList /> */}
    </div>
  );
}
