import UsersList from "./UserList";
import "./Adm.css";
import { petContext } from "../../Context/PetContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import MyPetsCard from "../../ComponentsSavedPets/MyPetsCard";

function DashBoard() {
  const [searchList, setSearchList] = useState(false);
  const { petInfo} = useContext(petContext);
  const navigate = useNavigate();

  setTimeout(() => {
    setSearchList(true);
  }, 1000);

  return (
    <>
    <div className="div-all-pets"> 
      <h1 className="h1-all-pets">Todos os Pets</h1>
     <div className="result-pet-list">
        {searchList &&
          petInfo.map((item) => {
            return (
              <>
             <MyPetsCard 
             cardImage={item.images[0]}
             cardName={item.name}
             cardStatus={item.status}
             handleButton={() => {navigate(`/pet/${item.name}`)}}
/>
              </>
            );
          })}
      </div>
      </div>

      <hr className="hr-list" />

      <div className="div-users-list ">
        <UsersList> </UsersList>
      </div>


    </>
  );
}

export default DashBoard;
