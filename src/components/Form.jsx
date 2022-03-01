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
import { useLocation, useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { fetchPresentation } from "../utils/api";

export const Form = () => {
  const { sessionId } = useParams();
  const socket = useContext(SocketContext);
  const username = sessionStorage.getItem("username");
  console.log(username)

  const [slides, setSlides] = useState("");
  const getSlideId = useLocation();
  const slideId = getSlideId.state;

  // fetching slides from api
  useEffect(() => {
    fetchPresentation(sessionId).then((res) => {
      setSlides(res.slides);
    });
  }, [setSlides, sessionId]);
  
  const slide = [...slides]
    .filter((id) => id.slideId === slideId)
    .map(({ question }) => question);
  
  const [userAnswer, setUserAnswer] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const data = { username, userAnswer, sessionId, slideId };
  const [style, setStyle] = useState("correct");


  const answerList = [];
  const options = ["A", "B", "C", "D", "E", "F"];
  const [numAnswers, setNumAnswers] = useState()
  const [correctAnswer, setCorrectAnswer] = useState()
  const [isActive, setIsActive] = useState(false)

  // make foam
  useEffect(() => {
    if (slide.length !== 0) {
      if (slide[0].hasQuestion) {
        setIsActive(true)
        setNumAnswers(slide[0].numAnswers)
        setCorrectAnswer(slide[0].correctAnswer)
      } else {
        setIsActive(false)
      }
    }
  }, [slide,setIsActive, setNumAnswers, setCorrectAnswer])

 console.log(slideId, 'slide-id')

  // when teacher stopped poll
  useEffect(() => {
    socket.on("current_slide_stopped", (id) => {
      setIsActive(false)
    });
  }, [setIsActive, socket]);

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
    socket.emit("student_submit_response", data);
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
      ) : (
        <>
          {isSubmit === false ? (
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
                    <Button
                      sx={{ mt: 1, mr: 1 }}
                      type="submit"
                      variant="outlined"
                    >
                      Check Answer
                    </Button>
                  </div>
                </form>
              </div>
            </FormControl>
          ) : (
            <div className="formAfterQuestion">
              <p>You chose {userAnswer}.</p>
              <p className={style}> answer was {correctAnswer}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
