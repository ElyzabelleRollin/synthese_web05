"use client";
import { useState } from "react";

const QuestionType = ({ type, description, action }) => {
  const [clicked, setClicked] = useState();
  return (
    <div className=" bg-slate-500 p-4 rounded-xl w-1/3">
      <h3>{type}</h3>
      <p>{description}</p>
      {/* <button onClick={() => setClicked(type)}>Add this question</button> */}
      <button onClick={action}>Add this type of question</button>
    </div>
  );
};

export default QuestionType;
