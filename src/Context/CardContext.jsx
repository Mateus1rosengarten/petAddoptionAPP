import { useState } from "react";
import { createContext } from "react";

export const cardContext = createContext();

function CardContext({ children }) {
  const [cardValue, setCardValue] = useState({
    petName: "",
    adopted: "",
    type: "",
    heigth: "",
    weitght: "",
    color: "",
    bio: "",
    allergenic: "",
    // dietary: "",
    breed: "",
  });
  return (
    <cardContext.Provider value={{ cardValue, setCardValue }}>
      {children}
    </cardContext.Provider>
  );
}

export default CardContext;
