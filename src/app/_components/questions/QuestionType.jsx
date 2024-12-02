"use client";
import { useState } from "react";
import styles from "./QuestionType.module.css";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";

const QuestionType = ({ type, description, action }) => {
  const [clicked, setClicked] = useState();
  return (
    <div className={styles.questiontypecard}>
      <h3 className={styles.title}>{type}</h3>
      <p className={styles.description}>{description}</p>
      {/* <button onClick={() => setClicked(type)}>Add this question</button> */}
      {/* <button className={styles.btn} onClick={action}>Add this type of question</button> */}
      <div className={styles.btn}>
        <Tertiarybutton text="Add this type of question" iconright="ArrowRight" theme="dark" clickaction={action} />
      </div>
    </div>
  );
};

export default QuestionType;
