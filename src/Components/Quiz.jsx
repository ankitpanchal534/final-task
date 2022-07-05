import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Quiz.css";
import Result from "./Result";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setinCorrect] = useState(0);
  const [attempted, setattempted] = useState([]);
  const [time, setTime] = useState(10);
  function getData() {
    fetch("https://the-trivia-api.com/api/questions?limit=1")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setCount(count + 1);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  function checkAnswer(answer, selected) {
    setTime(10);
    if (!attempted.includes(selected)) {
      if (selected === answer.correctAnswer) {
        setCorrect(correct + 1);
        alert("Your Answer was correct");
        setattempted([...attempted, selected]);
      } else {
        setinCorrect(incorrect + 1);
        alert("Your Answer was Incorrect");
        setattempted([...attempted, selected]);
      }
    } else {
      alert("Already Answered");
    }
  }

  const timeoutFunction = setTimeout(() => {
    clearInterval(intervalFunction);
  }, 10000);

  const intervalFunction = setInterval(() => {
    if (time > 0) {
      setTime(time - 1);
    }
  }, 1000);

  return (
    <div>
      <div className="ques-box">
        <div>
          <span>Time : {time} Sec Left</span>
          {questions.map((item, i) => (
            <div key={i}>
              <div>
                <h3>
                  Q.{count} {item.question}
                </h3>
                <div>
                  <span>Options:</span>
                  <br />
                  <h4
                    onClick={(answer, selected) =>
                      checkAnswer(item, item.correctAnswer)
                    }
                  >
                    {item.correctAnswer}
                  </h4>
                  {item.incorrectAnswers.map((incitem, i) => (
                    <h4
                      key={i}
                      onClick={(answer, selected) => checkAnswer(item, incitem)}
                    >
                      {incitem}
                    </h4>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Result attempted={attempted} correct={correct} incorrect={incorrect} />
      </div>
      <button
        className="nxt-btn"
        onClick={count < 10 ? getData : alert("Last Question")}
      >
        Next Question
      </button>
    </div>
  );
}
