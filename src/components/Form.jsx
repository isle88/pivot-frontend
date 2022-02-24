import {
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  Button,
} from "@mui/material";
import { useEffect } from 'react';
import { useState } from "react";

export const Form = (props) => {
  //  const [countAnswers, setCountAnswers] = useState(4) fetch data
  // const [correctAnswer, setCorrectAnswer] = useState("A"); // fetch data
  // const options = ["A", "B", "C", "D", "E", "F"]; // fetch data
  // const [isQuestion, setIsQuestion] = useState("true"); // fetch data

 const presentation = {
    presentationid: "id-here", //
    slideid: "random-page", //
    correctAnswer: "A",
    poolDuration: 30000, //
    answer: ["A", "B", "C", "D"],
    isActive: "true",
  };
  
  const answerList = [];
  // const [presentation, setPresentation] = useState({})
  
  const countAnswers = presentation.answer.length;
  const [isActive, setIsActive] = useState('true');
  const [resultText, setResultText] = useState("");
  const [result, setResult] = useState("false");
  const [userAnswer, setUserAnswer] = useState("");
  const username = sessionStorage.getItem("username");
  
  useEffect(() => {
    setTimeout(() => setIsActive('false'), presentation.poolDuration)
  },[setIsActive])


  if(answerList.length === 0) {
    for (let i = 0; i <= countAnswers - 1; i++) {
        answerList.push(presentation.answer[i]);
    }
  }

  const answerForm = answerList.map((list) => {
    return (
      <FormControlLabel
        key={list}
        value={list}
        control={<Radio />}
        label={list}
      />
    );
  });

  const handleAnswer = (event) => {
    setUserAnswer(event.target.value);
    setResultText(" ");
    setResult("true");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const answer = sessionStorage.setItem("answer", userAnswer);
    if (userAnswer === presentation.correctAnswer) {
      setResultText("You are correct!");
      setResult("true");
    } else if (userAnswer !== presentation.correctAnswer) {
      setResultText("Are you sure?");
      setResult("false");
    } else {
      setResultText("Please select answer");
      setResult("false");
    }
  };


  console.log(username)
  console.log(sessionStorage.getItem("answer", "<<<<"));

  return (
    <>
      {isActive === "true" ? (
        <>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} result={result} variant="standard">
              <FormLabel id="demo-error-radios">
                Please choose answer.
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                useranswer={userAnswer}
                onChange={handleAnswer}
              >
                {answerForm}
              </RadioGroup>

              <FormHelperText>{resultText}</FormHelperText>
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                Check Answer
              </Button>
            </FormControl>
          </form>
        </>
      ) : (
        <p>Question time is coming soon ...</p>
      )}
    </>
  );
};
