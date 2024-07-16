import SearchComponent from "../ComponentsSearch/SearchBar";
import { useContext } from "react";
import { petContext} from "../Context/PetContext";
import { ChakraProvider, CSSReset, extendTheme, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import PetCard from "../ComponentsSearch/PetCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SearchPage() {
  const [filteredResults,setFilteredResults] = useState([]);
  const {arrayWithAllPets} = useContext(petContext);


  useEffect(() => {


    console.log("All pets on Mouth :", arrayWithAllPets);
  }, []);

  const handleSearchByName = (petName) => {

    try {
      if(petName.length === 0) {
        setFilteredResults(arrayWithAllPets)
        return;
      }
      const petSearched = arrayWithAllPets.filter(pet => pet.name.toLowerCase().includes(petName.toLowerCase()));
      setFilteredResults(petSearched);
    }
    catch(error) {
      console.log('Error in handleSearchByName Function',error)
    };
  };

 


  return (
    <>
      <ChakraProvider>
        <CSSReset />
        <SearchComponent setFilteredResults={setFilteredResults} />
        <div className="div-search-pet-input"> 
        <FontAwesomeIcon icon={faSearch}/>
        <Input
        placeholder="Procure pelo Nome do Pet"
        onChange={(event) => handleSearchByName(event.target.value)}
        className="search-pet-input"
        type="text" />
        </div>
      </ChakraProvider>

     

      <div className="result-list">
        
        {filteredResults && filteredResults.length > 0 ? filteredResults.map((item) => (
                    <PetCard
                    petID={item.id}
                    petImageOne={item.images[0]}
                    petImageTwo={item.images[1] || item.image[0]}
                    petImageThree={item.images[2] || item.images[0] || item.images[1] }
                    petName={item.name}
                    petStatus={item.status}/>


              ))  : <h1 className="text-no-pets-found">Nenhum pet disponivel par esta busca...</h1>}
      </div>
    </>
  );
}

export default SearchPage;
