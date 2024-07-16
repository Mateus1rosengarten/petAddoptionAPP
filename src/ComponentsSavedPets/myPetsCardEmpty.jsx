
import { Box,Card, CardBody, CardFooter, Divider, Button, ChakraProvider,CSSReset, } from '@chakra-ui/react'
import { Stack,Image } from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";

function MyPetsCardEmpty () {


    return (
        <ChakraProvider>
            <CSSReset/> 
        <Card  
        backgroundColor='#f0f0f0'
       width='25vw'
       height='40vh'
       
         >
  <CardBody>

    <Stack mt='6'>
      
 </Stack>
  </CardBody>
 
  <CardFooter display="flex">
    <ButtonGroup>
    <Box>
      </Box>
    </ButtonGroup>
  </CardFooter>
</Card> 

</ChakraProvider> )
}

export default MyPetsCardEmpty;