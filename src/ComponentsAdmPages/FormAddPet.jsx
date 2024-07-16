import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import './FormAddPet.css'

function Form() {
  const navigate = useNavigate();

  const [petInfo, setPetInfo] = useState({
    type: '',
    name: '',
    age: '',
    gender: '',
    size: '',
    weight: '',
    bio: '',
    images: [],
  });
  const [petPhoto, setPetPhoto] = useState([]);
  
  const type = petInfo.type;
  const name = petInfo.name;
  const size = petInfo.size;
  const idade = petInfo.age;
  const genero = petInfo.gender
  const weight = petInfo.weight
  const bio = petInfo.bio;
  const images = petInfo.images;

  const objectStorage = localStorage.getItem("userLogedData");
  const objectParsed = JSON.parse(objectStorage)


  // useEffect(() => {
  //   const objectStorage = localStorage.getItem("userLogedData");
  //   objectParsed = JSON.parse(objectStorage);
  //   console.log("Object Parsed", objectParsed);
  // },[])

  const handleTypeChange = (value) => {
    setPetInfo({ ...petInfo, type: value });
  };

  const handleSizeChange = (value) => {
    setPetInfo({ ...petInfo, size: value });
  };

  const handleAgeChange = (value) => {
    setPetInfo({ ...petInfo, age: value });
  };

  const handleGenderChange = (value) => {
    setPetInfo({...petInfo,gender: value})
  }

  const addPet = () => {
    if (!type) {
      toast("Insira Tipo do Pet");
    } else if (!name || name.length <= 2) {
      toast("Insira um Nome valido");
      return;
    } else if (!size) {
      toast("Insira Porte do Pet");
      return;
    } else if (!idade) {
      toast("Insira Idade do Pet");
      return;
    } else if (!bio) {
      toast("Insira uma simples descricao do Pet");
      return;
    } else if (images === 0) {
      toast("Insira ao menos uma foto! (jpeg,jpg ou png)");
      return;
    }
    console.log('objectPars',objectParsed)

    axios
      .post("http://localhost:3000/petadd", {
        type,
        name,
        size,
        idade,
        weight,
        genero,
        bio,
        images: petInfo.images,
        ownerName : objectParsed.name,
        ownerEmail: objectParsed.email,
        ownerNumber : objectParsed.number

      })
      .then(() => {
        setTimeout(() => {
          navigate("/search");
        }, 2000);
        toast(`Pet Adicionado com Sucesso!`);
      });
  };

  const addPic = async () => {
    if (petPhoto.length >= 1) {
      const formData = new FormData();
      petPhoto.forEach((photo) => {
        formData.append("files", photo);
      });

      try {
        const response = await fetch("http://localhost:3000/petadd/pic", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();

          const arrayImages = data.urls;
          setPetInfo((prevState) => ({
            ...prevState,
            images: arrayImages,
          }));
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
      className="form-add-pet"
        display="flex"
        flexDirection="column"
        width="40vw"
        height="95vh"
        margin="2%"
        padding="2%"
      >
        <FormControl marginBottom="2vh">
          <FormLabel fontFamily="Montserrat">
            <CheckCircleIcon mr={2} color="brown" />
            Nome Do Pet
          </FormLabel>
          <Input
            placeholder="Insira nome do pet"
            onChange={(e) =>
              setPetInfo({ ...petInfo, name: e.target.value.slice(0, 20) })
            }
            type="text"
            id="nameOf"
            value={petInfo.name}
          />
        </FormControl>
        <Stack display="flex" flexDirection="row">
          <FormControl marginBottom="2vh">
            <FormLabel fontFamily="Montserrat">
              <CheckCircleIcon mr={2} color="brown" />
              Cachorro ou Gato
            </FormLabel>
            <Stack direction="row">
              <Checkbox
                isChecked={type === "Dog"}
                onChange={() => handleTypeChange("Dog")}
              >
                Cachorro
              </Checkbox>
              <Checkbox
                isChecked={type === "Cat"}
                onChange={() => handleTypeChange("Cat")}
              >
                Gato
              </Checkbox>
            </Stack>
          </FormControl>
  
          <FormControl marginBottom="2vh">
            <FormLabel fontFamily="Montserrat">
              <CheckCircleIcon mr={2} color="brown" />
              Porte
            </FormLabel>
            <Stack direction="row">
              <Checkbox
                isChecked={size === "Pequeno"}
                onChange={() => handleSizeChange("Pequeno")}
              >
                Pequeno
              </Checkbox>
              <Checkbox
                isChecked={size === "Medio"}
                onChange={() => handleSizeChange("Medio")}
              >
                Medio
              </Checkbox>
              <Checkbox
                isChecked={size === "Grande"}
                onChange={() => handleSizeChange("Grande")}
              >
                Grande
              </Checkbox>
            </Stack>
          </FormControl>
        </Stack>
  
        <Stack display='flex' flexDirection="row"
        >
          <FormControl marginBottom="2vh">
            <FormLabel fontFamily="Montserrat">
              <CheckCircleIcon mr={2} color="brown" />
              Idade
            </FormLabel>
            <Stack direction="row">
              <Checkbox
                isChecked={idade === "Filhote"}
                onChange={() => handleAgeChange("Filhote")}
              >
                Filhote
              </Checkbox>
              <Checkbox
                isChecked={idade === "Jovem"}
                onChange={() => handleAgeChange("Jovem")}
              >
                Jovem
              </Checkbox>
              <Checkbox
                isChecked={idade === "Adulto"}
                onChange={() => handleAgeChange("Adulto")}
              >
                Adulto
              </Checkbox>
              <Checkbox
                isChecked={idade === "Idoso"}
                onChange={() => handleAgeChange("Idoso")}
              >
                Idoso
              </Checkbox>
            </Stack>
          </FormControl>
          <FormControl marginBottom="2vh" marginLeft="1vw">
          <FormLabel fontFamily="Montserrat">
            <CheckCircleIcon mr={2} color="brown" />
            Genero
          </FormLabel>
          <Stack direction="row">
            <Checkbox
              isChecked={petInfo.gender === "Femea"}
              onChange={() => handleGenderChange("Femea")}
            >
              Femea
            </Checkbox>
            <Checkbox
              isChecked={petInfo.gender === "Macho"}
              onChange={() => handleGenderChange("Macho")}
            >
              Macho
            </Checkbox>
          </Stack>
        </FormControl>
        </Stack>
  
        
  
        <FormControl marginBottom="2vh">
          <FormLabel>
            <CheckCircleIcon mr={2} color="brown" />
            Peso aproximado (Kg)
          </FormLabel>
          <Input
            type="number"
            placeholder="Insira o peso aproximado do animal"
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 1 && value <= 99) {
                setPetInfo({ ...petInfo, weight: value });
              } else {
                setPetInfo({ ...petInfo, weight: "" });
              }
            }}
            id="weightOf"
            value={petInfo.weight}
          />
        </FormControl>
  
        <FormControl marginBottom="2vh">
          <FormLabel fontFamily="Montserrat">
            <CheckCircleIcon mr={2} color="brown" />
            Caracteristicas/Temperamento
          </FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              setPetInfo({ ...petInfo, bio: e.target.value.slice(0, 165) })
            }
            id="breedOf"
            placeholder="Conte brevemente algo sobre o Pet"
            value={petInfo.bio}
          />
        </FormControl>
  
        <FormControl marginBottom="2vh">
          <FormLabel fontFamily="Montserrat">
            <CheckCircleIcon mr={2} color="brown" />
            Fotos do Pet (Escolher Ate 3 fotos)
          </FormLabel>
          <Input
            type="file"
            name="image"
            id="imageOf"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files).slice(0, 3);
              setPetPhoto(files);
            }}
          />
        </FormControl>
  
        <Button
          type="submit"
          style={{ color: "#1DA1F2 !important" }}
          onClick={addPet}
          colorScheme="linkedin"
          marginTop="2vh"
          width="100%"
        >
          Clique Aqui para registrar o Pet
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
  
}

export default Form;
