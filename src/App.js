import "./App.css";
import FormData from "./FormData";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modify/:index" element={<FormData />} />
        <Route path="/createUser" element={<FormData />} />
      </Routes>
    </div>
  );
}

export default App;
