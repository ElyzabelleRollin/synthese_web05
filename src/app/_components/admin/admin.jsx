//Imports:
"use client";
import React, { useState } from "react";
import {
  updateUserBanStatus,
  updateQuizBanStatus,
  editQuiz,
  setUserAsAdmin,
} from "@/app/_actions/admin";

const Admin = ({ quizzes, userEmail }) => {
  const [page, setPage] = useState("Ban a user");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [quizNameSuggestions, setQuizNameSuggestions] = useState([]);
  const [inputEmail, setInputEmail] = useState("");
  const [inputQuizName, setInputQuizName] = useState("");

  // Handle email input change and update suggestions
  const handleEmailChange = (value) => {
    setInputEmail(value);
    setEmailSuggestions(
      userEmail
        .map((user) => user.email)
        .filter((email) => email.toLowerCase().includes(value.toLowerCase()))
    );
  };

  // Handle quiz name input change and update suggestions
  const handleQuizNameChange = (value) => {
    setInputQuizName(value);
    setQuizNameSuggestions(
      quizzes
        .map((quiz) => quiz.name)
        .filter((name) => name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  // Render suggestions as dropdown options
  const renderSuggestions = (suggestions, onSelect) => (
    <ul className="suggestion-list">
      {suggestions.map((item, index) => (
        <li
          key={index}
          className="cursor-pointer hover:bg-gray-200 p-2"
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex gap-6">
      <nav>
        <ul>
          <li>
            <button type="button" onClick={() => setPage("Ban a user")}>
              Ban a user
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setPage("Unban a user")}>
              Unban a user
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setPage("Ban a quiz")}>
              Ban a quiz
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setPage("Unban a quiz")}>
              Unban a quiz
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setPage("Edit a quiz")}>
              Edit a quiz
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setPage("Set as admin")}>
              Set as admin
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setPage("Remove as admin")}>
              Remove as admin
            </button>
          </li>
        </ul>
      </nav>
      <div>
        {page === "Ban a user" && (
          <div>
            <h1>Ban a user</h1>
            <form className="flex flex-col" action={updateUserBanStatus}>
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== "" &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <label htmlFor="reason">Reason</label>
              <input type="text" id="reason" name="reason" required />
              <input type="hidden" id="isBanned" name="isBanned" value="true" />
              <button type="submit">Ban</button>
            </form>
          </div>
        )}
        {page === "Unban a user" && (
          <div>
            <h1>Unban a user</h1>
            <form className="flex flex-col" action={updateUserBanStatus}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                required
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== "" &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <input
                type="hidden"
                id="isBanned"
                name="isBanned"
                value="false"
              />
              <button type="submit">Unban</button>
            </form>
          </div>
        )}
        {page === "Ban a quiz" && (
          <div>
            <h1>Ban a quiz</h1>
            <form className="flex flex-col" action={updateQuizBanStatus}>
              <label htmlFor="quizName">Quiz name</label>
              <input
                type="text"
                id="quizName"
                name="quizName"
                value={inputQuizName}
                required
                onChange={(e) => handleQuizNameChange(e.target.value)}
              />
              {quizNameSuggestions.length > 0 &&
                inputQuizName !== "" &&
                renderSuggestions(quizNameSuggestions, setInputQuizName)}
              <label htmlFor="reason">Reason</label>
              <input type="hidden" id="isBanned" name="isBanned" value="true" />
              <input type="text" id="reason" name="reason" required />
              <button type="submit">Ban</button>
            </form>
          </div>
        )}
        {page === "Unban a quiz" && (
          <div>
            <h1>Unban a quiz</h1>
            <form className="flex flex-col" action={updateQuizBanStatus}>
              <label htmlFor="quizName">Quiz name</label>
              <input
                type="text"
                id="quizName"
                name="quizName"
                value={inputQuizName}
                required
                onChange={(e) => handleQuizNameChange(e.target.value)}
              />
              {quizNameSuggestions.length > 0 &&
                inputQuizName !== "" &&
                renderSuggestions(quizNameSuggestions, setInputQuizName)}
              <input
                type="hidden"
                id="isBanned"
                name="isBanned"
                value="false"
              />
              <button type="submit">Unban</button>
            </form>
          </div>
        )}

        {page === "Edit a quiz" && (
          <div>
            <h1>Edit a quiz</h1>
            <form className="flex flex-col" action={editQuiz}>
              <label htmlFor="quizName">Quiz name</label>
              <input
                type="text"
                id="quizName"
                name="quizName"
                value={inputQuizName}
                onChange={(e) => handleQuizNameChange(e.target.value)}
              />
              {quizNameSuggestions.length > 0 &&
                inputQuizName !== "" &&
                renderSuggestions(quizNameSuggestions, setInputQuizName)}
              <button type="submit">Edit</button>
            </form>
          </div>
        )}
        {page === "Set as admin" && (
          <div>
            <h1>Set as admin</h1>
            <form className="flex flex-col" action={setUserAsAdmin}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== "" &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <input type="hidden" id="isAdmin" name="isAdmin" value="true" />
              <button type="submit">Set as admin!</button>
            </form>
          </div>
        )}
        {page === "Remove as admin" && (
          <div>
            <h1>Remove as admin</h1>
            <form className="flex flex-col" action={setUserAsAdmin}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== "" &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <input type="hidden" id="isAdmin" name="isAdmin" value="false" />
              <button type="submit">Remove as admin!</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
