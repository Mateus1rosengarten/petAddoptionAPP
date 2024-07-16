import "./App.css";

import HomeLogOut from "./pages/HomeOut";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import Navbar from "./ComponentsHomeOut/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import AddPet from "./pages/adminPages/AddPet";
import DashBoard from "./pages/adminPages/Dashboard";
import UserContexts from "./Context/UserContext";
import { useContext } from "react";
import { authStates } from "./Context/AuthContext";
import PetContext from "./Context/PetContext";
import PetPage from "./pages/PetPage";
import MyPets from "./pages/MyPets";
import Footer from "./ComponentsHomeOut/Footer";
import GlobalContexts from "./Context/GlobalContexts";

function App() {
  const { isUserLoged ,userLogedData } = useContext(authStates)

  return (
    <>
      <UserContexts>
        <GlobalContexts>
          <PetContext>
            <>
              <Navbar> </Navbar>
              <Footer></Footer>
            </>
            <Routes>
              <Route path="/" element={<HomeLogOut />} />

              <Route path="/search" element={<SearchPage />} />
              {isUserLoged ? (
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
                <Route path="/adm" element={<DashBoard />} />
             
               
             

            
            </Routes>
            
          </PetContext>
        </GlobalContexts>
      </UserContexts>
    </>
  );
}

export default App;
