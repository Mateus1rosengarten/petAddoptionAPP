import Form from "../../ComponentsAdmPages/FormAddPet";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

function AddPet() {
  return (
    <>
      <ChakraProvider>
        <CSSReset />
        <Form></Form>
      </ChakraProvider>
    </>
  );
}

export default AddPet;
