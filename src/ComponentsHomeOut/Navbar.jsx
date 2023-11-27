import "./Navbar.css";
import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthModal from "./AuthModal";
import LoginModal from "./LoginModal";
import { useContext } from "react";
import { globalStates } from "../Context/StatesContexts";
import { NavLink } from "react-router-dom";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function Navbar() {
  const [modal, setModal] = useState(false);
  const [log, setLog] = useState(false);
  const { isModal, setIsModal } = useContext(globalStates);
  const { authState, setAuthState } = useContext(authStates);
  const { loginObject, setLoginObject } = useContext(authStates);
  const navigate = useNavigate();

  const signUpHandle = () => {
    setModal(!modal);
    setIsModal(!isModal);
  };

  const loginHandle = () => {
    setLog(!log);
    setIsModal(!isModal);
  };

  const logoutFunction = () => {
    window.localStorage.clear();
    setLoginObject("");
    navigate("/");
    navigate(0);
  };



  return (
    <div className="navbar-style">
      <ul>



        { !authState.email ?

<li onClick={() => { toast('Please login or create an account to use the APP')} }  className="profile-link">
 
  <NavLink to={"/"}>Profile</NavLink> </li> :  <li className="profile-link"> <NavLink to={"/profile"}>Profile</NavLink>  
  </li> } 
      

        { !authState.email ?

        <li onClick={() => { toast('Please login or create an account to use the APP')} }  className="search-loged-link">
         
          <NavLink to={"/"}>Search</NavLink> </li> :  <li className="search-loged-link"> <NavLink to={"/search"}>Search</NavLink>  
          </li> } 

          


  


        { !authState.email ?

      <li onClick={() => { toast('Please login or create an account to use the APP')} }  className="mypets-link">
 
    <NavLink to={"/"}>My Pets</NavLink> </li> :  <li className="mypets-link"> <NavLink to={"/mypets"}>My Pets</NavLink>  
  </li> } 
      


        {authState.email === "mateus.rosengartenn@gmail.com" && (
          <li className="adm-link">
            <NavLink to={"/adm"}>Dash</NavLink>
          </li>
        )}

        <li>

          <ToastContainer />
          {" "}
          <AuthButton
            handleSignUp={signUpHandle}
            handleLogin={loginHandle}
          ></AuthButton>{" "}
        </li>

        <li>
          {modal && <AuthModal toggleModal={signUpHandle}></AuthModal>}
          {log && <LoginModal toggleModal={loginHandle}></LoginModal>}
        </li>

        <li>
          {authState.status && (
            <button className="button-logout" onClick={logoutFunction}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
