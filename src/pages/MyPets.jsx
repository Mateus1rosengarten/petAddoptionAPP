import axios from "axios";
import '../ComponentsSearch/SearchPage.css'
import { petContext } from "../Context/PetContext";
import { useContext, useEffect, useState } from "react";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, ChakraProvider } from '@chakra-ui/react'
import { Stack,Text,Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";
import { MDBCardImage } from "mdb-react-ui-kit";
import MyPetsCard from "../ComponentsMyPets/MyPetsCard";
function MyPets () {

  const { authState,setAuthState,value,setValue,tokenValue} = useContext(authStates);
  const [IdInfo,setIdInfo] = useState('')
  const [savedList,setSavedList] = useState('');
  const [adoptedList,setAdoptedList] = useState('');
  const [fosteredList,setFosteredList] = useState('')
  const [search,setSearch] = useState('')
  const [toggle,setToggle] = useState(false)
  const navigate = useNavigate()




  


   setTimeout(() => {
    
    console.log('vl',value)
    setSearch(true)
    
   }, 100);

   setTimeout(() => {
    setToggle(true)
   },700)

  //  setTimeout(() => {
    
  //   console.log('fos',fosteredList)
  //   console.log('ado',adoptedList)
  //   console.log('sv',savedList)
  //   setSearch(true)
    
  //  }, 5000);

   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth", {
          headers: {
            accessToken: tokenValue,
          },
        });
        if (response.data.error) {
          console.log("No success", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("success", response.data.id);
          setIdInfo(response.data.id)
          
          
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
   
    
  }, []);
 
 
  useEffect(() => {
    let resp;
    const getPetList = async () => {
      try{
        
        resp = await axios.get(`http://localhost:3000/petuser/${IdInfo}`)
        console.log('teste',resp)
      ;
      const data = resp
      console.log('minhadata',data.data.adopted)
      setAdoptedList(data.data.adopted)
      setSavedList(data.data.saved)
      setFosteredList(data.data.fostered)

  
    }
    catch(error){
     console.log(error)
    }
    }
  getPetList()

  },[search])


  

 





 return(

  <>
 


  <div className="adopted-list"> 
  {toggle && adoptedList.length === 0 && <h1 className="fostered-h1-no">You dont have any pet</h1>}
  {adoptedList.length !== 0 &&  <h1 className="adopted-h1">Addopted</h1>}
{adoptedList  && adoptedList.map((item) =>{
  return (

<MyPetsCard
cardImage={item.image}
cardName={item.name}
cardStatus={item.status}
handleButton={() => {navigate(`/pet/${item.name}`)}}
/>)

})
}

</div>
<div className="fostered-list"> 
{toggle && fosteredList?.length === 0 && <h1 className="fostered-h1-no">You dont foster any pet</h1>}
{fosteredList?.length !== 0 && <h1 className="fostered-h1">Fostering </h1>}
{fosteredList && fosteredList.map((item) =>{
  return (

<MyPetsCard
cardImage={item.image}
cardName={item.name}
cardStatus={item.status}
handleButton={() => {navigate(`/pet/${item.name}`)}}
/>)

})
 }
</div>

<div className="saved-list"> 

{toggle && savedList.length === 0 && <h1 className="saved-h1-no">You dont have pets saved</h1>}
{ savedList?.length !== 0 && <h1 className="saved-h1"> Saved </h1>}
{savedList && savedList.map((item) =>{
  return ( 
// 
<MyPetsCard
cardImage={item.image}
cardName={item.name}
cardStatus={item.status}
handleButton={() => {navigate(`/pet/${item.name}`)}}
/>)

})
}
</div>
  </>
)

 }
export default MyPets