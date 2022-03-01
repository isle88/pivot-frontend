import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Form } from './Form';
import { SocketContext } from '../context/socket';

// sessionStorage.clear()

export const Login = () => {
  let { sessionId } = useParams()
  const [username, setUsername] = useState("");
  const [slideId, setSlideId] = useState('')
  const socket = useContext(SocketContext);
  
  useEffect(() => {
    socket.on("current_slide", (id) => {
      setSlideId(id);
    });
  }, [setSlideId, socket]);

  const handleInput = (e) => {
    setUsername(e.target.value);
  };
 
  const handleLogin = () => {
    if (username === "") {
      alert("username should not be blank");
    } else {
      sessionStorage.setItem('username', username)
    }
  };

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
        <Link to={`/${sessionId}/Form`} state={slideId}>
      <Button variant="outlined" type="submit" onClick={handleLogin}>
        Login
      </Button>
      </Link>
      </div>
    </div>)
    :(
    <Form slideId={slideId}/> 
   )}
    </>
  );
};
