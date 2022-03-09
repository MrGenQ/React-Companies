import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, NavLink } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import navigation from "./Navigation";

const Signup=()=>{

    const paperStyle={padding :20,minheight:450,width:350, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const btnstyle={margin:'8px 0'}

    const[errors,setErrors] = useState('');
    const [user, setUser] = useState({
        name: "",
        email: "",
        password:""
    });

    const {name, email,password} = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    async function  signup()
    {
        await axios.post("http://laravel-companies.ddev.site/api/register",user)
        .then(response => {
            console.log(response.data.error)
            localStorage.setItem("users", response.data.name);
            localStorage.setItem("userid", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            setErrors(response.data.error)
        });

        setUser({name:"",email:"",password:""}) // To Clear all fields

    }

    return(
        <>
            {
                (Object.keys(errors).length > 0 && (errors != 'Signup complete'))?  (
                    <Grid>
                        <Paper style={{padding :30, width:350, margin:"30px auto"}}>
                            <div className="alert alert-danger">
                                {
                                    Object.entries(errors).map(([key, value])=>(
                                        <div key={key}>{value}</div>
                                    ))
                                }
                            </div>
                        </Paper>
                    </Grid>): (errors == 'Signup complete')?
                    <Grid>
                        <Paper style={{padding :30, width:350, margin:"30px auto"}}>
                            <div className="alert alert-success">
                                {
                                    errors
                                }
                            </div>
                        </Paper>
                    </Grid>:null
            }

        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>

                </Grid>

                <TextField label='Name' name="name" value={name} onChange={e => onInputChange(e)} placeholder='Enter Name' type='text' fullWidth required/>
                <TextField label='Email'  name="email" value={email}  onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required/>
                <TextField label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='password' fullWidth required/>

                <Button type='submit' onClick={signup} color='primary' variant="contained" style={btnstyle} fullWidth>Singup</Button>

                <Typography>Click Here for
                    <NavLink to="/login">
                        <span style={{marginLeft:"4px"}}>Login</span>
                    </NavLink>
                </Typography>
            </Paper>
        </Grid>
        </>
    )
}

export default Signup