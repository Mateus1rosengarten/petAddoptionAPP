import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { toast, ToastContainer } from "react-toastify";


function Form() {

  const formSize = window.innerWidth >= 768 ? '33vw' :'2vw';
  const maxWidthSize = window.innerWidth >= 768 ? '30vw' : '100vw'
  

  const navigate = useNavigate();

  const [petInfo, setPetInfo] = useState({
    type: "",
    name: "",
    heigth: "",
    weight: "",
    color: "",
    bio: "",
    breed: "",
    image: "",
  });
  const [petPhoto, setPetPhoto] = useState("");        

  const type = petInfo.type;
  const name = petInfo.name;
  const heigth = petInfo.heigth;
  const weight = petInfo.weight;
  const color = petInfo.color;
  const bio = petInfo.bio;
  const breed = petInfo.breed;
  let image = petInfo.image;

  const addPet = () => {
    if (!type && type !== "Dog" && "Cat") {
      toast("Please insert just Cat or Dog");
    } else if (!name || name.length <= 2) {
      toast("Please Insert a valid Name");
      return;
    } else if (!heigth || heigth > 200) {
      toast("Please insert a valid Heigth");
      return;
    } else if (!weight || weight > 120) {
      toast("Please insert a valid weight");
      return;
    } else if (!color) {
      toast("Please insert a color");
      return;
    } else if (!bio) {
      toast("Please insert  a very short biography");
      return;
    } else if (!breed) {
      toast("Please insert a breed");
      return;
    } else if (!image) {
      toast("Please insert image");
    }

    
    if (image)
      axios
        .post("http://localhost:3000/petadd", {
          type,
          name,
          heigth,
          weight,
          color,
          bio,
          breed,
          image,
        })
        .then(() => {
          setTimeout(() => {
            navigate("/search");
          }, 2000);
          toast(`Pet Added with Sucess !`);
        });
  };

  const addPic = async () => {
    if (petPhoto) {
      const formData = new FormData();
      formData.append("file", petPhoto);

      try {
        const response = await fetch("http://localhost:3000/petadd/pic", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();

          image = data.url;
        } else {
          console.log("ERROR GETTING RESPONSE");
        }
      } catch (error) {
        console.log("ERROR FETCHING DATA", error);
      }
    }
  };

  useEffect(() => {
    addPic();
  }, [petPhoto]);

  return (
    <>
      <Box
        maxWidth={maxWidthSize}
        margin="auto"
        padding="2%"
        marginTop="15vh"
        marginLeft={formSize}
      >
        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Type
          </FormLabel>
          <Input
            placeholder="Dog/Cat"
            type="text"
            onChange={(e) => setPetInfo({ ...petInfo, type: e.target.value })}
            id="typeOf"
          />
        </FormControl>

        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Name
          </FormLabel>
          <Input
            placeholder="Name"
            onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
            type="text"
            id="nameOf"
          />
        </FormControl>

        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Heigth
          </FormLabel>
          <Input
            type="number"
            placeholder="Cm"
            onChange={(e) =>
              e.target.value.length !== 0 &&
              setPetInfo({ ...petInfo, heigth: e.target.value })
            }
            id="heigthOf"
          />
        </FormControl>

        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Weight
          </FormLabel>
          <Input
            type="number"
            placeholder="Kg"
            onChange={(e) => setPetInfo({ ...petInfo, weight: e.target.value })}
            id="weightOf"
          />
        </FormControl>

        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Color
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => setPetInfo({ ...petInfo, color: e.target.value })}
            id="colorOf"
            placeholder="Pet Colors"
          />
        </FormControl>

        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Bio
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => setPetInfo({ ...petInfo, bio: e.target.value })}
            id="bioOf"
            placeholder="What she/he Loves?"
          />
        </FormControl>

        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} />
            Breed
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })}
            id="breedOf"
            placeholder="Breed of Animal"
          />
        </FormControl>

        <FormControl marginBottom="2vh">
          <Input
            type="file"
            name="image"
            id="imageOf"
            onChange={(e) => {
              setPetPhoto(e.target.files[0]);
            }}
          ></Input>
        </FormControl>

        <Button
          type="submit"
          style={{ color: "#1DA1F2 !important" , }}
          onClick={addPet}
          colorScheme="linkedin"
          marginTop="2vh"
          width="100%"
         
          
          
        >
          ADD PET
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
}

export default Form;
