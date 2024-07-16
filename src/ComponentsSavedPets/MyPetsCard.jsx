
import { Box,Card, CardBody, CardFooter, Divider, Button, ChakraProvider,CSSReset, } from '@chakra-ui/react'
import { Stack,Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimesRectangle} from '@fortawesome/free-solid-svg-icons'


function MyPetsCard ({cardImage,cardName,handleButton,handleUnsavePet}) {


    return (
        <ChakraProvider>
            <CSSReset/> 
        <Card className='shake' 
       width='25vw'
       height='60vh'
       transition="transform 0.1s ease-in-out" _hover={{
        transform: "rotate(10deg)", 
      }}
         >
          <FontAwesomeIcon onClick={handleUnsavePet} icon={faTimesRectangle} color='red' size='1x' cursor='pointer' style={{position:'absolute',margin:'2%'}}/>
  <CardBody>
  <Image borderRadius='lg' src={cardImage} width='100%' height='30vh' marginTop='2vh'/>
    <Stack mt='6'>
      <Heading fontFamily={"Montserrat"} textAlign='center'>{cardName.toUpperCase()}</Heading>
      
 </Stack>
  </CardBody>
  <Divider />
  <CardFooter display="flex" justifyContent="center" alignItems="center">
    <ButtonGroup>
    <Box>
      <Button onClick={handleButton} variant='solid' colorScheme='blue' width='20vw' height='6vh' marginTop='-2vh' >
        Ver Mais
      </Button >
      </Box>
    </ButtonGroup>
  </CardFooter>
</Card> 

</ChakraProvider> )
}

export default MyPetsCard;