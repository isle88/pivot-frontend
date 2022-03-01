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
   // get data from data.slides 
    "slides": [
      {
        "question": {
          "hasQuestion": false
        },
        "slideImageUrl": "https://i.picsum.photos/id/822/536/354.jpg?hmac=9SpWynDccCitrWhlYnRoAmb-sYoLNpUVQHmLsbbOLm4",
        "slideId": "test01",
        "_id": "621de4db9e505cf1c4d2a64d",
        "responses": [
          
        ]
      },
      {
        "question": {
          "hasQuestion": true,
          "numAnswers": 3,
          "correctAnswer": "C"
        },
        "slideImageUrl": "https://i.picsum.photos/id/822/536/354.jpg?hmac=9SpWynDccCitrWhlYnRoAmb-sYoLNpUVQHmLsbbOLm4",
        "slideId": "test02",
        "_id": "621de4db9e505cf1c4d2a64e",
        "responses": [
          
        ]
      }
    ],
    "__v": 0
  }
  
  const { sessionId } = useParams();
  const socket = useContext(SocketContext);


  const answerList = [];
  const options = ["A", "B", "C", "D", "E", "F"]
  // const countAnswers = presentation.answer.length; numAnswers
  const [numAnswers, setNumAnswers] = ([3])
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isActive, setIsActive] = useState();
  const [userAnswer, setUserAnswer] = useState("");
  const [style, setStyle] = useState("correct");
  const username = sessionStorage.getItem("username");
  const [isSubmit, setIsSubmit] = useState("false")

  const [slides, setSlides] = useState()
  const [slide, setSlide] = useState();
  const [slideId, setSlideId] = useState();
  const data = { username, userAnswer, sessionId, slideId };

  const getSlide = presentation.slides.filter((id) => id.slideId === slideId)
  
  // fetching slides from api
  useEffect(() => {
    fetchPresentation(sessionId)
    .then((res) => {
      setSlides(res.slides)
    })
  }, [sessionId])
  
  console.log(getSlide)
    // when i teacher frontend press start
    useEffect(() => {
      socket.on('current_slide', (id) => {
       console.log(id)
       setSlideId(id)
      })
    }, [slideId])


  useEffect(() => {
   socket.on('current_slide_stopped', (id) => {
     console.log(id)
     setIsActive(false)
   })
  }, [slideId])






  // when hasQuestion is false
  // slide.map((x) => {
  //   setIsActive(x.question.hasQuestion)
  // })
  // console.log(isActive)
  // when hasQuestion is true
  // slide.map(({question}) => {
  //   console.log(question.hasQuestion)
  //   // setIsActive(question.hasQuestion)
  //   // setNumAnswers(question.numAnswers)
  //   // setCorrectAnswer(question.correctAnswer)
  // })

  
  // useEffect(() => {
  //   fetchPresentation().then((data) => {
  //     setPresentation2(data);
  //   });
  // }, [setPresentation2]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsActive("false");
  //   }, presentation.poolDuration);
  //   //eslint-disable-next-line
  // }, [setIsActive]);

  if (answerList.length === 0) {
    for (let i = 0; i <= numAnswers - 1; i++) {
      answerList.push(options[i]);
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
    {isActive === false ? (
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
