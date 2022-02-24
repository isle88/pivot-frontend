import {
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  Button,
} from "@mui/material";
import { useState } from "react";

export const Form = (props) => {
  const [isQuestion, setIsQuestion] = useState("true"); // fetch data
  const [countAnswers, setCountAnswers] = useState(4); // fetch data
  const [correctAnswer, setCorrectAnswer] = useState("A"); // fetch data
  const options = ["A", "B", "C", "D", "E", "F"]; // fetch data
  const answerList = [];
  const [resultText, setResultText] = useState("");
  const [result, setResult] = useState("false");
  const [userAnswer, setUserAnswer] = useState("");
  const username = sessionStorage.getItem('username')

  for (let i = 0; i <= countAnswers - 1; i++) {
    answerList.push(options[i]);
  }

  const handleAnswer = (event) => {
    setUserAnswer(event.target.value);
    setResultText(" ");
    setResult("true");
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("answer", userAnswer);
    if (userAnswer === correctAnswer) {
      setResultText("You are correct!");
      setResult("true");
    } else if (userAnswer !== correctAnswer) {
      setResultText("Are you sure?");
      setResult("false");
    } else {
      setResultText("Please select answer");
      setResult("false");
    }
  };

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

  // console.log(username)
  // console.log(sessionStorage.getItem("answer", "<<<<"));

  return (
    <>
      {isQuestion === "true" ? (
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
        <p>is Loading</p>
      )}
    </>
  );
};
