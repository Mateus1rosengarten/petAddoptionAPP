import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const authStates = createContext();

function AuthContext({ children }) {
  const [registerValue, setRegisterValue] = useState({});
  const [loginObject, setLoginObject] = useState(undefined);
  const [isUserLoged, setIsUserLoged] = useState(
    Boolean(localStorage.getItem("apiKey"))
  );


  const [userLogedData, setUserLogedData] = useState(() => {
    const savedUserData = localStorage.getItem("UserLogedData");
    return savedUserData
    ? JSON.parse(savedUserData)
    : {
    name: undefined,
    lastName: undefined,
    id: undefined,
    email: undefined,
    number: undefined,
    status: false,
    role: "user",
  }});






  

  return (
    <authStates.Provider
      value={{
        isUserLoged,
        setIsUserLoged,
        registerValue,
        setRegisterValue,
        loginObject,
        setLoginObject,
        userLogedData,
        setUserLogedData,
        
      }}
    >
      {children}
    </authStates.Provider>
  );
}

export default AuthContext;
