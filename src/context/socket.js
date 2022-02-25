import { createContext } from 'react';

import io from "socket.io-client"; 

export const socket = io('ws://localhost:3001/', { transports: ['websocket'] });
export const SocketContext = createContext();

//TODO
// import { createContext } from 'react';

// import io from "socket.io-client"; 

// export const socket = io(process.env.REACT_APP_SOCKET_URL, { transports: ['websocket'] });
// export const SocketContext = createContext();
