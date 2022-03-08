import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import {Container, Navbar, Nav, NavDropdown, Dropdown, ButtonGroup, DropdownButton} from "react-bootstrap";
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core';
import Main from "./Main";
const UpdateCompany = () =>{
    const paperStyle={padding :30,height:'630px',width:600, margin:"30px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const token = localStorage.getItem("token");
    console.log(token);
    const user = localStorage.getItem("users");

    const navigate = useNavigate();

    const { id } = useParams()

    const [company, setCompany] = useState("")
    const [code, setCode] = useState("")
    const [vat, setVat] = useState("")
    const [address, setAddress] = useState("")
    const [director, setDirector] = useState("")
    const [description, setDescription] = useState("")
    const [category,setCategory] = useState("")

    const [validationError,setValidationError] = useState("")

    useEffect(()=>{
        getCompany()
    },[])

    const getCompany = async () => {
        await axios.get(`http://laravel-companies.ddev.site/api/company/${id}`).then(({data})=>{
            setCompany(data.data.company);
            setCode(data.data.code);
            setVat(data.data.vat);
            setAddress(data.data.address);
            setDirector(data.data.director);
            setDescription(data.data.description);
            setCategory(data.data.category_id);
            console.log(data.data);
        })
    }
    const updateCompany = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('_method', 'POST');
        formData.append('company', company);
        formData.append('code', code);
        formData.append('vat',vat );
        formData.append('address', address);
        formData.append('director', director);
        formData.append('description', description);
        formData.append('category_id', category);

        await axios.post(`http://laravel-companies.ddev.site/api/update/${id}`, formData)
            .then((response)=>{
                console.log(response.data)
                setValidationError(response.data)
                /*if(response.data[0] === "Company updated successfully"){
                    navigate('/')
                }*/
            })
    }

    return (
        <div className="container">

                <div className="form-wrapper">
                    {
                        Object.keys(validationError).length > 0 && validationError[0] != "Company updated successfully" && (
                            <Grid>
                                <Paper style={{padding :30, width:600, margin:"30px auto"}}>
                            <div className="alert alert-danger">
                                {
                                    Object.entries(validationError).map(([key, value])=>(
                                        <div key={key}>{value}</div>
                                    ))
                                }
                            </div>
                                </Paper>
                            </Grid>)
                    }
                    {
                        Object.keys(validationError).length > 0 && validationError[0] == "Company updated successfully" && (
                            <Grid>
                                <Paper style={{padding :30, width:600, margin:"30px auto"}}>
                                    <div className="alert alert-success">
                                        {
                                            Object.entries(validationError).map(([key, value])=>(
                                                <div key={key}>{value}</div>
                                            ))
                                        }
                                    </div>
                                </Paper>
                            </Grid>)
                    }
                </div>

            <Grid>
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <h2>Update Company</h2>
                    </Grid>

                        <Form onSubmit={updateCompany}>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={company} onChange={(event)=>{
                                            setCompany(event.target.value)
                                        }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Code</Form.Label>
                                        <Form.Control type="text" value={code} onChange={(event)=>{
                                            setCode(event.target.value)
                                        }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>PVM</Form.Label>
                                        <Form.Control type="text" value={vat} onChange={(event)=>{
                                            setVat(event.target.value)
                                        }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" value={address} onChange={(event)=>{
                                            setAddress(event.target.value)
                                        }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Director</Form.Label>
                                        <Form.Control type="text" value={director} onChange={(event)=>{
                                            setDirector(event.target.value)
                                        }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" value={description} onChange={(event)=>{
                                            setDescription(event.target.value)
                                        }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control type="text" value={category} onChange={(event)=>{
                                            setCategory(event.target.value)
                                        }}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button type='submit' color='primary' variant="contained" fullWidth>Update</Button>
                        </Form>
                </Paper>
            </Grid>
        </div>
    )
}
export default UpdateCompany