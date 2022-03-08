import { Table } from "react-bootstrap";
import {Container, Row,Col} from "react-bootstrap";
import { useState, useEffect } from "react";
import RenderCompanies from "./RenderCompanies";
import { Button} from '@material-ui/core'
import { useNavigate, useParams } from "react-router-dom";


const Main = (props)=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}

    const {users} = useParams();
    let history = useNavigate();

    const user = localStorage.getItem('users');

    const[companies, setCompanies] = useState("")
    useEffect(()=>{
        fetch('http://laravel-companies.ddev.site/api/companies')
            .then(response => response.json())
            .then(data=>{
                setCompanies(data)
                console.log(data)
            })

            .catch(error => {
                throw(error);
            })
    },[setCompanies])
    console.log(props.update)
    return(
        <>
            <Container>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Code</th>
                        <th>Address</th>
                        <th>Director</th>
                        <th>More...</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(companies.data)?companies.data.map((w)=><RenderCompanies key={w.id} id={w.id} code={w.code} company={w.company} address={w.address} director={w.director}/>):null}
                    </tbody>
                </Table>

            </Container>
        </>
    )
}
export default Main