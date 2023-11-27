import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import UserCard from "../../ComponentsAdmPages/UserCard";

function UserPage() {
  const [fullInfoUser, setFullInfoUser] = useState({});

  const { id } = useParams();

  let arrayAddopted;
  let arrayFostered;
  let arraySaved;

  

  useEffect(() => {
    if (id) {
      
      axios.get(`http://localhost:3000/user/${id}`).then((res) => {
        console.log("mypey", res.data);
        const userFullInfo = res.data;
        console.log("userinfo", userFullInfo);
        setFullInfoUser(userFullInfo);
      });
    }
  }, []);
  
  if(fullInfoUser) {
    arrayAddopted = fullInfoUser.adopted? fullInfoUser.adopted.join('/') : '' ;
    arrayFostered = fullInfoUser.fostered? fullInfoUser.fostered.join('/') : '' ;
    arraySaved = fullInfoUser.saved? fullInfoUser.saved.join('/') : '' ;
  }

  return (
    <UserCard
      image={fullInfoUser.image}
      name={fullInfoUser.name}
      lastname={fullInfoUser.lastName}
      number={fullInfoUser.number}
      email={fullInfoUser.email}
      createdAt={fullInfoUser.created_at}
      role={fullInfoUser.role}
      adopted={arrayAddopted}
      fostered={arrayFostered}
      saved={arraySaved}
    />
  );
}

export default UserPage;
