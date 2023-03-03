import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
    const host = "http://localhost:5000";

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email:"",password:""});
    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.success){

            localStorage.setItem('token', json.token);
            props.showAlert('User Login Successfully','success');
            navigate("/")
            

        }else{
            props.showAlert('Invalid Credintails','danger');
        }
    }//handlesubmit

    const onchange = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    return(
        <div className="mt-2">
            <h2>Login to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" name="password"/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}