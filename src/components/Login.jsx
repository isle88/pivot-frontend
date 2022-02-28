import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Form } from './Form';

sessionStorage.clear()

export const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUsername(e.target.value);
  };
 
  const handleLogin = () => {
    if (username === "") {
      alert("username should not be blank");
    } else {
      sessionStorage.setItem('username', username)
      navigate("/Form");
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



