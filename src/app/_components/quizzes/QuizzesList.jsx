//Imports:
import { createClient } from "@/app/_lib/supabase/server";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";

//Shows every quiz unless it's banned:
const QuizzesList = async ({ children, quizzes, amount }) => {
  return (
    <InfiniteScroll
      className={styles.list}
      dataLength={items.length} // number of items in the list
      next={loadThings} // function to call when more data is needed
      hasMore={hasMoreQuizzes}
      loader={<h4>Loading...</h4>} // Loading spinner or message
      height={400} // Height of the scrollable area
      
      endMessage={<p>Yay! You have seen it all</p>} // End of the list message
    >
    {items.length > 0 ? (
  items.map((quiz) => (
    <Quizcard key={quiz.id} quiz={quiz} />
  ))
) : (
  <p>No quizzes created yet</p>
)}
    </InfiniteScroll>
  );
};
export default QuizzesList;
