import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Table from './Components/Table';
import Company from './Components/Company';
import Error from './Components/Error';

function App() {
    return(
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<Table />}/>
        <Route path="/company/:slug" element={<Company />}/>
        <Route path="*" element={<Error />}/>
       </Routes>
       </BrowserRouter>
    );
}

export default App;