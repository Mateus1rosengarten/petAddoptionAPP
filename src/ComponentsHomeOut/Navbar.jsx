import "./Navbar.css";
import { useState, useContext } from "react";
import AuthButton from "./AuthButton";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { globalStates } from "../Context/GlobalContexts";
import { NavLink, useNavigate } from "react-router-dom";
import { authStates } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { usersContext } from "../Context/UserContext";

function Navbar() {
  const { isModal, setIsModal } = useContext(globalStates);
  const { setDataUpdate } = useContext(usersContext);
  const { setLoginObject, setIsUserLoged, isUserLoged } =
    useContext(authStates);
  const navigate = useNavigate();

  const signUpHandle = () => {
    setIsModal({ ...isModal, signUp: !isModal.signUp });
  };

  const loginHandle = () => {
    setIsModal({ ...isModal, login: !isModal.login });
  };

  const logoutHandle = () => {
    window.localStorage.clear();
    setIsUserLoged(false);
    setDataUpdate('')
    setLoginObject('');
    navigate("/");
  };

  return (
    <div className="navbar-style">
      <div className="navbar-links">
        {!isUserLoged ? (
          <>
            <NavLink
              onClick={() => {
                toast("Faca Login para ter acessao ao site");
              }}
              className="profile-link"
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: "0.5vw", height: "3.5vh" }}
              />
              Meu Perfil
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="profile-link" to={"/profile"}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: "0.5vw", height: "3.5vh" }}
              />
              Meu Perfil
            </NavLink>
          </>
        )}

        {!isUserLoged ? (
          <>
            <NavLink
              onClick={() => {
                toast("Faca Login para ter acessao ao site");
              }}
              className="search-link"
            >
              <FontAwesomeIcon
                icon={faSearch}
                style={{ marginRight: "0.5vw", height: "3.5vh" }}
              />
              Buscar
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="search-link" to={"/search"}>
              <FontAwesomeIcon
                icon={faSearch}
                style={{ marginRight: "0.5vw", height: "3.5vh" }}
              />
              Buscar
            </NavLink>
          </>
        )}

        {!isUserLoged ? (
          <>
            <NavLink
              onClick={() => {
                toast("Faca Login para ter acessao ao site");
              }}
              className="mypets-link"
            >
              <FontAwesomeIcon
                icon={faPaw}
                style={{ marginRight: "0.5vw", height: "3.5vh" }}
              />
              Pets Salvos
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="mypets-link" to={"/mypets"}>
              <FontAwesomeIcon
                icon={faPaw}
                style={{ marginRight: "0.5vw", height: "3.8vh" }}
              />
              Pets Salvos
            </NavLink>
          </>
        )}
      </div>
      <ToastContainer />

      <AuthButton
        handleSignUp={signUpHandle}
        handleLogin={loginHandle}
        handleLogout={logoutHandle}
      />

      {isModal.signUp && <RegisterModal toggleModal={signUpHandle} />}
      {isModal.login && <LoginModal toggleModal={loginHandle} />}
    </div>
  );
}

export default Navbar;
