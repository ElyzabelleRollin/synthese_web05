import { createClient } from "@/app/_lib/supabase/client";
import Hero from '@/app/_components/hero/hero'
import Trending from '@/app/_components/trending/trending'
import Fiftyfifty from '@/app/_components/fiftyfifty/fiftyfifty'
import Footer from '@/app/_components/footer/footer'

export default function Home() {
  const supabase = createClient();

  // console.log(supabase);

  return (
    <div className="homepage">
      <Hero/>
      <Trending/>
      <Fiftyfifty type="left"/>
      <Fiftyfifty type="right"/>
      <Footer/>
    </div>
  );
}
