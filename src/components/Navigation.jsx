import {Navbar, Nav, Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

const Navigation = () =>{
    const {users} = useParams();
    let history = useNavigate();

    const user = localStorage.getItem('users');
    console.log(user);

    const logout = () =>
    {
        localStorage.removeItem("users")
        history("/login");
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </>


    )
}
export default Navigation