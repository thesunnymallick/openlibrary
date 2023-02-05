
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home";
import Subject from "./Components/Subject";
import "./Style/app.scss"
import "./Style/sidebar.scss"
import "./Style/home.scss"
import "./Style/mediaQuery.scss"
function App() {
  return (
   <BrowserRouter>

   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/subject" element={<Subject/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
