import { useState, useContext } from "react";
import "./SearchPage.css";
import ModalSearch from "./ModalSearch";
import { petContext,searchList,setSearchList } from "../Context/PetContext";
import { globalStates } from "../Context/StatesContexts";
import { Checkbox,Stack} from "@chakra-ui/react";
import '@coreui/coreui/dist/css/coreui.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCat,faDog} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";


function SearchComponent({ inputCatValue, inputDogValue}) {
  const {modal, setModal} = useContext(globalStates);
  const { queryType, setQueryType } = useContext(petContext);
  const { searchList, setSearchList } = useContext(petContext);
  const { searchListTwo, setSearchListTwo } = useContext(petContext);
  const {queryDog,setQueryDog} = useContext(petContext);
  const {queryCat,setQueryCat} = useContext(petContext);
  const { stateFullSearch, setStateFullSearch } = useContext(petContext)

  const openingModal = () => {
   
    setQueryType('')   // NAO RENDERIZAR NENHUM RESULTADO
    setQueryCat(true) // NAO REDERIZAR NENHUM RESULTADO
    setQueryDog(true) // NAO RENDERIZAR NENHUM RESULTADO
    setStateFullSearch({})
    console.log('queryT',queryType,'queryC',queryCat,'queryD',queryDog)
    
    setModal(true);
    console.log('modalbefore',modal)
  };

  const togglingModal = () => {
    
    setQueryCat(false);
    setQueryDog(false);
    setModal(!modal);
    console.log('modalaft',modal);
    
  };


  const onCatChangeCheckBox = (event) => {
    const isChecked = event.target.checked;
    setQueryCat(isChecked);
    backingToAllResults()


    if (isChecked && queryDog) {
      
      setSearchList(true)
      setQueryType('Dog')
      console.log('1',searchList)
    } 
  
      
      else {
      setQueryType(isChecked ? 'Cat' : queryDog ? 'Dog' : '');
      setSearchList(false)
    }
  };

  const onDogChangeCheckBox = (event) => {
    const isChecked = event.target.checked;
    setQueryDog(isChecked);
    backingToAllResults()
    
  
    if (isChecked && queryCat) {
    
      setSearchListTwo(true)
      setQueryType('Cat')
      console.log('2',searchListTwo)
    } 

    
    else {
      setQueryType(isChecked ? 'Dog' : queryCat ? 'Cat' : '');
      setSearchListTwo(false)
    }
  };


   const backingToAllResults = async () => {

    try {
     const resp = await axios.get("http://localhost:3000/fullsearch");
  
      setStateFullSearch(resp.data.pets);

  
    } catch (error) {
      console.log("error", error);
    }

   }
  

  return (
    <>
      <div className="search-filters">
       
          <Stack spacing={5} margin='3%' direction='column'> 
          

          <Checkbox size='lg' margin='1%' colorScheme='blue' disabled={queryDog} onChange={onCatChangeCheckBox}
         
            
            id="cat"> <span style={{ fontFamily : 'Verdana, Geneva, Tahoma, sans-serif;' }}>CAT  <FontAwesomeIcon style={{color:'brown',marginLeft:'0.5vw'}} icon={faCat} /> </span></Checkbox>
          
     

        <Checkbox size="lg" margin='1%' colorScheme='blue' disabled={queryCat}   onChange={onDogChangeCheckBox}
         
            id="dog"> <span style={{ fontFamily : 'Verdana, Geneva, Tahoma, sans-serif;' }}> DOG <FontAwesomeIcon style={{color:'brown',marginLeft:'0.3vw'}} icon={faDog} /></span> </Checkbox >
            </Stack> 
          

        


        <button onClick={openingModal} className="search-advance">
          ADVANCED SEARCH
        </button>
      </div>

      {modal && <ModalSearch toggleModal={togglingModal}></ModalSearch>}
    </>
  );
}

export default SearchComponent;
