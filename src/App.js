import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Login } from "./components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
