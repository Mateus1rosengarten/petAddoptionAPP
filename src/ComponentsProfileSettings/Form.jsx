import { useContext, useState } from "react";
import "./Form.css";
import { Box, FormControl, FormLabel, Input, Button,Spinner } from "@chakra-ui/react";
import { PhoneIcon, LockIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { usersContext } from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

function Form({
  handleUpdate,
  handleUpdatePic,
  nameValue,
  lastNameValue,
  numberValue,
  imageValue,
  
}) {
  const navigate = useNavigate();

  const [numberFormated, setNumberFormated] = useState('');
  const { userImage, setUserImage,dataUpdate, setDataUpdate,isLoading,setIsLoading } = useContext(usersContext);
 
    const objectStorage = localStorage.getItem("userLogedData");
    const objectParsed = JSON.parse(objectStorage);
    console.log("Object Parsed", objectParsed);
    


  useEffect(() => {
    console.log("new photo", userImage);
  }, [userImage]);

  const handleChanges = () => {
    if (dataUpdate.password !== dataUpdate.repeatPass) {
      toast("Insira a mema senha");
    } else if (dataUpdate.password?.length <= 8) {
      toast("A senha deve ter ao minimo 8 caracteres");
    } else if (!dataUpdate.name || dataUpdate.name.length < 3) {
      toast("Insira um nome valido");
    } else if (!dataUpdate.lastName || dataUpdate.lastName.length < 3)
      toast("Insira um sobrenome valido");
    else if (dataUpdate.number?.length < 10)
      toast("Insira um numero de telefone valido com DDD");
    else {
     
      handleUpdate();
      console.log("update On UploadImage Function", dataUpdate);
    }
  };

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

  const handleChangePic = (event) => {
    setIsLoading(true);
    if (event.target.files[0]) {
      setUserImage(event.target.files[0])
      uploadImage(event.target.files[0]);
    };
    console.log('User Image in handleChangePic Function',userImage)

   

  };

  const uploadImage = async (file) => {
    console.log('User Image in uploadImage Function',userImage)
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log("FORMDATA", formData);

      try {
        const response = await axios.post("http://localhost:3000/useradd/pic", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
      
        console.log(
          "response after sending the formdata with the image to cloud",
          response
        );
      
        if (response.status !== 200) {
          console.log("Failed get response from request");
          return;
        }
      
        const data = response.data;
        console.log("IMAGE URL send by cloud", data.url);
        dataUpdate.image = data.url;
     
        setUserImage(data.url);
        handleUpdatePic(data.url);
        
      } catch (error) {
        console.log("Error in upload image function", error);
        setIsLoading(false)
        toast(`Erro : Insira fotos apenas nos formatos png ou jpeg`);

      }
    }
  };

  return (
    <>
      <div className="div-profile-page">
        <Box width="40vw" marginRight="10vw" marginTop="8vh" marginLeft="5vw">
          <FormControl marginBottom="20px">
            <FormLabel fontFamily={"Montserrat"}>
              <CheckCircleIcon mr={2} style={{ color: "brown" }} />
              Nome
            </FormLabel>

            <Input
              placeholder={nameValue}
              type="text"
              onChange={(e) =>
                setDataUpdate({ ...dataUpdate, name: e.target.value })
              }
              id="name"
            />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel fontFamily={"Montserrat"}>
              <CheckCircleIcon mr={2} style={{ color: "brown" }} />
              Sobrenome
            </FormLabel>
            <Input
              type="text"
              placeholder={lastNameValue}
              onChange={(e) =>
                e.target.value.length !== 0 &&
                setDataUpdate({ ...dataUpdate, lastName: e.target.value })
              }
              id="lastName"
            />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel fontFamily={"Montserrat"}>
              <PhoneIcon mr={2} style={{ color: "brown" }} />
              Telefone para Contato
            </FormLabel>
            <Input
              value={numberFormated}
              type="tel"
              placeholder={numberValue}
              onChange={(e) => {
                const formatedNumber = formatTelNumber(e.target.value);
                setNumberFormated(formatedNumber);
                setDataUpdate({ ...dataUpdate, number: formatedNumber });
              }}
              id="phone"
            />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel fontFamily={"Montserrat"}>
              <LockIcon mr={2} style={{ color: "brown" }} />
              Nova senha{" "}
            </FormLabel>
            <Input
              type="password"
              placeholder="Insira nova"
              onChange={(e) =>
                e.target.value.length !== 0 &&
                setDataUpdate({ ...dataUpdate, password: e.target.value })
              }
              id="pass"
            />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel fontFamily={"Montserrat"}>
              <LockIcon mr={2} style={{ color: "brown" }} />
              Repita nova senha
            </FormLabel>
            <Input
              type="password"
              placeholder="Repita mesma senha"
              onChange={(e) =>
                e.target.value.length !== 0 &&
                setDataUpdate({ ...dataUpdate, repeatPass: e.target.value })
              }
              id="passConfirmation"
            />
          </FormControl>

          <Button
            style={{ backgroundColor: "#87CEEB", color: "#1DA1F2 !important" }}
            onClick={handleChanges}
            fontFamily={"Montserrat"}
            fontSize={"1.6vw"}
            width="100%"
          >
            <FontAwesomeIcon
              icon={faPaw}
              style={{ marginRight: "0.5vw" }}
              size="sm"
            />
            <FontAwesomeIcon
              icon={faPaw}
              style={{ marginRight: "0.5vw" }}
              size="sm"
            />
            <FontAwesomeIcon
              icon={faPaw}
              style={{ marginRight: "1.5vw" }}
              size="sm"
            />
            Salvar
            <FontAwesomeIcon
              icon={faPaw}
              style={{ marginLeft: "1.5vw", marginRight: "0.5vw" }}
              size="sm"
            />
            <FontAwesomeIcon
              icon={faPaw}
              style={{ marginRight: "0.5vw" }}
              size="sm"
            />
            <FontAwesomeIcon
              icon={faPaw}
              style={{ marginRight: "0.5vw" }}
              size="sm"
            />
          </Button>
        </Box>
        <Box
          width="40vw"
          marginTop="12vh"
          display="flex"
          flexDirection="column"
        >
          <img
            src={
              imageValue ||
              "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
            }
            alt=""
            className="user-img"
          />
          <FormControl>
            <Input
              width="26vw"
              marginLeft="2vw"
              type="file"
              name="image"
              id="imageOf"
              onChange={handleChangePic}
            ></Input>
            { isLoading && <Spinner marginLeft='1vw' marginTop='0vh'/> }
          </FormControl>
          {objectParsed.id === '650494681a2ddc4735d4aaeb' &&
          <Button
            backgroundColor="#87CEEB"
            width="20vw"
            marginTop="1vh"
            marginLeft="5vw"
            fontSize="1.6vw"
            onClick={() => navigate("/adm")}
          >
          
            {" "}
            <NavLink to={"/adm"}>Dash</NavLink>
          </Button>}
        </Box>
      </div>
    </>
  );
}

export default Form;
