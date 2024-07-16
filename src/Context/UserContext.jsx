import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const usersContext = createContext();

function UserContexts({ children }) {
  const [allUsersArray, setAllUsersArray] = useState('');
  const [dataUpdate, setDataUpdate] = useState({
    name: '',
    lastName: '',
    number: '',
    password: '',
    repeatPass: '',  
  });

  const [userImage, setUserImage] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const apiKey = localStorage.getItem('apiKey')

  
  useEffect(() => {
    axios.get("http://localhost:3000/user").then((res) => setAllUsersArray(res.data));
  }, []);

  useEffect(() => {
    const objectStorage = localStorage.getItem("userLogedData");
    const objectParsed = JSON.parse(objectStorage);
    console.log("Object Parsed", objectParsed);
    setDataUpdate(objectParsed);

  },[apiKey])

  const updateUserInitialValues = (userData) => {
    setDataUpdate({
    name: userData.name,
    lastName: userData.lastName,
    number: userData.number

    })

  }

  return (
    <usersContext.Provider value={{ allUsersArray,setAllUsersArray,dataUpdate,setDataUpdate,userImage,setUserImage,isLoading,setIsLoading,updateUserInitialValues}}>
      {children}
    </usersContext.Provider>
  );
}

export default UserContexts;
