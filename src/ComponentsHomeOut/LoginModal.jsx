import "./AuthModal.css";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "../Context/AuthContext";
import { redirect, useNavigate } from "react-router";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  ChakraProvider,
  CSSReset,
 } from '@chakra-ui/react';


function LoginModal({ toggleModal }) {
  const { loginObject, setLoginObject } = useContext(authStates);

  const navigate = useNavigate();

 

  function setTime(time) {
    setTimeout(() => {
      navigate('/user')
      
    }, time) };

  const handleLogin = () => {
    
     if (loginObject.email && loginObject.password) {
    
    const loginPath = "http://localhost:3000/login";
    axios.post(loginPath, { ...loginObject }).then((res) => { 
      const mytoken = res.data.token;
      localStorage.setItem("apiKey", mytoken);
      setLoginObject(res)
      toast("Sucess");
      setTime(3000);
        
      
     
    
    }).catch((error) => {
      toast('Wrong User or Password')
      console.log('aqui',error) })
    }
  
  else {
    toast('Please fill all the fields')
  }}
    
    
    ;
  ;

  return ( <>
    <div className="modal-auth">
      <div className="overlay">
        <div className="modal-content">
        <ToastContainer />


        <ChakraProvider>
        <CSSReset /> 


        <Box   width='4vw'> 
        <Button className="button-exit-login" width="100%" variant='outline'  onClick={toggleModal} colorScheme="red" size='xs' marginTop="0px" marginLeft ='12vw' marginBottom='2vh' >
        Close
      </Button> </Box>

        <h1 className="h1-modal-content">Login to your account</h1>

        <FormControl marginBottom="20px">
     
        <FormLabel> Email</FormLabel>
     
          <Input  type="email"   onChange={(e) =>
              setLoginObject({ ...loginObject, email: e.target.value })
            } id='login'  placeholder='email' />
         </FormControl>

          {/* <h1 className="h1-modal-content">Login to your account</h1> */}

          {/* <input
            className="input-modal"
            onChange={(e) =>
              setLoginObject({ ...loginObject, email: e.target.value })
            }
            type="email"
            id="login"
            placeholder="email"
          /> */}
 <FormControl marginBottom="20px">
     
     <FormLabel>Password</FormLabel>
  
       <Input  type="password"  
        id='login'  placeholder='password'  onChange={(e) =>
          setLoginObject({ ...loginObject, password: e.target.value })
        }  />
      </FormControl>

          {/* <input
            className="input-modal"
            onChange={(e) =>
              setLoginObject({ ...loginObject, password: e.target.value })
            }
            type="password"
            id="pass"
            placeholder="password"
          /> */}

      <Button className="submit-button-login"  onClick={handleLogin} colorScheme='linkedin'  marginTop="20px" width="100%">
        Login
      </Button>
      </ChakraProvider> 
          {/* <button onClick={handleLogin} className="modal-signup-button">
            Login
          </button> */}


          {/* <button onClick={toggleModal} className="modal-exit-button">
            X
          </button> */}
        </div>
      </div>
    </div> 
    
    </> )  
}

export default LoginModal;
