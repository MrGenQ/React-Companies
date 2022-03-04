import {Navbar, Nav, Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Navigation = () =>{
    const [user, setUser] = useState("");
    const {users} = useParams();
    const logout = () =>
    {
        localStorage.removeItem("users")
    }
    useEffect(()=>{
        setUser(localStorage.getItem('users'));
        console.log(user)
    },[user])

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    {!user == "" ? (
                            <Nav className="me-auto">
                                <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                            </Nav>
                        ) :
                        <Nav className="me-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Register</Nav.Link>
                            <Nav.Item>{user}</Nav.Item>
                        </Nav>
                    }

                </Container>
            </Navbar>
        </>


    )
}
export default Navigation
