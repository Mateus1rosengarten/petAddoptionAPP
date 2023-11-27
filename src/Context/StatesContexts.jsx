import { useState } from "react";
import { createContext } from "react";

export const globalStates = createContext();

function StateContexts({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [popUp,setPopUp] = useState(true)

  return (
    <globalStates.Provider value={{ isModal, setIsModal,modal,setModal,popUp,setPopUp }}>
      {children}
    </globalStates.Provider>
  );
}

export default StateContexts;
