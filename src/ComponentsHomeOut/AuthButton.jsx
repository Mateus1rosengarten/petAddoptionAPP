import { useContext } from "react";
import "./AuthButton.css";
import { authStates } from "../Context/AuthContext";

function AuthButton({ handleLogin, handleSignUp }) {
  const { authState, setAuthState } = useContext(authStates);
  return (
    <div className="buttons-div">
      <button
        disabled={authState.email && true}
        onClick={handleLogin}
        className="button-login"
      >
        Login
      </button>
      <button
        disabled={authState.email && true}
        onClick={handleSignUp}
        className="button-signUp"
      >
        SignUp
      </button>
    </div>
  );
}

export default AuthButton;
