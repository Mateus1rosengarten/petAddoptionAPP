import { useNavigate } from "react-router";
import { userStates } from "../../Context/UserContext";
const { useContext } = require("react");
const { useState } = require("react");

function UserList() {
  const { user, setUser } = useContext(userStates);
  const {userList, setUserList} = useContext(userStates);
  const navigate = useNavigate();

  setTimeout(() => {
    console.log("array", user);
    setUserList(true);
  }, 1000);

  return (
    <>
      <h1>All users:</h1>
      {userList &&
        user.map((item) => {
          return (
            <div
              onClick={() => {
                navigate(`/adm/${item._id}`);
              }}
            >
              {item.email}
            </div>
          );
        })}
    </>
  );
}

export default UserList;
