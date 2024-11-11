import { createClient } from "./_lib/supabase/server";

export default function Home() {
  const supabase = createClient();

  return (
    <div className="p-2">
      <h1 className="text-4xl">Home</h1>
    </div>
  );
}
