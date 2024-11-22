import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Table from "./components/Table";
import Company from "./components/Company";
import Error from "./components/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/company/:ticker" element={<Company />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
