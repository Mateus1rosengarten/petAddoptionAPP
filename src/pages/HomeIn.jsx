import "../ComponentsHomeOut/Navbar.css";
import { useNavigate } from "react-router";
import {useContext, useEffect, useState } from "react";
import { authStates } from "../Context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import{ userStates,userImage,setUserImage } from "../Context/UserContext";

function HomeLogIn() {
  const { loginObject, setLoginObject,authState,setAuthState,value,setValue,tokenValue,setTokenValue } = useContext(authStates);
  const { userImage,setUserImage } = useContext(userStates)
  const navigate = useNavigate();



  useEffect(()=> {
setTokenValue(localStorage.getItem("apiKey"));


  },[]) 



  setTimeout(() => {
    

   
    setLoginObject('Authorized')
    

  },500)

  setTimeout(() => {
    navigate('/search')

  },3000)



  

  let response 
  useEffect(() => {
    const fetchData = async () => {
      try {
        response = await axios.get("http://localhost:3000/auth", {
          headers: {
            accessToken: tokenValue,
          },
        });
        if (response.data.error) {
          console.log("No success", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("success in AUTH", response);
          setValue(response)
          
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
    
  }, [tokenValue]);
  

  useEffect(() => {
    if (value.data?.id) {

      console.log('AUTH DATA',value)
      
      axios.get(`http://localhost:3000/user/${value.data.id}`).then((res) => {
        console.log("Object that contains ALL INFO FROM DB!!!", res.data);
        const userFullInfo = res.data;
        
        console.log("STATE THAT CONTAINS IMAGE FROM DB!!!", userFullInfo.image);
        setUserImage(userFullInfo.image);
        
      });
    }

    else {
      console.log('NAO DEU TEMPO')
    }

  },[value])

  return (  
    <> 
     <img
        className="picture-homepageIn"
        src="https://images.squarespace-cdn.com/content/v1/5c222faff2e6b174633b3c87/1602271575891-SJSK411HS9S2BXR8NDIS/adopt-dog-cat-kitten-puppy-in-Atlanta-Midtown-local?format=2500w"
        style={{ width: "100vw" ,height: '100vh' }}
        alt=""
        
      />
    {loginObject === "Authorized" && <h1 className="styleh1">Welcome {value.data.name} {value.data.lastName} </h1> }
    <ToastContainer/>
 
     
    </>
  );
}

export default HomeLogIn;
