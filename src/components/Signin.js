import React from 'react'
import "./signup.css"
import { useState } from 'react';
import axios from "axios"

import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
const Signin = ({setProfile}) => {
    const navigate=useNavigate();
    const [username,setUserName]=useState("");
     const[password,setPassword]=useState("");
     const[email,setEmail]=useState("");
     const submitsignForm=async (e)=>{
        e.preventDefault();
        const signindata=new FormData();
        signindata.append("username",username);
        signindata.append("email",email);
        signindata.append("password",password);
      const result=  await axios.post( "http://localhost:8001/signin",
        {
            email,
            username,
            password
        },
        {
            headers:{
                "content-type":"application/json"
            }

        }
        
           

        )
        if(result.data.userinfo){
          setProfile(result.data.userinfo);
          localStorage.setItem("user",JSON.stringify({"session":result.data.sessionid,"userinfo":result.data.userinfo}))
            navigate("/profile")
            
            
        }
        else{
            return ;
        }




     }

  return (
    <div  className='signup_container' >
      <h1>Sign In Page</h1>
       <div className='inner_container'>
       <form  onSubmit={submitsignForm} className="form_container">
       
          <div className='inputs'>
            <FaRegUserCircle className="icon"/>
          <input type="text" name="username" placeholder='Enter Your username' value={username}  onChange={(e)=>setUserName(e.target.value)}/>
          </div>
          <div className='inputs'>
           <MdEmail className="icon"/>
           <input type="email" placeholder='Enter your email' value={email} required="true" onChange={(e)=>setEmail(e.target.value)} />
           </div>
           <div className='inputs'>
            <GoPasskeyFill className="icon"/>
           <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} />
           
           </div>
           
            
             <button className='button' type='submit'>submit</button>
         </form>
       </div>
        
        <p><Link to="/">Already not signUp ?Sign Up</Link></p>
        
       
    </div>
  )
}

export default Signin