import { useContext, useEffect, useState } from "react";
import { authStates } from "../Context/AuthContext";
import { faUser, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterModal.css";

import {
  Box,
  FormControl,
  Input,
  Button,
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";
import { globalStates } from "../Context/GlobalContexts";
import axios from "axios";
import { usersContext } from "../Context/UserContext";

function RegisterModal({ toggleModal }) {
  const navigate = useNavigate();
  const [numberFormated, setNumberFormated] = useState('');
  const { setIsModal } = useContext(globalStates);
  const {updateUserInitialValues} = useContext(usersContext)
  const { registerValue, setRegisterValue, setIsUserLoged } = useContext(authStates);

 
  function setTime(time) {
    setTimeout(() => {
      navigate("/search");
    }, time);
  }

  const formatTelNumber = (number) => {
    let cleanedNumber = number.replace(/\D/g, "");
    cleanedNumber = cleanedNumber.slice(0, 11);

    if (cleanedNumber.length === 10) {
      return `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
        2,
        6
      )}-${cleanedNumber.slice(6)}`;
    } else if (cleanedNumber.length === 11) {
      return `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
        2,
        7
      )}-${cleanedNumber.slice(7)}`;
    } else {
      return cleanedNumber;
    }
  };

  function deleteKeysFromObject(obj, keys) {
    keys.forEach((key) => {
      delete obj[key];
    });
    return obj;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !registerValue.name ||
      !registerValue.lastName ||
      !registerValue.number ||
      !registerValue.email ||
      !registerValue.password
    ) {
      toast("Prencha todos os requerimentos");
      return;
    }

    if (registerValue.number < 10) {
      toast("Insira um numero valido");
    }

    if (!emailRegex.test(registerValue.email)) {
      toast("Insira um Email valido");
      return;
    }
    if (registerValue.password.length >= 8) {
      if (registerValue.password === registerValue.repeatPassword) {
        try {
          console.log(registerValue);
          registerValue.saved = [];

          const response = await axios.post(
            "http://localhost:3000/signup",
            { ...registerValue },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = response.data;
          console.log("data received from register function", data);
          if (data.success === false) {
            toast("Ja temos uma conta associada a este Email");
          } else {
            localStorage.setItem("apiKey", data.token);
            setIsUserLoged(true);
            toast("Conta criada com sucesso!");
            const keysToDelete = ["saved", "password", "repeatPassword"];
            const updatedRegisterValue = deleteKeysFromObject(registerValue,keysToDelete);
            updateUserInitialValues(updatedRegisterValue);
            localStorage.setItem(
              "userLogedData",
              JSON.stringify(updatedRegisterValue)
            );
            setIsModal(false);
            setTime(3000);
          }
        } catch (error) {
          console.log("ERROR IN REGISTER FUNCTION", error);
        }
      } else {
        toast("As senhas devem ser iguais");
        return;
      }
    } else {
      toast("Sua senha deve ter no minimo 8 caracteres");
      return;
    }
  };

  return (
    <div className="modal-auth">
      <div className="overlay">
        <div className="div-modal-content">
          <div className="modal-content-sign">
            <ToastContainer />
            <ChakraProvider>
              <CSSReset />
              <div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="40vw"
                  marginBottom="5vh"
                >
                  <h1 className="h1-modal-content">
                    <FontAwesomeIcon
                      style={{
                        marginRight: "0.5vw",
                        height: "3.5vh",
                        color: "#1DA1F2",
                      }}
                      icon={faPaw}
                    />
                    Crie sua Conta
                  </h1>
                  <Button
                    className="button-exit-sign"
                    width="100%"
                    variant="outline"
                    onClick={toggleModal}
                    colorScheme="red"
                  >
                    Fechar
                  </Button>
                </Box>

                <form onSubmit={(e) => handleSubmit(e)}>
                  <FormControl marginBottom="1vh">
                    <Input
                      onChange={(e) =>
                        setRegisterValue({
                          ...registerValue,
                          name: e.target.value,
                        })
                      }
                      placeholder="Nome"
                      className="input-sign"
                      type="text"
                      id="name"
                    />
                  </FormControl>

                  <FormControl marginBottom="1vh">
                    <Input
                      onChange={(e) =>
                        setRegisterValue({
                          ...registerValue,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Sobrenome"
                      className="input-sign"
                      type="text"
                      id="LastName"
                    />
                  </FormControl>

                  <FormControl marginBottom="1vh">
                    <Input
                      onChange={(e) => {
                        const formatedNumber = formatTelNumber(e.target.value);
                        setNumberFormated(formatedNumber);
                        setRegisterValue({
                          ...registerValue,
                          number: formatedNumber,
                        });
                      }}
                      value={numberFormated}
                      placeholder="Telefone para Contato"
                      className="input-sign"
                      type="text"
                      id="number"
                    />
                  </FormControl>

                  <FormControl marginBottom="1vh">
                    <Input
                      onChange={(e) => {
                        setRegisterValue({
                          ...registerValue,
                          email: e.target.value,
                        });
                      }}
                      placeholder="Email"
                      className="input-sign"
                      type="email"
                      id="e-mail"
                    />
                  </FormControl>

                  <FormControl marginBottom="1vh">
                    <Input
                      onChange={(e) =>
                        setRegisterValue({
                          ...registerValue,
                          password: e.target.value,
                        })
                      }
                      className="input-sign"
                      type="password"
                      id="pass"
                      placeholder="Senha"
                    />
                  </FormControl>

                  <FormControl marginBottom="1vh">
                    <Input
                      onChange={(e) =>
                        setRegisterValue({
                          ...registerValue,
                          repeatPassword: e.target.value,
                        })
                      }
                      placeholder="Repita sua Senha"
                      className="input-sign"
                      type="password"
                      id="passConfirmation"
                    />
                  </FormControl>

                  <Button
                    className="button-submit-login"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Cadastrar
                  </Button>
                </form>
              </div>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
