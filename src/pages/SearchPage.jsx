import SearchComponent from "../ComponentsSearch/SearchBar";
import axios from "axios";
import { useContext } from "react";
import { petContext, advSearch, setAdvSearch } from "../Context/PetContext";
import { useNavigate } from "react-router";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner, Stack } from "@chakra-ui/react";
import { toast } from "react-toastify";

function SearchPage() {
  const { setPetInfo } = useContext(petContext);
  const { queryType, setQueryType } = useContext(petContext); // STRING = CAT OR DOG
  const { stateDogType, setStateDogType } = useContext(petContext); /// ARRAY = ALL DOGS RESULTS
  const { stateCatType, setStateCatType } = useContext(petContext); /// ARRAY = ALL CATS RESULTS
  const { queryDog, setQueryDog } = useContext(petContext); /// BOOLEAN = DOG IS CHECKED
  const { queryCat, setQueryCat } = useContext(petContext); /// BOOLEAN = CAT IS CHECKED
  const { stateFullSearch, setStateFullSearch } = useContext(petContext); /// ARRAY = ALL PETS RESULTS
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPets();
    console.log("queryType on Mouth :", queryType);

    setQueryDog(false);
    setQueryCat(false);

    console.log("All pets on Mouth :", stateFullSearch);
  }, []);

  const getAllPets = async () => {
    try {
      let resp = await axios.get("http://localhost:3000/fullsearch");
      console.log(resp.data.pets);
      setStateFullSearch(resp.data.pets);
      setIsLoading(false);
      console.log("All pets after get AllPets function", stateFullSearch);
    } catch (error) {
      console.log("error gettin allPets", error);
    }
  };

  const backingToAllResults = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/fullsearch");

      setStateFullSearch(resp.data.pets);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <ChakraProvider>
        <CSSReset />
        <SearchComponent setPetInfo={setPetInfo} />
      </ChakraProvider>

      <div className="result-list">
        {isLoading ? (
          <Stack direction="row" spacing={4}></Stack>
        ) : (
          <>
            {queryType === "Dog" &&
              queryDog == true &&
              Array.isArray(stateDogType) &&
              stateDogType.map((item) => (
                <div className="cardPet" key={item.id}>
                  <img src="" alt="" />
                  <div className="containerPet">
                    <img className="img-search" src={item.image} alt=""></img>
                    <hr className="hr-card"></hr>
                    <h4 className="h4-card">{item.name.toUpperCase()}</h4>
                    <p
                      className={
                        item.status === "Adopted"
                          ? "p-card-adopted"
                          : item.status === "Fostered"
                          ? "p-card-fostered"
                          : item.status === "Avaible"
                          ? "p-card-avaible"
                          : "p-card"
                      }
                    >
                      {item.status}
                    </p>

                    <button
                      onClick={() => {
                        navigate(`/pet/${item.name}`);
                      }}
                      className="seemore-button"
                    >
                      See More
                    </button>
                  </div>
                </div>
              ))}
            {queryType === "Cat" &&
              queryCat == true &&
              Array.isArray(stateCatType) &&
              stateCatType.map((item) => (
                <div className="cardPet" key={item.id}>
                  <div className="containerPet">
                    <img className="img-search" src={item.image} alt=""></img>
                    <hr className="hr-card"></hr>
                    <h4 className="h4-card">{item.name.toUpperCase()}</h4>
                    <p
                      className={
                        item.status === "Adopted"
                          ? "p-card-adopted"
                          : item.status === "Fostered"
                          ? "p-card-fostered"
                          : item.status === "Avaible"
                          ? "p-card-avaible"
                          : "p-card"
                      }
                    >
                      {item.status}
                    </p>

                    <button
                      onClick={() => {
                        navigate(`/pet/${item.name}`);
                      }}
                      className="seemore-button"
                    >
                      See More
                    </button>
                  </div>
                </div>
              ))}
            {stateFullSearch?.itExist === "not" && backingToAllResults()}{" "}
            {(queryType === "Advanced" || (!queryCat && !queryDog)) &&
              Array.isArray(stateFullSearch) &&
              stateFullSearch.map((item) => (
                <div className="cardPet" key={item.id}>
                  <div className="containerPet">
                    <img className="img-search" src={item.image} alt=""></img>
                    <hr className="hr-card"></hr>
                    <h4 className="h4-card">{item.name.toUpperCase()}</h4>
                    {item.status && (
                      <p
                        className={
                          item.status === "Adopted"
                            ? "p-card-adopted"
                            : item.status === "Fostered"
                            ? "p-card-fostered"
                            : item.status === "Avaible"
                            ? "p-card-avaible"
                            : "p-card"
                        }
                      >
                        {item.status}
                      </p>
                    )}
                    <button
                      onClick={() => {
                        navigate(`/pet/${item.name}`);
                      }}
                      className="seemore-button"
                    >
                      See More
                    </button>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default SearchPage;
