import { usersContext } from "../../Context/UserContext";
const { useContext } = require("react");


function UsersList() {
  const { allUsersArray} = useContext(usersContext);
  
  return (
    <div className="all-users">
      <h1 className="h1-all-pets">Todos Usuarios:</h1>
      {allUsersArray && allUsersArray.map((item) => {
          return (
            <div
            className="each-user"
            >
              {item.email}
            </div>
          );
        })}
    </div>
  );
}

export default UsersList;
