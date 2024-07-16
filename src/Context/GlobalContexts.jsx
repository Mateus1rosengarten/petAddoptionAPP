import { useState } from "react";
import { createContext } from "react";

export const globalStates = createContext();

function GlobalContexts({ children }) {
  const [isModal, setIsModal] = useState({
    login: false,
    signUp: false
  });


  return (
    <globalStates.Provider value={{ isModal, setIsModal}}>
      {children}
    </globalStates.Provider>
  );
}

export default GlobalContexts ;
