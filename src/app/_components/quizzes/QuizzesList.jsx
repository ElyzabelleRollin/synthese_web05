"use client";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { fetchQuizzes } from "@/app/_actions/quiz";
import { NB_QUIZ_PAGE } from "@/app/constants/quiz"


const QuizzesList = ({ searchQuery, quizzes}) => {
  const range = NB_QUIZ_PAGE;
  const [min, setMin] = useState(range); // Min value for pagination
  const [items, setItems] = useState(quizzes); // List of quizzes
  //Define is there's more quizzes to fetch:
  const [hasMoreQuizzes, sethasMoreQuizzes] = useState(true); 

  //Function to fetch new quizzes:
  async function loadThings (){
    //Fetch new quizzes:
    // +1 is used to not fetch the same quiz 2 times
    const newItems = await fetchQuizzes(min + 1, (min + NB_QUIZ_PAGE), searchQuery);
    //There's no more quizzes:
    if(newItems.length < NB_QUIZ_PAGE) sethasMoreQuizzes(false);
    //Insert new quizzes inside the state:
    setItems((prevItems) => [...prevItems, ...newItems]);
    // Increase index:
    setMin(min + NB_QUIZ_PAGE)
  }

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