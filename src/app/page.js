import { createClient } from "@/app/_lib/supabase/client";
import Hero from '@/app/_components/hero/hero'
import Trending from '@/app/_components/trending/trending'
import Fiftyfifty from '@/app/_components/fiftyfifty/fiftyfifty'
import Footer from '@/app/_components/footer/footer'

const PplPlaying = 'https://utfs.io/f/OJp1c0WpBPn0FfnZwESH5YGUtgvi7IWM04zfRQJdLr2xB8PD'
const Challenge = 'https://utfs.io/f/OJp1c0WpBPn0QJVmhpk1UkCKOYR02ei3XZuNjc4W9bgSf7Th'

export default function Home() {


  return (
    <div className="homepage">
      <Hero/>
      <Trending/>
      <Fiftyfifty type="left" title={"Create, Play, and Learn"} text={"Whether you're a teacher designing lessons, a student reviewing for exams, or a group of friends looking for entertainment, our platform has everything you need to create and enjoy custom quizzes."} img={PplPlaying}/>
      <Fiftyfifty type="right" title={"Challenge Your Knowledge"} text={"Dive into fun, interactive quizzes that bring families, friends, and classrooms together. Test your skills, learn something new, and rise to the top of the leaderboard!"} img={Challenge} />
      <Footer/>
    </div>
  );
}
