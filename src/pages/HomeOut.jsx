import TextWelcoming from "../ComponentsHomeOut/Text";
import Navbar from "../ComponentsHomeOut/Navbar";
import { useContext } from "react";
import { globalStates } from "../Context/StatesContexts";

function HomeLogOut() {
  const { isModal } = useContext(globalStates);

  return (
    <>
      <Navbar></Navbar>

      {!isModal && <TextWelcoming></TextWelcoming>}
      <img
        className="picture-homepage"
        src="https://images.squarespace-cdn.com/content/v1/5c222faff2e6b174633b3c87/1602271575891-SJSK411HS9S2BXR8NDIS/adopt-dog-cat-kitten-puppy-in-Atlanta-Midtown-local?format=2500w"
        style={{ width: "100vw" }}
        alt=""
      />
    </>
  );
}

export default HomeLogOut;
