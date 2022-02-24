import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

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

  return (
    <>
    {sessionStorage.clear()}
      <TextField
        id="standard-basic"
        type="text"
        label="Please enter your name"
        variant="standard"
        onChange={handleInput}
      />
      <Button  variant="outlined" type="submit" onClick={handleLogin}>
        Login
      </Button>
    </>
  );
};


// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { TextField, Button } from "@mui/material";

// export const Login = () => {
//   const [username, setUsername] = useState("");
//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleLogin = () => {
//     if (username === "") {
//       alert("username should not be blank");
//     } else {
//       navigate("/Form", username={username});
//     }
//   };

//   return (
//     <>
//       <TextField
//         id="standard-basic"
//         type="text"
//         label="Please enter your name"
//         variant="standard"
//         onChange={handleInput}
//       />
//       <Button  variant="outlined" type="submit" onClick={handleLogin}>
//         Login
//       </Button>
//     </>
//   );
// };

