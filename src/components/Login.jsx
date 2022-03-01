import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Form } from './Form';
import { SocketContext } from '../context/socket';
import { fetchPresentation } from '../utils/api';

sessionStorage.clear()

export const Login = () => {
  let { sessionId } = useParams()
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const socket = useContext  (SocketContext)

  //check data fetching at login
  // useEffect(() => {
  //   fetchPresentation().then((data) => {
  //     console.log(data)
  //   })
  // })

  useEffect(() => {
    socket.emit('student_login', sessionId)
     //eslint-disable-next-line
  }, [sessionId])


  const handleInput = (e) => {
    setUsername(e.target.value);
  };
 
  const handleLogin = () => {
    if (username === "") {
      alert("username should not be blank");
    } else {
      sessionStorage.setItem('username', username)
      navigate(`/${sessionId}/Form`);
    }
  };
  
  console.log(sessionStorage.getItem('username'))

  return (
    <>
    { sessionStorage.getItem('username') === null ?
    ( <div className='login'>
    <div className='loginInput'>
      <TextField
        id="standard-basic"
        type="text"
        label="Please enter your name"
        variant="standard"
        onChange={handleInput}
      />
      </div>
      <div className='loginButton'>
      <Button  variant="outlined" type="submit" onClick={handleLogin}>
        Login
      </Button>
      </div>
    </div>)
    :(
    <Form />
   )}
    </>
  );
};



