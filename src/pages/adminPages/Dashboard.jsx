import UserList from "./UserList";
import "./Adm.css";
import { petContext } from "../../Context/PetContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import MyPetsCard from "../../ComponentsMyPets/MyPetsCard";

function DashBoard() {
  const [searchList, setSearchList] = useState(false);
  const { petInfo, setPetInfo } = useContext(petContext);
  const navigate = useNavigate();

  setTimeout(() => {
    setSearchList(true);
  }, 1000);

  return (
    <>
      <div className="users-list ">
        <UserList> </UserList>
      </div>

      <hr className="hr-list" />

      <button
        onClick={() => {
          navigate("/adm/addpet");
        }}
        className="addpet-button"
      >
        ADD NEW PET
      </button>

      <div className="result-pet-list">
        {searchList &&
          petInfo.map((item) => {
            return (
              <>
             <MyPetsCard 
             cardImage={item.image}
             cardName={item.name}
             cardStatus={item.status}
             handleButton={() => {navigate(`/pet/${item.name}`)}}
/>
              </>
            );
          })}
      </div>
    </>
  );
}

export default DashBoard;
