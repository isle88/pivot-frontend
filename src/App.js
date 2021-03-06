import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from './components/Footer';
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { socket, SocketContext } from './context/socket';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <SocketContext.Provider  value={socket}> 
        <Header />
        <Routes>
         <Route path="/:sessionId" element={<Login />} />
          <Route path="/:sessionId/Form" element={<Form />} />
          <Route path="*" element={<p className='notFound'>Please check url on the slide</p>} />
        </Routes>
        <Footer />
    </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
