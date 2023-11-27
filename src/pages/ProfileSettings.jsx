import { useState } from "react";
import SaveButton from "../ComponentsProfileSettings/Savebutton";
import "../ComponentsProfileSettings/Form.css";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import { userStates,update,setUpdate,trigger,setTrigger } from "../Context/UserContext";
import { useEffect } from "react";
import Form from "../ComponentsProfileSettings/Form";
import { ChakraProvider, CSSReset, extendTheme, Stack } from "@chakra-ui/react";

import { toast,ToastContainer } from "react-toastify";

function ProfileSettings() {
  const {
    authState,
    setAuthState,
    value,
    setValue,
    tokenValue,
 } = useContext(authStates);
  const { userList, setUserList } = useContext(userStates);
  const [isLoading, setIsLoading] = useState(true); // MANIPULATE ASSYNCRONUS
  const navigate = useNavigate();
  const { user } = useContext(userStates); // ARRAY WITH ALL USERS AND ALL MONGO INFO
  const { update ,setUpdate ,} = useContext(userStates); // ARRAY WITH INFO UPDATED
  const [useUpdateState, setUseUpdateState] = useState(false); // STATE TO CONTROL UPDATE PLACEHOLDERS
  const [updateObject ,setUpdateObject] = useState(''); // OBJECT WITH INFOS UPDATED
  const [imgValue,setImgValue ] = useState('');
  const [ trigger,setTrigger] = useState(false)
  const [pictureLog,setPictureLog] = useState('')
  let userFullInfo

  useEffect(() => {
    setTrigger(false)
    // console.log('1',user)
    console.log('VALUE ON MOUTH',value)
    // console.log('3',useUpdateState)
    console.log('UPDATED OBJETC ON MOUTH',updateObject)
    console.log('IMG VALUE ? ON MOUTH',imgValue)
    

  },[])

  useEffect(() => {

    setPictureLog(imgValue)
    

  },[])

  useEffect(() => {
  setUpdate(update)
  },[update])

  useEffect(() => {
    // This code will run whenever the 'update' state changes
    console.log('Updated update state:', update);
  
    // You can trigger any additional actions here, if needed
  }, [update]);
  



  useEffect(() => {
    if (value.data?.id) {

      console.log('value',value)
      
      axios.get(`http://localhost:3000/user/${value.data.id}`).then((res) => {
        console.log("resp-user", res.data);
        userFullInfo = res.data;
        
        console.log("userinfo", userFullInfo.image);
        setImgValue(userFullInfo.image);
        
      });
    }
  }, []);



  useEffect(() => {
    setUpdateObject(update)

  },[update])

  let response;

  useEffect(() => {                                                                    // LOADING SOME USER DATA AND POPULATING VALUE STATE MAYBE I CAN DELETE BECAUSE I ALREDY HAVE VALUE DATA ON MOUTH!!!
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
          console.log("response AUTH", response.data);
          if (response.data) setValue(response);
          console.log('value',value)
          setIsLoading(false);
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
   
  }, []);



  setTimeout(() => {                            // MANIPULATING ASYNCRONUS 
 
    setUserList(true);

  
  }, 500);






  const handleUpdate = () => {                                           // UPDATE THE USER INTO MONGODB!!!

 
    console.log(authState.email);
    console.log('update on begin of HandleUpdate functio AAAAAAAA' ,update)
    
 
      axios
      .post(`http://localhost:3000/update/${authState.email}`, {
        userData: update, // Pass the entire update object
      })
      .then((res) => {
        if (res.data.success === false) {
          let message = res.data.message;
          alert(message);
        } else {
          if (update && update.name && update.lastName && update.number) {
            setValue(update);
            setUpdateObject(update)
          }
          setUseUpdateState(true);
          setTimeout(() =>
            { navigate('/search')},2000)
            toast(`Profile edited with sucess Thanks ${update.name} `)
          console.log('udpateState object in the end',update)
          console.log('update Value state in the end')
          console.log('updateObject state in the end',updateObject)
          axios
          .post(`http://localhost:3000/update/${authState.email}`, {
            userData: update, // Pass the entire update object
          })
        }
      });
      
  
    
  
};

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////






  return (
    
    <> 
      
      {isLoading  ? (
        <Stack direction="row" spacing={4}></Stack>
      ) : ( 
        userList  && (
          <ChakraProvider>
            <CSSReset />
            <Form
  handleUpdate={handleUpdate}
  nameValue={updateObject.name || value.data.name}
  lastNameValue={updateObject.lastName || value.data.lastName}
  numberValue={updateObject.number || value.data.number}
  imageValue={imgValue || userFullInfo || update.image}
  ImgFromMongo={pictureLog} // Pass userImage as ImgFromMongo
/>
          </ChakraProvider>
        )
       
      )} 
       <ToastContainer />
              </> 
  );
}
export default ProfileSettings;
