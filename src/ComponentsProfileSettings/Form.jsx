import { useContext, useState } from "react";
import "./Form.css";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import {
  EmailIcon,
  PhoneIcon,
  LockIcon,
  EditIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userStates, userImage,setUserImage } from "../Context/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { upload } from "@testing-library/user-event/dist/upload";

function Form({
  handleUpdate,
  nameValue,
  lastNameValue,
  numberValue,
  imageValue,
  ImgFromMongo,
}) {

  const { userImage,setUserImage } = useContext(userStates)
  const { update, setUpdate } = useContext(userStates); /// STATE THAT REPRESENTS THE NEW OBJECT INFO
  const { user } = useContext(userStates); // ARRAY WITH ALL USERS AND ALL MONGO INFO
  const {trigger,setTrigger} = useContext(userStates)

  useEffect(() => {
    console.log("new photo", userImage);
  }, [userImage]);

  const handleChanges = () => {
    /// AFTER CLICK SAVE CHANGES DO ALL THE MAGIC

    uploadImage();

    if (update.password !== update.repeatPass) {
      toast("Please insert the same Password");
    } else if (update.password?.length <= 8) {
      toast("The password needs to contain at least 8 characteres");
    } else if (!update.name || update.name.length < 3) {
      toast("Please insert a valid Name");
    } else if (!update.lastName || update.lastName.length < 3)
      toast("Please insert a valid LastName");
    else if (update.numberValue?.length > 5)
      toast("Please insert a valid Number");
    else {
      console.log("update On UploadImage Function", update);
       
      
     
    }
  };

  // useEffect(() => {
  //   uploadImage()
  // },[userImage])



  const uploadImage = async () => {                                             //// SENDING TO IMAGE CLOUDINARY SERVER AND RECEVEING LINK
    if (userImage) {
    const formData = new FormData();
    formData.append("file", userImage);
    console.log("FORMDATA", formData);

    try {
      const response = await fetch("http://localhost:3000/useradd/pic", {
        method: "POST",
        body: formData,
      });

      console.log(
        "response after sending the formdata with the image to cloud",
        response
      );

      if (response.ok) {  
        console.log("response to send new pic to CLOUD", response);
        const data = await response.json();
        console.log("response to send new pic in json format:", data);
        console.log("IMAGE URL send by cloud", data.url); //
        const imageUrl = data.url;

        try {

          update.image = data.url
          // setUpdate((prevUpdate) => ({
          //   ...prevUpdate,
          //   image: imageUrl, // Update the user's image URL
          // }));

          setTimeout(() => {
            setTrigger(true)
            console.log('upInsideTimeOut3s',update)
            
          }, 10000);


          setUserImage(imageUrl);
        } catch (error) {
          console.log("ERRO", error);
        }
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
  
      console.log("UPDATE STATE ON END OF UPLOAD IMG FUNCTION", update);
      console.log("USER IMAGE STATE ON END OF UPLOAD IMG FUNCTION", userImage);
      handleUpdate()
    }
  }};

  return (
    <>
      <img
        src={
      ImgFromMongo ||  userImage || update.image }
        alt=""
        className="user-img"
      />

      <Box
        maxWidth="600px"
        margin="auto"
        padding="20px"
        marginTop="10vw"
        marginLeft="10vw"
      >
        <FormControl marginBottom="20px">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Name
          </FormLabel>

          <Input
            placeholder={nameValue}
            type="text"
            onChange={(e) => setUpdate({ ...update, name: e.target.value })}
            id="name"
          />
        </FormControl>

        <FormControl marginBottom="20px">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Last Name
          </FormLabel>
          <Input
            type="text"
            placeholder={lastNameValue}
            onChange={(e) =>
              e.target.value.length !== 0 &&
              setUpdate({ ...update, lastName: e.target.value })
            }
            id="lastName"
          />
        </FormControl>

        <FormControl marginBottom="20px">
          <FormLabel>
            <PhoneIcon mr={2} />
            Phone Number
          </FormLabel>
          <Input
            type="tel"
            placeholder={numberValue}
            onChange={(e) =>
              e.target.value.length !== 0 &&
              setUpdate({ ...update, number: e.target.value })
            }
            id="phone"
          />
        </FormControl>

        <FormControl marginBottom="20px">
          <FormLabel>
            <LockIcon mr={2} />
            New Password
          </FormLabel>
          <Input
            type="password"
            placeholder="Insert new password"
            onChange={(e) =>
              e.target.value.length !== 0 &&
              setUpdate({ ...update, password: e.target.value })
            }
            id="pass"
          />
        </FormControl>

        <FormControl marginBottom="20px">
          <FormLabel>
            <LockIcon mr={2} />
            Repeat Password
          </FormLabel>
          <Input
            type="password"
            placeholder="Repeat new password"
            onChange={(e) =>
              e.target.value.length !== 0 &&
              setUpdate({ ...update, repeatPass: e.target.value })
            }
            id="passConfirmation"
          />
        </FormControl>

        {/* <FormControl marginBottom="20px">
        <FormLabel><EditIcon mr={2} />Short Biography</FormLabel>
        <Textarea placeholder={ bioValue? bioValue : "Write a short biography about yourself"}  onChange={(e) => e.target.value.length !== 0 && setUpdate({ ...update, bio: e.target.value }) }
          id="bio" />
      </FormControl> */}

        <FormControl position="absolute" right="20vw" top="40vh" width="20vw">
          <Input
            type="file"
            name="image"
            id="imageOf"
            onChange={(e) => {
              setUserImage(e.target.files[0]);
            }}
          ></Input>
        </FormControl>

        <Button
          style={{ color: "#1DA1F2 !important" }}
          onClick={handleChanges}
          colorScheme="linkedin"
          marginTop="20px"
          width="100%"
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
}

export default Form;
