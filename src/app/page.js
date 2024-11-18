import QuizzesList from "../_components/QuizzesList";
import { createClient } from "./_lib/supabase/server";

export default function Home() {


  return (
    <div className="p-2">
      <h1 className="text-4xl">Home</h1>
      <QuizzesList />
    </div>
  );
}
