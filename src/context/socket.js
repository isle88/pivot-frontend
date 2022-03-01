import { createContext } from 'react';

import io from "socket.io-client"; 

export let socket = io.connect()
export const SocketContext = createContext();
// export const socket = io.connect("http://localhost:9090"); 
// let socket = io.connect("https://rhs-pivot-backend.herokuapp.com");

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  socket = io.connect("http://localhost:9090")
  console.log('9090 connection')
} else {
  // production code
  socket = io.connect("https://rhs-pivot-backend.herokuapp.com")
  console.log('backend deployed port')
}


