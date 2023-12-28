import React, { useEffect, useRef, useState } from 'react'
import "./profile.css"
import Tilt from "react-parallax-tilt";
import QRCode from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({profile}) => {

  

    const popupRef=useRef(null);

    const navigate=useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const generateQRCode = () => {
      const profileURL = `http://localhost:3000/profile/${profile._id}`;
  
      return (
        <div>
          <h3>{profile.username}</h3>
          <QRCode value={profileURL} />
        </div>
      );
    };
  
    const handleShareClick = () => {
      setShowPopup(true);
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    const saveAsJPEG = () => {
      // Logic to save the popup content as JPEG
      // This could involve creating a canvas, rendering the content, and saving it
      // For simplicity, this example does not include the JPEG conversion
      const popupContent = popupRef.current;
      const popupWidth = popupContent.offsetWidth;
      const popupHeight = popupContent.offsetHeight;
  
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = popupWidth;
      canvas.height = popupHeight;
  
      const ctx = canvas.getContext('2d');
  
      // Draw the popup content onto the canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, popupWidth, popupHeight);
  
      const DOMURL = window.URL || window.webkitURL || window;
  
      const img = new Image();
      const svg = new Blob([popupContent.innerHTML], { type: 'image/svg+xml;charset=utf-8' });
      const url = DOMURL.createObjectURL(svg);
  
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
  
        // Convert canvas content to data URL
        const dataURL = canvas.toDataURL('image/jpeg');
  
        // Create a link element and trigger download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'profile.jpg';
        link.click();
      };
  
      img.src = url;
      alert('Content saved as JPEG!');
    };
  
    
    return (
        <>
        {
           profile.backimage==='undefined'? navigate("/"):
                   
        <Tilt>
        <h1>Profile Info</h1>
       
        <div className='profilepage_container' style={{"backgroundImage":`url("http://localhost:8001/images/${profile.backimage}")`, "objectFit":"cover" ,"objectPosition":"center","zIndex":"0.4"}}>
            
            <div className='profilepage_container_inner'>
            <div className='profile_body'>
               <div className='profile_cover'>
                        <img src={ `http://localhost:8001/images/${profile.image}`} alt="back image"/>
                    </div>
                </div>
                <div className='profile_background'>
                   <button>{profile.name}</button>  
                   <button>{profile.username}</button>
                   <button>{profile.email}</button>

                </div>
                


            </div>

        </div>

        <div className='sharebutton'>
      <button  style={{"margin":"auto","padding":"0.5rem 1rem","fontSize":"14px","borderRadius":"14px 14px"}} onClick={handleShareClick}>Share Profile</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content"  ref={popupRef}>
            {generateQRCode()}
            <button onClick={saveAsJPEG}>Save as JPEG</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>



     </Tilt>

          
        }

        </>
 
    )
}

export default Profile