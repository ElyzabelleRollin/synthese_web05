"use client";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { fetchQuizzes } from "@/app/_actions/quiz";

const QuizzesList = ({ searchQuery, quizzes}) => {
  const [min, setMin] = useState(20); // Min value for pagination
  const range = 20;
  const [items, setItems] = useState(quizzes); // List of quizzes

  // Function to fetch more items:
  const fetchMoreData = async () => {
    setMin(prevMin => prevMin + range);
    try {
      // Fetch quizzes based on min, max, and search query
      const newItems = await fetchQuizzes(min, (min + range), searchQuery);
      
      // Update state with the newly fetched items
      setItems((prevItems) => [...prevItems, ...newItems]);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  
  return (
    <InfiniteScroll
      className={styles.list}
      dataLength={items.length} // number of items in the list
      next={fetchMoreData} // function to call when more data is needed
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