import { useContext, useEffect } from "react";
import { authStates } from "../Context/AuthContext";
import "./AuthModal.css";
import { useNavigate } from "react-router";
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

function AuthModal({ toggleModal }) {
  const navigate = useNavigate();
  const { value, setValue } = useContext(authStates);

  useEffect(() => {
    console.log('authState',value);
  }, []);



  function setTime(time) {
  setTimeout(() => {
    navigate('/user')
    
  }, time) };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!value.name || !value.lastName || !value.number || !value.email || !value.password) {
      toast('Plase Fill all fields')
    }

    if (value.password.length >= 8) { 

    if (value.password === value.repeatPassword ) { 
    try {
      console.log(value);
      value.adopted = []
      value.fostered = []
      value.saved = []

       
   
     
       
      const data = await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: JSON.stringify({ ...value }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((resp) => {
          console.log('teste',resp)
          if (resp.success === false) {
            toast('Email already in use')
          } else {
            localStorage.setItem("apiKey", resp.token);
            toast("Sucess");
            setTime(3000)

            
          }
        })
      
        if (data) {
        if (data.errors) {
          console.log(data.errors);
        } else {
          console.log("data", data);
        }
      }
     } catch (error) {
      console.log(error);
    } }  
  
    else {
      toast('Repeat the same password please')
    
     } }
    
    else{
      toast('You password need to have al least 8 characters')
    }
    }
   
  
  
  return (
    <div className="modal-auth">
      <div className="overlay">
        <div className="modal-content">
        <ToastContainer />

        <ChakraProvider> 
          <CSSReset/> 
        
        <Box width='4vw'> 
        <Button className="modal-exit-button" width="100%" variant='outline'  onClick={toggleModal} colorScheme="red" size='s' marginTop="0px" marginLeft ='12vw' marginBottom='2vh' >
        Close
      </Button> </Box>
          <h1 className="h1-modal-content">Create your account </h1>

          <form onSubmit={(e) => handleSubmit(e)}>

          <FormControl marginBottom="10px">
     
     <FormLabel> Name</FormLabel>
  
       <Input   onChange={(e) => setValue({ ...value, name: e.target.value })}
            
              className="input-modal"
              type="text"
              id="name" />
         

      </FormControl>

            {/* <label className="label-name" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              className="input-modal"
              type="text"
              id="name"
            /> */}

  <FormControl marginBottom="10px">
<FormLabel> LastName</FormLabel>
  
  <Input     onChange={(e) => setValue({ ...value, lastName: e.target.value })}
   
              className="input-modal"
              type="text"
              id="LastName"
            />

 </FormControl>

            {/* <label className="label-lastname" htmlFor="LastName">
              Last Name
            </label>
            <input
              onChange={(e) => setValue({ ...value, lastName: e.target.value })}
              className="input-modal"
              type="text"
              id="LastName"
            /> */}

<FormControl marginBottom="10px">
<FormLabel> Number</FormLabel>
  
  <Input       onChange={(e) => setValue({ ...value, number: e.target.value })}
  placeholder={'(xx) xxx-xxxx'}
              className="input-modal"
              type="text"
              id="number"
            />

 </FormControl>



            {/* <label className="label-number" htmlFor="number">
              Phone Number
            </label>
            <input
              onChange={(e) => setValue({ ...value, number: e.target.value })}
              className="input-modal"
              type="text"
              id="number"
            /> */}
            

            <FormControl marginBottom="10px">
<FormLabel> Email</FormLabel>
  
  <Input        onChange={(e) =>  {setValue({ ...value, email: e.target.value })} }
              className="input-modal"
              type="email"
              id="e-mail"
            />

 </FormControl>

            {/* <label className="label-email" htmlFor="e-mail">
              Email
            </label>
            <input
              onChange={(e) =>  {setValue({ ...value, email: e.target.value })} }
              className="input-modal"
              type="email"
              id="e-mail"
            /> */}


<FormControl marginBottom="10px">
<FormLabel> Password</FormLabel>
  
  <Input        onChange={(e) => setValue({ ...value, password: e.target.value })}
              className="input-modal"
              type="password"
              id="pass"
              placeholder={'Choose  your password'}
            />
 </FormControl>

            {/* <label className="label-pass" htmlFor="pass">
              Password
            </label>
            <input
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              className="input-modal"
              type="password"
              id="pass"
            /> */} 
            <FormControl marginBottom="10px">
<FormLabel>Repeat Password</FormLabel>
  
  <Input         onChange={(e) => setValue({...value,repeatPassword : e.target.value})}
  placeholder={'Repeat your password'}
              className="input-modal"
              type="password"
              id="passConfirmation"
            />
 </FormControl>

            {/* <label
              className="label-passConfirmation"
              htmlFor="passConfirmation"
            >
              Repeat your Password{" "}
            </label>
            <input
            onChange={(e) => setValue({...value,repeatPassword : e.target.value})}
              className="input-modal"
              type="password"
              id="passConfirmation"
            /> */}
          <Button className="submit-button-auth" type='submit' onClick={handleSubmit} colorScheme='linkedin'  marginTop="20px" width="100%">
        SignUp
      </Button>
      

          
           
          </form>
          </ChakraProvider>
        </div>
      </div>
    </div>
  ); }

export default AuthModal;
