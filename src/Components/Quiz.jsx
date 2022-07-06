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
  const [status, setStatus] = useState(true);

  // manage new questions and next question
  function getData() {
    setStatus(true);
    if (count < 10) {
      fetch("https://the-trivia-api.com/api/questions?limit=1")
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data);
          setCount(count + 1);
        });
      setTimeout(quizTimer, 10000);
    } else {
      alert("Quiz Finished ! Check your Score");
    }
  }
  // showing question for first time
  useEffect(() => {
    getData();
  }, []);

  // timer for timeout after 10 seconds
  const quizTimer = () => {
    alert("Time out for this question ");
    setStatus(false);
  };

  // function for setting value to correct or incorrect and attempted question
  function checkAnswer(answer, selected) {
    clearTimeout(quizTimer);
    if (!attempted.includes(selected)) {
      if (selected === answer.correctAnswer) {
        setCorrect(correct + 1);
        alert("Your Answer was correct");
        setattempted([...attempted, selected]);
        getData();
      } else {
        setinCorrect(incorrect + 1);
        alert("Your Answer was Incorrect");
        setattempted([...attempted, selected]);
        getData();
      }
    } else {
      alert("Already Answered");
    }
  }
  // Timer Part
  // let decby = 1;
  // var questionTimer = setInterval(function () {
  //   if (time <= 1) {
  //     clearInterval(questionTimer);
  //   }
  //   setTime(10 - decby);
  //   decby = decby + 1;
  // }, 1000);
  // return part
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
                  {/* <span>Options:</span> */}

                  <br />
                  {status ? "" : <h5>Correct Answer is :</h5>}

                  <h4
                    onClick={(answer, selected) =>
                      checkAnswer(item, item.correctAnswer)
                    }
                  >
                    {item.correctAnswer}
                  </h4>
                  {status
                    ? item.incorrectAnswers.map((incitem, i) => (
                        <h4
                          key={i}
                          onClick={(answer, selected) =>
                            checkAnswer(item, incitem)
                          }
                        >
                          {incitem}
                        </h4>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Result attempted={attempted} correct={correct} incorrect={incorrect} />
      </div>
      <button className="nxt-btn" onClick={getData}>
        Next Question
      </button>
    </div>
  );
}
