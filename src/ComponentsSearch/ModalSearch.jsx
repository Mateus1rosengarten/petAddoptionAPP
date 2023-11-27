import axios from "axios";
import { useRef, useContext } from "react";
import {
  petContext,
  advSearch,
  setAdvSearch,
  stateFullSearch,
  setStateFullSearch,
  queryCat,setQueryCat,setQueryDog,queryType,setQueryType,searchList,searchListTwo,setSearchList,setSearchListTwo
} from "../Context/PetContext";
import { globalStates } from "../Context/StatesContexts";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import {toast,ToastContainer} from 'react-toastify'

function ModalSearch({ toggleModal }) {
  const { stateFullSearch, setStateFullSearch } = useContext(petContext);
  const { modal, setModal,} = useContext(globalStates);
  const {queryDog,setQueryDog} = useContext(petContext);
  const {queryCat,setQueryCat} = useContext(petContext);

  

  const nameRef = useRef();
  const heigthRef = useRef();
  const weightRef = useRef();
  const typeRef = useRef();
  const statusRef = useRef();

  let resp;

  const advancedSearch = async () => {
    let parameters = {
      
      name: nameRef.current.value,
      heigth: heigthRef.current.value,
      weight: weightRef.current.value,
      type: typeRef.current.value,
      status: statusRef.current.value,
    };
    
    if (!parameters.name && !parameters.heigth && !parameters.weight && !parameters.type && !parameters.status) {

      resp = await axios.get("http://localhost:3000/fullsearch",)


    setQueryCat(false);
    setQueryDog(false);

      setTimeout(() => {
       console.log('consolando')
       setStateFullSearch(resp.data.pets);
 
     }, 1500);

    }




    if (parameters.name || parameters.heigth || parameters.weight || parameters.type || parameters.status) {
    

    setQueryCat(false);
    setQueryDog(false);
   

    console.log("1", stateFullSearch);

     }


    try {
      resp = await axios.get("http://localhost:3000/fullsearch", {
        params: { ...parameters },
        
      } );
      console.log('hoje')
      if (resp.data.pets.length === 0) {
        setModal(true)

     toast('Sorry We didnt find your pet')

   
    
    
    }

    else { console.log('mateus')
    setModal(!modal);
     setStateFullSearch(resp.data.pets); }

      

    } catch (error) {
      console.log("error", error);
    }

    finally{
      console.log('estado',stateFullSearch)
    }
  };

  return (
    <div className="modal-auth">
      <div className="overlay">
        <div className="modal-content">
          <FormControl marginBottom="20px">
            <Box width="4vw">
              <Button
                width="100%"
                variant="outline"
                onClick={toggleModal}
                colorScheme="red"
                size="xs"
                marginTop="0px"
                marginLeft="12vw"
                marginBottom="2vh"
              >
                Close
              </Button>{" "}
            </Box>

            <FormLabel>
   
              Name
            </FormLabel>

            <Input type="text" ref={nameRef} id="name" placeholder="Pet Name Ex: Garfield" />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel>
    
              Heigth
            </FormLabel>

            <Input type="number" ref={heigthRef} id="heigth" placeholder="Cm" />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel>
            
              Weight
            </FormLabel>

            <Input type="number" ref={weightRef} id="weight" placeholder="Kg" />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel>

              Status
            </FormLabel>

            <Input type="text" ref={statusRef} id="status" placeholder="Avaible/Fostered/Adopted" />
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel>

              Type
            </FormLabel>

            <Input type="text" ref={
              
              
              typeRef} id="type" placeholder="Dog / Cat" />
          </FormControl>

          <Button
       
            onClick={advancedSearch}
            colorScheme="linkedin"
            marginTop="20px"
            width="100%"
          >
            SEARCH
          </Button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ModalSearch;
