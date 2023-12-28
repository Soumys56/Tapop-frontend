import React, { useState } from 'react'
import axios  from 'axios';
import "./signup.css"
import { FaUserAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { FaFile } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate=useNavigate();
    const [image,setImage]=useState([]);
    const[email,setEmail]=useState("");

     const[name,setName]=useState("") 
     const [username,setUserName]=useState("");
     const[password,setPassword]=useState("");
     
     
     const onInputchange=(e)=>{
        const files = Array.from(e.target.files);
        setImage([...image, ...files]);
       
    }
    const submitImage=async (e)=>{
        try{
            e.preventDefault();
        const formdata=new FormData();
        image.forEach((image, index) => {
            formdata.append("image", image);
          });

        formdata.append("username",username);
        formdata.append("name",name);
        formdata.append("password",password);
        formdata.append("email",email)
        
      

        const result=await axios.post(
            "http://localhost:8001/signup",
            formdata,
            {
                headers:{"content-type":"multipart/form-data"}

            }
        )
     
     if(result.data.User){

        navigate("/signin")


     }
     else{
        return;
     }
        
       



        }catch(err){
            console.log(err)
        }
        

    }
  return (
    <div  className='signup_container' >
      <h1>Sign Up Page</h1>
       <div className='inner_container'>
       <form  onSubmit={submitImage} className="form_container">
       <div className='inputs'>
         <FaUserAlt className="icon"/>
       <input type="text" name='name' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}  />
       </div>
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
            <div className='inputs'>
             <FaFile className="icon" />
            <input type="file" className='fileinput' name="coverimage" onChange={onInputchange} placeholder="cover photo" />
            </div>
            
             <div className='inputs'>
             <FaFile  className="icon"/>
             <input type="file" className='fileinput' name='backgroundimage'  onChange={onInputchange} placeholder="back photo"/>
             </div>
            
             <button className='button' type='submit'>submit</button>
         </form>
       </div>
        
        <p><Link to="/signin">Already signUp ?Log In</Link></p>
        
       
    </div>
  )
}

export default Signup