import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "./AuthContext";

export const petContext = createContext();

function PetContext({ children }) {
  const [petInfo, setPetInfo] = useState();
  const [myPetsResult, setMyPetsResult] = useState([]);
  const [queryType,setQueryType] = useState('Advanced');
  const [stateDogType,setStateDogType] = useState(false);
  const [stateCatType,setStateCatType] = useState(false);
  const [stateFullSearch,setStateFullSearch] = useState([])
  const [searchList,setSearchList] = useState(false)
  const [searchListTwo,setSearchListTwo] = useState(false)
  const [queryDog,setQueryDog] = useState(false);
  const [queryCat,setQueryCat] = useState(false);
  const[advSearch,setAdvSearch] = useState(false)


  const queryTypeDog = 'Dog';
  const queryTypeCat = 'Cat';

  useEffect(() => {
    axios.get("http://localhost:3000/pet").then((res) => {
      console.log("ALL PETS", res.data);
      setStateFullSearch(res.data)
      
      setPetInfo(res.data);
      
    });
  }, []);

  useEffect(() => {

    axios.get(`http://localhost:3000/search/${queryTypeDog}`).then((res) =>{
      console.log('ALL DOGS',res.data)
      setStateDogType(res.data)
      
    })
  },[])

  useEffect(() => {

    axios.get(`http://localhost:3000/search/${queryTypeCat}`).then((res) =>{
      console.log('ALL CATS',res.data)
      setStateCatType(res.data)
      
    })
  },[])




  
  





  return (
    <petContext.Provider
      value={{advSearch,setAdvSearch, searchListTwo,setSearchListTwo, petInfo, setPetInfo, myPetsResult, setMyPetsResult,queryType,setQueryType,stateDogType,setStateDogType,stateCatType,setStateCatType,stateFullSearch,setStateFullSearch,searchList,setSearchList,queryDog,setQueryDog,queryCat,setQueryCat}}
    >
      {children}
    </petContext.Provider>
  );
}

export default PetContext;
