import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import MoreInfo from "./components/MoreInfo";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import AddCompany from "./components/AddCompany";
import {Container} from "react-bootstrap";

import UpdateCompany from "./components/UpdateCompany";
import Signup from "./components/Singup";
const App  = ()=>{
    return(
        <Container className='container-fluid'>
            <Navigation />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route path="/company/:id" element={<MoreInfo/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/add-company" element={<AddCompany/>} />
                    <Route path="/update/:id" element={<UpdateCompany/>}/>

                </Routes>

            </Router>
        </Container>
    )

}
export default App;