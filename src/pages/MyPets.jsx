import axios from "axios";
import "../ComponentsSavedPets/MyPets.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MyPetsCard from "../ComponentsSavedPets/MyPetsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import MyPetsCardEmpty from "../ComponentsSavedPets/myPetsCardEmpty";
import { Button } from "@chakra-ui/react";
import { toast} from "react-toastify";

function MyPets() {
  const [savedList, setSavedList] = useState(undefined);
  const navigate = useNavigate();
  const objectStorage = localStorage.getItem("userLogedData");
  const objectParsed = JSON.parse(objectStorage);

  useEffect(() => {
    getPetList();
  }, []);

  const getPetList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/petuser/${objectParsed.id}`
      );
      console.log("response from getPetlist function", response);
      setSavedList(response.data.saved);
    } catch (error) {
      console.log("Error geting Saved Pets list",error);
    }
  };

  const handleUnsavePet = async (cardName) => {
    try {
      console.log('email',objectParsed)
      const response = await axios.post(`http://localhost:3000/unsave/${objectParsed.email}/${cardName}`);
      
      if (!response.data.success) {
        console.log('response',response)
        toast("Erro ao remover dos pets favoritos");
      } else {
        console.log('response',response)
        getPetList()
        toast("Pet removidos dos favoritos");
      }
    } catch (error) {
      toast("Erro ao remover dos pets favoritos",error);
      console.log('error',error)
    }
  };
  

  return (
    <>
      {objectParsed?.id === "650494681a2ddc4735d4aaeb" && (
        <Button
          onClick={() => {
            navigate("/adm/addpet");
          }}
          className="addpet-button"
        >
          Adicionar Novo Pet
        </Button>
      )}

      <div className="my-pets-div">
        <h1 className="title-saved-pets">
          <FontAwesomeIcon icon={faPaw} style={{ color: "#87CEEB" }} />{" "}
          <FontAwesomeIcon icon={faPaw} /> {" "}
          {savedList && savedList.length >= 1 ? "Meus Pets Salvos" : "Nenhum Pet Salvo"}{" "}
          <FontAwesomeIcon
            icon={faPaw}
            style={{ marginLeft: "0.3vw", color: "#87CEEB" }}
          />
          <FontAwesomeIcon icon={faPaw} style={{ marginLeft: "0.5vw" }} />
        </h1>

        <div className="saved-list">
          {savedList && savedList.length >= 1 ? (
            savedList.map((item) => {
              return (
                //
                <MyPetsCard
                  cardImage={item.images[0]}
                  cardName={item.name}
                  cardStatus={item.status}
                  handleUnsavePet={() => handleUnsavePet(item.name)}
                  handleButton={() => {
                    navigate(`/pet/${item.name}`);
                  }}
                />
              );
            })
          ) : (
            <>
              <MyPetsCardEmpty /> <MyPetsCardEmpty /> <MyPetsCardEmpty />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default MyPets;
