"use client";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { fetchQuizzes } from "@/app/_actions/quiz";
import { NB_QUIZ_PAGE } from "@/app/constants/quiz";

const QuizzesList = ({ searchQuery, quizzes }) => {
  const range = NB_QUIZ_PAGE;
  const [min, setMin] = useState(range - 1); // Min value for pagination
  const [items, setItems] = useState(quizzes); // List of quizzes
  const [hasMoreQuizzes, setHasMoreQuizzes] = useState(true); // Define if there are more quizzes to fetch

  // Effect to handle searchQuery change
  useEffect(() => {
    setMin(range);
    setHasMoreQuizzes(true);
    if (searchQuery) {
      // Filter quizzes based on the search query
      const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setItems(filteredQuizzes);
    } else {
      setItems(quizzes); // If no search query, show all quizzes
    }
  }, [searchQuery, quizzes]);

  // Function to fetch new quizzes
  function loadMoreQuizzes() {
    fetchQuizzes(min + 1, min + NB_QUIZ_PAGE, searchQuery)
      .then((newItems) => {
        if (newItems.length < NB_QUIZ_PAGE) setHasMoreQuizzes(false); // No more quizzes
        setItems((prevItems) => [...prevItems, ...newItems]); // Append new quizzes
        setMin((prevMin) => prevMin + NB_QUIZ_PAGE); // Increment pagination range
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error); // Handle fetch error
      });
  }

  return (
    <InfiniteScroll
      className={styles.list}
      dataLength={items.length} // Number of items in the list
      next={loadMoreQuizzes} // Function to call when more data is needed
      hasMore={hasMoreQuizzes} // Check if there are more items to load
      endMessage={<p>Yay! You've seen it all</p>} // End of the list message
    >
      {items.length > 0 ? (
        items.map((quiz) => <Quizcard key={quiz.id} quiz={quiz} />)
      ) : (
        <p>No quizzes found</p> // Adjusted message for when no quizzes match search
      )}
    </InfiniteScroll>
  );
};

export default QuizzesList;
