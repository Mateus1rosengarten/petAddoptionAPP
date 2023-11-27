import { useNavigate } from "react-router";
import { Card, Button } from "react-bootstrap/";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { petContext } from "../Context/PetContext";

function CardPet({ pet }) {
  const { petInfo, setPetInfo } = useContext(petContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/pet").then((res) => {
      console.log("resposta", res.data);

      setPetInfo(res.data);

      console.log("pet info", petInfo);
     
    });
  }, []);

  return (
    <div>
      <Card style={{ width: "18rem", position: "absolute", top: "50px" }}>
        <Card.Img variant="top" className="petImage" alt={`Image${pet.name}`} />

        <Card.Body>
          <Card.Title>{pet.name.toUpperCase()}</Card.Title>
          <Card.Text>Current status: {pet.name}</Card.Text>
          <Button
            variant="dark"
            onClick={() => {
              navigate(`/pets/${pet._id}`);
            }}
          >
            See more
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardPet;
