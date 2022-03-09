import {Link, useParams} from "react-router-dom";
import {Card, Container} from "react-bootstrap";
import { useState, useEffect } from "react";
const MoreInfo = ()=>{
    const {id} = useParams();
    const[company, setCompany] = useState({
        data: ""
    })
    const url = 'http://laravel-companies.ddev.site/api/company/';
    useEffect(()=>{
        fetch(`${url}${id}`)
            .then(response => response.json())
            .then(data=>{
                setCompany(data)
            })
            .catch(error => {
                throw(error);
            })
    },[setCompany, id])
    return(
        <Container>
            <Card style={{padding :30,height:300,width:500, margin:"30px auto"}}>
                <Card.Body>
                    <Card.Title><h2>{company.data.company}</h2></Card.Title>
                    <Card.Text>
                        <div>Code: {company.data.code}</div>
                        <div>VAT: {company.data.vat}</div>
                        <div>Address: {company.data.address}</div>
                        <div>Director: {company.data.director}</div>
                    </Card.Text>
                    <Card.Footer style={{background: "lightyellow"}}>
                        <div>{company.data.description}</div>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default MoreInfo