import {
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Button,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { fetchPresentation } from "../utils/api";

export const Form = () => {

  const presentation = {
    presentationid: "id-here", //
    slideid: "random-page", //
    correctAnswer: "A",
    poolDuration: 30000, //
    answer: ["A", "B", "C", "D"],
    isActive: "true",
  };

  const socket = useContext(SocketContext);
  const answerList = [];

  const [presentation2, setPresentation2] = useState([]); // get data from api
  const countAnswers = presentation.answer.length;
  const [correctAnswer, setCorrectAnswer] = useState(
    presentation.correctAnswer
  );
  const [isActive, setIsActive] = useState(presentation.isActive);
  const [userAnswer, setUserAnswer] = useState("");
  const [style, setStyle] = useState("correct");
  const username = sessionStorage.getItem("username");
  const [isSubmit, setIsSubmit] = useState("false")
  const { sessionId } = useParams();
  const data = { username, userAnswer, sessionId };

  // req.params === data.map slideid ? setResult = correctAnswer
  // console.log(presentation2)
  console.log(sessionId)

  useEffect(() => {
    fetchPresentation().then((data) => {
      setPresentation2(data);
    });
  }, [setPresentation2]);

  useEffect(() => {
    setTimeout(() => {
      setIsActive("false");
    }, presentation.poolDuration);
    //eslint-disable-next-line
  }, [setIsActive]);

  if (answerList.length === 0) {
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("answer", userAnswer);
    socket.emit('student_submit_response', data);
    setIsSubmit(true);
    if (userAnswer !== correctAnswer) {
      setStyle("inCorrect");
    }
  };

  return (
    <div className="form">
    {isActive === "false" ? (
      <div className="formBeforeQuestion">
       <p>No question currently.</p>
       <p>Please wait for due.</p>
      </div>
    ): (
      <>
      {isSubmit === "false" ? (
        <FormControl>
        <div className="questionForm">
          <form onSubmit={handleSubmit}>
            <div className="formTitle">
              <FormLabel id="demo-controlled-radio-buttons-group">
                Please select answer.
              </FormLabel>
            </div>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="quiz"
              useranswer={userAnswer}
              value={userAnswer}
              onChange={handleAnswer}
            >
              {answerForm}
            </RadioGroup>
            <div className="formButton">
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                Check Answer
              </Button>
            </div>
          </form>
        </div>
      </FormControl>
      ):(
        <div className='formAfterQuestion'>
        <p>You chose {userAnswer}.</p>
        <p className={style}> answer was {correctAnswer}</p>
      </div>
      )}
      </>
    )}
    </div>
  )
}
