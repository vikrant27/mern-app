import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Signup(props) {

    const host = "http://localhost:5000";

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch(`${host}/api/auth/createuser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        if(json.success){

            localStorage.setItem('token', json.token);
            navigate("/")
            props.showAlert('Account Created Successfully','success');

        }else{
            props.showAlert('Invalid Credintails','danger');
        }
    }//handlesubmit


    const onchange = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    
    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onchange} id="name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" name="password" required minLength={5}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onchange} id="cpassword" name="cpassword" required minLength={5}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}