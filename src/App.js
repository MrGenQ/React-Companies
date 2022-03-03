import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import MoreInfo from "./components/MoreInfo";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
const App  = ()=>{
    return(
        <div className="container">
            <Navigation />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route path="/company/:id" element={<MoreInfo/>}/>\
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>

            </Router>
        </div>
    )

}
export default App;