import {Navbar, Nav, Container, Dropdown, ButtonGroup} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";

const Navigation = () =>{
    const [user, setUser] = useState("");
    const {users} = useParams();
    const logout = () =>
    {
        localStorage.removeItem("users")
    }
    useEffect(()=>{
        setUser(localStorage.getItem('users'));

    },[user])

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    {!user == "" ? (
                            <Nav className="me-auto">
                                <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                                <Nav.Link href="/add-company">Add Company</Nav.Link>
                            </Nav>
                        ) :
                        <Nav className="me-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Register</Nav.Link>
                        </Nav>
                    }

                </Container>
            </Navbar>
        </>


    )
}
export default Navigation