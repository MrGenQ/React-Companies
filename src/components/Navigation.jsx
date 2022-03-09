import {Navbar, Nav, Container, Dropdown, ButtonGroup} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";

const Navigation = () =>{
    const [user, setUser] = useState(localStorage.getItem('users'));
    const {users} = useParams();
    const logout = () =>
    {
        localStorage.removeItem("users")
    }
    return (
        <>
        <Container className='container-fluid'>
            <Navbar bg="dark" variant="dark" style={{minWidth: 578}}>
                <Container >
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    {(user === null)?(
                            <Nav className="me-auto">
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Register</Nav.Link>
                            </Nav>

                        ) :
                        <Nav className="me-auto">
                            <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                            <Nav.Link href="/add-company">Add Company</Nav.Link>
                        </Nav>
                    }

                    </Container>
            </Navbar>
        </Container>
        </>


    )
}
export default Navigation