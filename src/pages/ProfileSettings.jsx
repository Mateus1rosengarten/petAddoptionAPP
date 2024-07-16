import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { usersContext } from "../Context/UserContext";
import { useNavigate } from "react-router";
import Form from "../ComponentsProfileSettings/Form";
import { ChakraProvider, CSSReset, Stack } from "@chakra-ui/react";
import "../ComponentsProfileSettings/Form.css";
import { toast, ToastContainer } from "react-toastify";

function ProfileSettings() {
  const [userData, setUserData] = useState(undefined);
  const [imgValue, setImgValue] = useState(undefined);
  const [updatedObject, setUpdatedObject] = useState(undefined);  
  const {dataUpdate,userImage,isLoading,setIsLoading} = useContext(usersContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('initial Values',dataUpdate);
    const objectStorage = localStorage.getItem("userLogedData");
    const objectParsed = JSON.parse(objectStorage);
    console.log("Object Parsed", objectParsed);
    setUserData(objectParsed);
    
    if (objectParsed?.id) {
      axios.get(`http://localhost:3000/user/${objectParsed.id}`).then((res) => {
        console.log("user Image URL", res.data.image);
        setImgValue(res.data.image);
      });
    }
  }, []);


  useEffect(() => {
    setUpdatedObject(dataUpdate);
  }, [dataUpdate]);


  const handleUpdate = async () => {
    try {
      
      const response = await axios.post(
        `http://localhost:3000/update/${userData.email}`,
        {
          userData: dataUpdate,
        }
      );

      if (response.data.success === false) {
        console.log("NO RESPONSE");
        return;
      }

      if (
        dataUpdate &&
        dataUpdate.name &&
        dataUpdate.lastName &&
        dataUpdate.number
      ) {
        setUpdatedObject(dataUpdate);
        setUserData(dataUpdate);

      }
      
      setIsLoading(false);
      setTimeout(() => {
        navigate('/search');
      }, 2000);
      toast(`Informacoes atualizadas,Obrigado/a ${dataUpdate.name}`);
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const handleUpdatePic = async (file) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/updatePic/${userData.email}`,
        {
          userData: file,
        }
      );

      if (response.data.success === false) {
        console.log("NO RESPONSE");
        return;
      }

      if (userImage) {
        setImgValue(userImage)

      }

      toast(`Foto atualizada,Obrigado/a ${userData.name}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during update:", error);
      toast(`Insira fotos apenas nos formatos png ou jpeg`);

    }
  };

  return (
    <>
      <Stack direction="row" spacing={4}></Stack>
      {userData  && (
        <ChakraProvider>
          <CSSReset />
          <Form
            handleUpdate={handleUpdate}
            handleUpdatePic={handleUpdatePic}
            nameValue={dataUpdate.name || userData.name}
            lastNameValue={dataUpdate.lastName || userData.lastName}
            numberValue={dataUpdate.number || userData.number}
            imageValue={userImage || dataUpdate.image}
            isLoading={isLoading}
          />
        </ChakraProvider>
      )}

      <ToastContainer />
    </>
  );
}
export default ProfileSettings;
