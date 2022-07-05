import React from "react";

export default function Result(props) {
  return (
    <div className="ques-box">
      {" "}
      <h2>Result</h2>
      <div>
        <h3> Correct Answer :{props.correct}</h3>
        <h3> Incorrect Answer :{props.incorrect}</h3>
        <h3> Not Attempted :{10 - props.attempted.length}</h3>
        <h2> Average Time {5} Sec</h2>
      </div>
    </div>
  );
}
