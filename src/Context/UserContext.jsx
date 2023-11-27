import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const userStates = createContext();

function UserContexts({ children }) {
  const [user, setUser] = useState('');
  const [userList,setUserList] = useState('')
  const [ trigger,setTrigger] = useState(false)
  const [update, setUpdate] = useState({
    name: '',
    lastName: '',
    number: '',
    password: "",
    repeatPass: "",
    bio: "",
   
    
  });

  const [userImage, setUserImage] = useState(''); // Manage user image in a single state  /// STATE THAT CONTAINS IMAGE 
  
  useEffect(() => {
    axios.get("http://localhost:3000/user").then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    console.log('ALL USERS',user)

  },[user])



  return (
    <userStates.Provider value={{ user, setUser,userList,setUserList,update,setUpdate,userImage,setUserImage,trigger,setTrigger}}>
      {children}
    </userStates.Provider>
  );
}

export default UserContexts;
