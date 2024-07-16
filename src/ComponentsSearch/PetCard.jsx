import { useNavigate } from "react-router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function PetCard({ petID,petImageOne,petImageTwo,petImageThree,petName }) {
  const navigate = useNavigate();

  return (
    <div className="pet-card" key={petID}>
      <Carousel>
        <img className="pet-image" src={petImageOne} alt=""></img>
        <img className="pet-image" src={petImageTwo} alt=""></img> 
       <img className="pet-image" src={petImageThree} alt=""></img> 
      </Carousel>

      <h4
        className="pet-name"
        onClick={() => {
          navigate(`/pet/${petName}`);
        }}
      >
        {petName.toUpperCase()}
      </h4>
      <p
        className="p-card-avaible"
        onClick={() => {
          navigate(`/pet/${petName}`);
        }}
      >
        {"Disponivel"}
      </p>

      <button
        onClick={() => {
          navigate(`/pet/${petName}`);
        }}
        className="seemore-button"
      >
        Ver Mais
      </button>
    </div>
  );
}

export default PetCard;
