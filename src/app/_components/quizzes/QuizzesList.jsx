"use client";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const QuizzesList = ({ quizzes }) => {
  const [items, setItems] = useState(quizzes.slice(0, 20)); // Show the first 20 items
  const [hasMore, setHasMore] = useState(quizzes.length > 20); // Check if there are more items

  // Function to fetch more items:
  const fetchMoreData = () => {
    if (items.length >= quizzes.length) {
      setHasMore(false);
      return;
    }
    // Simulate fetching more data:
    setTimeout(() => {
      const newItems = quizzes.slice(items.length, items.length + 20);
      setItems((prevItems) => [...prevItems, ...newItems]);
    }, 500);
  };

  return (
    <InfiniteScroll
      className={styles.list}
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={400} //Height of the container
      endMessage={<p>Yay! You have seen it all</p>}
    >
      {items.map((quiz) => (
        <Quizcard key={quiz.id} quiz={quiz} />
      ))}
    </InfiniteScroll>
  );
};

export default QuizzesList;
