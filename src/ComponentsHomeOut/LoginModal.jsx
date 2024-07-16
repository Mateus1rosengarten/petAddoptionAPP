import "./RegisterModal.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  FormControl,
  Input,
  Button,
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";
import { globalStates } from "../Context/GlobalContexts";
import { usersContext } from "../Context/UserContext";

function LoginModal({ toggleModal }) {
  const { loginObject,setLoginObject,setIsUserLoged,setUserLogedData } = useContext(authStates);
  const {updateUserInitialValues} = useContext(usersContext)
  const {setIsModal} = useContext(globalStates);


  const navigate = useNavigate();

  function setTime(time) {
    setTimeout(() => {
      navigate("/search");
    }, time);
  }

  const handleLogin = async () => {
    if (loginObject.email && loginObject.password) {
      try {
        const response = await axios.post("http://localhost:3000/login",{ ...loginObject });
        console.log('response login api',response);
        localStorage.setItem("apiKey",response.data.token)
      
        setIsUserLoged(true);
        setIsModal(false)
        toast("Successo,entrando na sua conta");
        fetchUserData();
        setTime(3000);
        console.log('Login Response Object',loginObject)
      } catch (error) {
        toast("Email ou senha incorretos");
        console.log("ERROR IN LOGIN FUNCTION", error);
      }
    } else {
      toast("Prencha todos os requerimentos");
    }
  };

  const fetchUserData = async () => {
    const acessToken = localStorage.getItem("apiKey")
    if (!acessToken){
    console.log('No Token avaible')
    }

    try {
      let response = await axios.get("http://localhost:3000/auth", {
        headers: {
          accessToken: acessToken,
        },
      });
      if (response.data.error) {
        console.log("Error geting Response Data Object", response.data.error);
      } 
      else {
        console.log("Sucess geting Response Data Object", response.data);
        
        const userData = {
          id : response.data.id,
          name: response.data.name,
          lastName: response.data.lastName,
          number: response.data.number,
          email: response.data.email,
          status: true,
        }
        updateUserInitialValues(userData);
        setUserLogedData(userData);
        localStorage.setItem("userLogedData",JSON.stringify(userData))
      }
    } catch (error) {
      console.log("Error in FetchUserData Function",error);
    }
  };
  

  return (
    <>
      <div className="modal-auth">
        <div className="overlay">
          <div className="div-modal-content"> 
          <div className="modal-content-login">
            <ToastContainer />

            <ChakraProvider>
              <CSSReset />
              <div className="login-content">
         
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="-5vh"
                marginBottom="7vh"
                width="40vw"
              >
               
                <h1 className="h1-modal-content"><FontAwesomeIcon style={{marginRight:'1vw',height:'3.5vh',color:'#1DA1F2'}} icon={faPaw} />Acessar Conta</h1>
                <Button
                  className="button-exit-login"
                  width="100%"
                  variant="outline"
                  onClick={toggleModal}
                  colorScheme="red"
                >
                  Fechar
                </Button>
              </Box>

              <FormControl marginBottom="4vh">
                <Input
                  className="inputs-login"
                  type="email"
                  onChange={(e) =>
                    setLoginObject({ ...loginObject, email: e.target.value })
                  }
                  id="login"
                  placeholder="Email"
                />
              </FormControl>

              <FormControl marginBottom="4vh">
                <Input
                  className="inputs-login"
                  type="password"
                  id="login"
                  placeholder="Senha"
                  onChange={(e) =>
                    setLoginObject({ ...loginObject, password: e.target.value })
                  }
                />
              </FormControl>

              <Button className="button-submit-login" onClick={handleLogin}>
                Entrar
              </Button>
              </div>
            </ChakraProvider>
            
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
