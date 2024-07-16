import { useEffect, useContext } from "react";
import "./SearchPage.css";
import { petContext } from "../Context/PetContext";
import { Checkbox, filter, Stack } from "@chakra-ui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBabyCarriage,
  faBaseballBall,
  faBone,
  faCat,
  faDog,
  faHeart,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";



function SearchComponent({ setFilteredResults }) {
  const {arrayWithAllPets,searchFilters,setSearchFilters,} = useContext(petContext);

  useEffect(() => {
    console.log("arrays", arrayWithAllPets);
  }, []);

  const toggleFilters = (category, value) => {
    setSearchFilters((prevState) => {
      const categoryFilters = prevState[category];
      const updatedCategoryFilters = categoryFilters.includes(value)
        ? categoryFilters.filter((filter) => filter !== value)
        : [...categoryFilters, value];

      return {
        ...prevState,
        [category]: updatedCategoryFilters,
      };
    });
  };

   const filterResults = () => {
    return arrayWithAllPets?.filter(pet => {
      return (
      (searchFilters.type.length === 0 || searchFilters.type.includes(pet.type)) &&
      (searchFilters.genero.length === 0 || searchFilters.genero.includes(pet.genero)) &&
      (searchFilters.size.length === 0 || searchFilters.size.includes(pet.size)) &&
      (searchFilters.age.length === 0 || searchFilters.age.includes(pet.idade)) 

      )
      
    })
   }

   useEffect(() => {
    setFilteredResults(filterResults());
   },[searchFilters])


  return (
    <>
      <div className="div-search-filters">
        <div className="search-filters">
          <Stack
            spacing={40}
            marginTop="3%"
            marginBottom="1%"
            marginRight='1vw'
            direction="row"
            display="flex"
            justifyContent="center"
          >
            <Checkbox
              size="lg"
              margin="1%"
              colorScheme="blue"
              onChange={() => toggleFilters('type','Dog')}
              checked={searchFilters.type.includes('Dog')}
              id="dog"
            >
              <FontAwesomeIcon
                style={{ color: "brown", marginLeft: "0.3vw" }}
                icon={faDog}
              />{" "}
              <span className="span-filter-KindOfPet">Cachorro</span>
            </Checkbox>
            <Checkbox
              size="lg"
              margin="1%"
              colorScheme="blue"
              onChange={() => toggleFilters('type','Cat')}
              checked={searchFilters.type.includes('Cat')}
              id="cat"
            >
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faCat}
              />
              <span className="span-filter-KindOfPet">Gato</span>
            </Checkbox>
           
          </Stack>
          <hr />
          <Stack
            spacing={40}
            marginTop="1%"
            marginBottom="1%"
            direction="row"
            display="flex"
            justifyContent="center"
          >
            <Checkbox size="lg" margin="1%"
            onChange={
              () => toggleFilters('genero','Femea')}
              checked={searchFilters.genero.includes('Femea')}>
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faVenus}
              />
              <span className="span-filter-KindOfPet">Femea</span>
            </Checkbox>
            <Checkbox size="lg" margin="1%" onChange={
            () => toggleFilters('genero','Macho')}
            checked = {searchFilters.genero.includes('Macho')}
              >
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faMars}
              />
              <span className="span-filter-KindOfPet">Macho</span>
            </Checkbox>
           
          </Stack>
          <hr />
          <Stack
            spacing={20}
            marginTop="1%"
            marginBottom="1%"
            marginLeft="9vw"
            direction="row"
          >
            <Checkbox size="lg" margin="1%"
            onChange={() => toggleFilters('size','Pequeno')}
            checked={searchFilters.size.includes('Pequeno')}>
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faDog}
                size="sm"
              />
              <span className="span-filter-KindOfPet">Pequeno</span>
            </Checkbox>
            <Checkbox size="lg" margin="1%"
              onChange={() => toggleFilters('size','Medio')}
              checked={searchFilters.size.includes('Medio')}
            >
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faDog}
                size="md"
              />
              <span className="span-filter-KindOfPet">Medio</span>
            </Checkbox>
            <Checkbox size="lg" margin="1%"
              onChange={() => toggleFilters('size','Grande')}
              checked={searchFilters.size.includes('Grande')}
           >
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faDog}
                size="lg"
              />
              <span className="span-filter-KindOfPet">Grande</span>
            </Checkbox>
            
          </Stack>
          <hr />
          <Stack
            spacing={20}
            marginBottom="4%"
            marginTop="1vh"
            marginLeft="2vw"
            direction="row"
          >
            <Checkbox size="lg" margin="1%"
             onChange={() => toggleFilters('age','Filhote')}
             checked={searchFilters.size.includes('Filhote')}>
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faBabyCarriage}
              />
              <span className="span-filter-KindOfPet">Filhote</span>
            </Checkbox>
            <Checkbox size="lg" margin="1%"
            onChange={() => toggleFilters('age','Jovem')}
            checked={searchFilters.size.includes('Jovem')}>
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.5vw",
                }}
                icon={faBaseballBall}
              />
              <span className="span-filter-KindOfPet">Jovem</span>
            </Checkbox>
            <Checkbox size="lg" margin="1%"
            onChange={() => toggleFilters('age','Adulto')}
            checked={searchFilters.size.includes('Adulto')}>
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.5vw",
                }}
                icon={faBone}
              />
              <span className="span-filter-KindOfPet">Adulto</span>
            </Checkbox>
            <Checkbox size="lg" margin="1%"
            onChange={() => toggleFilters('age','Idoso')}
            checked={searchFilters.size.includes('Idoso')}
            >
              <FontAwesomeIcon
                style={{
                  color: "brown",
                  marginLeft: "0.3vw",
                  marginRight: "0.3vw",
                }}
                icon={faHeart}
              />
              <span className="span-filter-KindOfPet">Idoso</span>
            </Checkbox>

          
          </Stack>
        </div>
      </div>
    </>
  );
}

export default SearchComponent;
