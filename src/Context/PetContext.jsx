import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";


export const petContext = createContext();

function PetContext({ children }) {
  const [petInfo, setPetInfo] = useState(undefined);
  // const [arrayWithDogs,setArrayWithDogs] = useState(undefined);
  // const [arrayWithCats,setArrayWithCats] = useState(undefined);
  const [arrayWithAllPets,setArrayWithAllPets] = useState(undefined)
  // const [filteredResults, setFilteredResults] = useState([]);
  // const [searchList,setSearchList] = useState(false)
  // const [searchListTwo,setSearchListTwo] = useState(false)

  const [searchFilters,setSearchFilters] = useState({
    type : [],
    genero : [],
    size : [],
    age : []

  })

 



  useEffect(() => {
    axios.get("http://localhost:3000/pet").then((res) => {
      console.log("ALL PETS", res.data);
      setArrayWithAllPets(res.data)
      console.log('ArrayAllPets on context mouth',arrayWithAllPets)
      setPetInfo(res.data);
      
    });
  }, []);





  
  





  return (
    <petContext.Provider
      value={{searchFilters,setSearchFilters,petInfo, setPetInfo,arrayWithAllPets,setArrayWithAllPets}}
    >
      {children}
    </petContext.Provider>
  );
}

export default PetContext;
