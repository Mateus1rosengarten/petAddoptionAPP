import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router";
import PetCard from "../ComponentsPetsPage/PetCard";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "@chakra-ui/react";

function PetPage() {
  const [petData, setPetData] = useState({});
  const [userDataFromStorage, setUserDataFromStorage] = useState(undefined);
  const [petIsSaved, setPetIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { name } = useParams();

  let parsedData;


  useEffect(() => {
    initialize()
    
  }, []);

  const initialize =  () => {
     getUserDataFromStorage();
     checkPetStatus();
     loadPetData();
    
    

  }




 
 const getUserDataFromStorage = async () => {
  const dataFromStorage = localStorage.getItem("userLogedData");
    if (dataFromStorage) {
      parsedData = JSON.parse(dataFromStorage);
      console.log("dataFromStorage:", parsedData);
      setUserDataFromStorage(parsedData);
    }
 }

  const loadPetData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/pet/${name}`);
        console.log("pet data response", response.data);
        setPetData(response.data.pet);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching Pet data", error);
      }
    }

  

  const checkPetStatus = async () => {
    if (parsedData) {
      try {
        const response = await axios.get(`http://localhost:3000/user/${parsedData.id}`);
        console.log("user all infos response", response.data);    
        if (response.data.saved.includes(name)) {
          setPetIsSaved(true);
          console.log('pet includes saved',response.data.saved,name)

         }
         else {
          console.log('pet does not includes saved',response.data.saved,name)
         }
     
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
     
    }

  }

  

  const handleDeletePet = async () => {
   try {
    const response = await axios.post(`http://localhost:3000/deletePet`,{
      id : petData._id})
    console.log('response in deletePet Function',response)
    navigate(0)

   }
   catch(error) {
    console.log('error in deletePet Function',error)

   }
  };

  const handleAdopt = () => {
    const message = `Ola! Tenho Interesse em adotar a/o ${petData.name},poderiamos conversar sobre?`;
    const phone = petData.ownerNumber;

    const encodedMessage = encodeURIComponent(message);
    const whatsAppUrl = `http://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

    window.open(whatsAppUrl, "_blank");
  };

  const handleFoster = () => {
    const message = `Ola! Tenho Interesse em dar lar temporario a/o ${petData.name} ,poderiamos conversar sobre?`;
    const phone = petData.ownerNumber;

    const encodedMessage = encodeURIComponent(message);
    const whatsAppUrl = `http://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

    window.open(whatsAppUrl, "_blank");
  };

  
  const handleSave = async () => {
    if (!userDataFromStorage.email) {
      toast("Enter na sua conta para poder salvar");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/save/${userDataFromStorage.email}/${name}`
      );
      if (response.data.success === false) {
        toast("Algum Erro Aconteceu...");
      } else {
        toast("Pet Salvo com sucesso!");

        setTimeout(() => {
          navigate("/mypets");
        }, 2000);
      }
    } catch (error) {
      toast("Algum Erro Aconteceu...");
      console.log("Error in handleSave Function", error);
    }
  };



  return (
    <>
      <ToastContainer />
      {loading ? (
       <Spinner />
      ) : (
        userDataFromStorage && (
          <PetCard
            petImageOne={petData.images[0]}
            petImageTwo={petData.images[1]}
            petImageThree={petData.images[2]}
            name={petData.name}
            age={petData.idade}
            gender={petData.genero}
            hei={petData.size}
            wei={petData.weigth}
            owner={petData.ownerName}
            bio={petData.bio}
            handleAdopt={handleAdopt}
            handleFoster={handleFoster}
            handleSave={handleSave}
            handleDeletePet={handleDeletePet}
            userOwnerEmail={petData.ownerEmail}
            userLogedEmail={userDataFromStorage.email}
            isSaved={petIsSaved}
          />
        )
      )}
    </>
  );

      }
export default PetPage;
