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
    <BrowserRouter>
    <SocketContext.Provider  value={socket}> 
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Form" element={<Form />} />
        </Routes>
        <Footer />
    </div>
    </SocketContext.Provider>
      </BrowserRouter>
  );
}

export default App;
