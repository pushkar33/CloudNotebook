import React from 'react'
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = (props) => {

  let navigate=useNavigate();

  const [credentials, setcredentials] = useState({username:"",email:"",password:""})

  const onChange=(e)=>{

    setcredentials({...credentials,[e.target.name]:e.target.value}); // appending or overriding note with new title and description
    
  
  }

  const handleSubmit=async (e)=>{

   e.preventDefault();

   const response=await fetch("http://localhost:5000/api/auth/createuser",{
    method:"POST",
      headers:{

        'Content-Type':'application/json',

      },
      body:JSON.stringify({name:credentials.username,email:credentials.email,password:credentials.password})
   })

   const json=await response.json();
   if(json.success)
   {
    localStorage.setItem('token',json.authtoken);
    navigate('/about');
    props.showAlert("Account Created Successfully","success");
   }
   else{
    props.showAlert("Invalid Credentials","danger");
   }


  }

  return (
    <div className="container p-2">

<form onSubmit={handleSubmit}>
<div className="mb-3">
    <label htmlFor="username" className="form-label">Name</label>
    <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Signup