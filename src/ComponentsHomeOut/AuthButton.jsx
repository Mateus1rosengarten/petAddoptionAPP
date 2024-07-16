import { useContext } from "react";
import "./AuthButton.css";
import { authStates } from "../Context/AuthContext";

function AuthButton({ handleLogin, handleSignUp,handleLogout }) {
  const { isUserLoged } = useContext(authStates);
  return (
    <div className={isUserLoged ? "buttons-div" : "buttons-div-unlogged"}>
      {isUserLoged && (
        <button className="button-logout" 
         onClick={handleLogout}>
          Sair
        </button>
      )}
      <button
        
        disabled={isUserLoged && true}
        onClick={handleLogin}
        className= {!isUserLoged ? "button-login" : "button-login-disabled"}
      >
        Entrar
      </button>
      <button
        disabled={isUserLoged && true}
        onClick={handleSignUp}
        className= {!isUserLoged ? "button-signUp" : "button-signUp-disabled"}
      >
        Cadastro
      </button>
    </div>
  );
}

export default AuthButton;
