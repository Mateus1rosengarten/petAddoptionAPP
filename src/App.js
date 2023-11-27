import "./App.css";
import StateContexts from "./Context/StatesContexts";
import HomeLogOut from "./pages/HomeOut";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HomeLogIn from "./pages/HomeIn";
import Navbar from "./ComponentsHomeOut/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import AddPet from "./pages/adminPages/AddPet";
import DashBoard from "./pages/adminPages/Dashboard";
import UserContexts from "./Context/UserContext";
import { useContext } from "react";
import { authStates } from "./Context/AuthContext";
import PetContext from "./Context/PetContext";
import PetPage from "./pages/PetPage";
import UserPage from "./pages/adminPages/UserPage"
import MyPets from "./pages/MyPets";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

function App() {
  const { authState } = useContext(authStates)

  return (
    <>
      <UserContexts>
        <StateContexts>
          <PetContext>
            <>
              <Navbar> </Navbar>
            </>
            <Routes>
              <Route path="/" element={<HomeLogOut />} />

              <Route path="/search" element={<SearchPage />} />
              <Route path="/user" element={<HomeLogIn />} />
              {authState.status ? (
                <>
                  <Route path="/profile" element={<ProfileSettings />} />
                 
                  <Route path="/mypets" element={<MyPets/>} />
                 
                  {/* <Route path='/pets' element = {<MyPets/>} /> */}
                </>
              ) : (
                <>
                  <Route path="/profile" element={<SearchPage />} />
                  {/* <Route path='/pets' element = {<SearchPage/>} /> */}
                </>
              )}

              <Route path="/pet/:name" element={<PetPage />} />
              <Route path="/adm/addpet" element={<AddPet />} />
              {authState.email === "mateus.rosengartenn@gmail.com" ? (
                <Route path="/adm" element={<DashBoard />} />
              ) : (
                <Route path="/search" element={<SearchPage />} />
              )}

              <Route path="/adm/:id" element={<UserPage />} />
            </Routes>
          </PetContext>
        </StateContexts>
      </UserContexts>
    </>
  );
}

export default App;
