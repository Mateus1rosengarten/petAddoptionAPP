import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const authStates = createContext();

function AuthContext({ children }) {
  const [value, setValue] = useState({});

  const [tokenValue, setTokenValue] = useState("");
  const [loginObject, setLoginObject] = useState('');
  const [authState, setAuthState] = useState({
    name: '',
    lastName: '',
    id: 0,
    email: '',
    number: '',
    status: false,
    role: "user",
  });

  useEffect(() => {
    setTokenValue(localStorage.getItem("apiKey"));
   
  }, []);
  

 let response 

// {setTimeout(() => {
//   setLoginObject(response)
//   console.log('agora',loginObject)
  
// }, 10000);}

  useEffect(() => {
    const fetchData = async () => {
      try {
        response = await axios.get("http://localhost:3000/auth", {
          headers: {
            accessToken: tokenValue,
          },
        });
        if (response.data.error) {
          console.log("No success in AUTH", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("AUTH USER INFOS", response.data);
          console.log('token',tokenValue)
          setAuthState({
            name: response.data.name,
            lastName : response.data.lastName,
            number : response.data.number,
            email: response.data.email,
            status: true,
            role:response.data.role
          })
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
  }, [tokenValue]);

  return (
    <authStates.Provider
      value={{
        value,
        setValue,
        tokenValue,
        setTokenValue,
        loginObject,
        setLoginObject,
        authState,
        setAuthState,
      }}
    >
      {children}
    </authStates.Provider>
  );
}

export default AuthContext;
