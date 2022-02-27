import {
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Button,
} from "@mui/material";
import { useContext, useEffect } from 'react';
import { useState } from "react";
import { SocketContext } from '../context/socket';
import { fetchPresentation } from '../utils/api';


export const Form = (props) => {

  const presentation = {
    presentationid: "id-here", //
    slideid: "random-page", //
    correctAnswer: "A",
    poolDuration: 5000, //
    answer: ["A", "B", "C", "D"],
    isActive: "true",
  };
  
  const answerList = [];

  const [presentation2, setPresentation2] = useState([]); // get data from api

  const socket = useContext(SocketContext)
  const countAnswers = presentation.answer.length;
  const [isActive, setIsActive] = useState(presentation.isActive);
  const [userAnswer, setUserAnswer] = useState("");
  const username = sessionStorage.getItem("username");
  const data = { username, userAnswer }

  // req.params === data.map slideid ? setResult = correctAnswer
  useEffect(() => {
    fetchPresentation().then((data) => {
      setPresentation2(data)
    })
  }, [setPresentation2])

  console.log(presentation2)
  
  useEffect(() => {
    setTimeout(() => {setIsActive('false')}, presentation.poolDuration)
    //eslint-disable-next-line
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("answer", userAnswer);
    socket.emit('test', data)
    setIsActive('false')
  };

  return (
    <div>
      {isActive === "true" ? (
    <FormControl>
        <div className='questionForm'>
          <form onSubmit={handleSubmit}>
            <div className='formTitle'>
            <FormLabel id="demo-controlled-radio-buttons-group">Please select answer.</FormLabel>
            </div>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="quiz"
                useranswer={userAnswer}
                value = {userAnswer}
                onChange={handleAnswer}
              >
                {answerForm}
              </RadioGroup>
              <div className='formButton'>
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                Check Answer
              </Button>
              </div>
          </form>
        </div>
            </FormControl>
       
      ) : (
        <div className='afterQuestion'>
        <p>Thank you !</p>
        {userAnswer === '' ? (
          `Please choose answer next time. `
        ): (`You chose ${userAnswer}.`)}
        </div>
      )}
      </div>
  );
}
