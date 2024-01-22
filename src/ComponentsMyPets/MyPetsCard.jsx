
import { Box,Card, CardBody, CardFooter, Divider, Button, ChakraProvider,CSSReset, } from '@chakra-ui/react'
import { Stack,Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";

function MyPetsCard ({cardImage,cardName,cardStatus,handleButton}) {
  const buttonSize = window.innerWidth >= 768 ? 'md' : 'md'; 
  const marginSize = window.innerWidth >= 1200? '0.vw' : '0';
  const nameSize = window.innerWidth >= 768 ? 'md' : 'sm';
  const widthSize = window.innerWidth >= 1200 ? '7vw' : '23vw'

    return (
        <ChakraProvider>
            <CSSReset/> 
        <Card className='shake' 
       
       transition="transform 0.1s ease-in-out" _hover={{
        transform: "rotate(10deg)", 
      }}
         >
  <CardBody>
  <Image borderRadius='lg' src={cardImage} height='12vh' width='100%'/>
    <Stack mt='6'>
      <Heading textAlign='center'  size={nameSize}>{cardName.toUpperCase()}</Heading>
      
 </Stack>
  </CardBody>
  <Divider />
  <CardFooter display="flex" justifyContent="center" alignItems="center">
    <ButtonGroup>
    <Box>
      <Button onClick={handleButton} size={buttonSize} variant='solid' colorScheme='blue'  width={widthSize} >
        See more
      </Button >
      </Box>
    </ButtonGroup>
  </CardFooter>
</Card> 

</ChakraProvider> )
}

export default MyPetsCard;