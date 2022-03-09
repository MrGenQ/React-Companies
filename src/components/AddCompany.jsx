import React, {useEffect, useState, Component} from 'react';
import {Grid, Paper, Avatar, TextField, Button, InputLabel} from '@material-ui/core';
import Select from 'react-select'
import axios from 'axios';
import Category from "./Category";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate, useParams } from "react-router-dom";
import {Nav} from "react-bootstrap";
import {FormControl} from "@material-ui/core";
import category from "./Category";

const AddCompany = ()=>{

    const paperStyle={padding :30,height:'550px',width:500, margin:"30px auto"}
    const [category, setCategory] = useState({
        data: ""
    })
    const {users} = useParams();
    let history = useNavigate();

    const userid= localStorage.getItem("userid");
    const user = localStorage.getItem("users");
    const[errors,setErrors] = useState('');
    const [companies, setCompany] = useState({
        company: '',
        code: '',
        vat: '',
        address: '',
        director: '',
        category_id: '',
        description: '',
        user_id: userid,

    });
    useEffect(()=>{
        fetch('http://laravel-companies.ddev.site/api/category')
            .then(response => response.json())
            .then(data=>{
                setCategory(data)
            })

            .catch(error => {
                throw(error);
            })
    },[setCategory])


    const {company,code,vat,address,director,description,user_id,category_id} = companies;
    const onInputChange= e => {
        setCompany({...companies, [e.target.name]: e.target.value });
    };
    async function addCompany()
    {
        setErrors('')
        await axios.post("http://laravel-companies.ddev.site/api/add-company",companies)
            .then((response)=>{
                console.log(response.data.error)
                setErrors(response.data.error)
        });
        setCompany({
            company: '',
            code: '',
            vat: '',
            address: '',
            director: '',
            category_id: '',
            description: '',
            user_id: ''});
    }
    return (
        <>
            {!user == "" ? (
                    <Grid>
                        {
                            (Object.keys(errors).length > 0 && (errors != 'Company created successfully'))?  (
                                <Grid>
                                    <Paper style={{padding :30, width:500, margin:"30px auto"}}>
                                        <div className="alert alert-danger">
                                            {
                                                Object.entries(errors).map(([key, value])=>(
                                                    <div key={key}>{value}</div>
                                                ))
                                            }
                                        </div>
                                    </Paper>
                                </Grid>): (errors == 'Company created successfully')?
                                <Grid>
                                    <Paper style={{padding :30, width:500, margin:"30px auto"}}>
                                        <div className="alert alert-success">
                                            {
                                                errors
                                            }
                                        </div>
                                    </Paper>
                                </Grid>:null
                        }
                        <Paper style={paperStyle}>
                            <Grid align='center'>
                                <h2>ADD COMPANY</h2>
                            </Grid>
                            <TextField label='Company' name="company" value={company} onChange={e => onInputChange(e)} type='text' fullWidth required/>
                            <TextField label='Code'  name="code" value={code}  onChange={e => onInputChange(e)} type='number' fullWidth required/>
                            <TextField label='Vat'  name="vat" value={vat}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
                            <TextField label='Address'  name="address" value={address}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
                            <TextField label='Director'  name="director" value={director}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
                            <TextField label='Description'  name="description" value={description}  onChange={e => onInputChange(e)} type='text' fullWidth required/>

                            <FormControl fullWidth style={{paddingTop: 20}}>
                                <select
                                    id="demo-simple-select"
                                    value={category_id}
                                    name="category_id"
                                    onChange={e => onInputChange(e)}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 4,
                                        height: 38,
                                    }}
                                >
                                    <option value="" selected disabled>Category</option>
                                    {(category.data.length)? category.data.map((w)=><Category key={w.id} id={w.id} category={w.category}/>):null}
                                </select>
                            </FormControl>
                            <TextField label='User' className="invisible"  name="user_id" onChange={e => onInputChange(e)} type='number' value={user_id} fullWidth required/>
                            <Button type='submit' onClick={addCompany} color='primary' variant="contained" fullWidth>Add Company</Button>
                        </Paper>
                    </Grid>
                ) :
                <Grid>
                    <Paper style={{padding :30,height:'100px',width:500, margin:"30px auto", color: "red"}}>
                        <Grid align='center'>
                            <h2>You are not logged in</h2>
                        </Grid>
                    </Paper>
                </Grid>
            }

        </>
    );

}
export default (
    AddCompany
)


