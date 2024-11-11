import { createClient } from "./_lib/supabase/server";

export default function Home() {
  const supabase = createClient();

  // console.log(supabase);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
