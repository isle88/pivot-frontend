import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from './components/Footer';
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { socket, SocketContext } from './context/socket';

const io = socket;

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <SocketContext.Provider  value={socket}> 
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Form" element={<Form />} />
        </Routes>
        <Footer />
    </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
