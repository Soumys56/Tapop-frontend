import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Tilt from "react-parallax-tilt";

const Qrinfo = () => {
    const {id}=useParams();
    const[user,setUser]=useState()
    console.log(user)
  
    
    useEffect(()=>{
       const getUser= async ()=>{
            let res=await axios.get(`http://localhost:8001/getUser/${id}`);
            setUser(res.data.user)
           
    
        }
        getUser()
       
    },[])
  return (
    <Tilt>
      <h1>Profile Info</h1>
    <div className='profilepage_container' style={{"backgroundImage":`url("http://localhost:8001/images/${user.backimage}")`, "objectFit":"cover" ,"objectPosition":"center","zIndex":"0.4"}}>
        
        <div className='profilepage_container_inner'>
        <div className='profile_body'>
           <div className='profile_cover'>
                    <img src={ `http://localhost:8001/images/${user.image}`} alt="back image"/>
                </div>
            </div>
            <div className='profile_background'>
               <button>{user.name}</button>  
               <button>{user.username}</button>
               <button>{user.email}</button>

            </div>
            


        </div>

    </div>
    

    



 </Tilt>
  )
}

export default Qrinfo