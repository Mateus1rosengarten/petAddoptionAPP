import "./PetCard.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faClock, faVenusMars, faBalanceScale, faRuler, faUserNurse, faInfoCircle,faTimesRectangle} from '@fortawesome/free-solid-svg-icons';


function PetCard({ petImageOne,petImageTwo,petImageThree, name,age,gender,status,hei,wei,owner,bio,handleAdopt,handleFoster,handleSave,isSaved,handleDeletePet,userLogedEmail,userOwnerEmail}) {
  return (
    <div className="div-pet-page">

      { userLogedEmail === userOwnerEmail &&
        <FontAwesomeIcon 
    onClick={handleDeletePet}
    size="2x"
    cursor='pointer'
    icon={faTimesRectangle} 
    style = {{marginTop:'1vh'}}
    /> }

      <div className="card-pet-page">
        <Carousel>
          <img className="img-card" src={petImageOne} alt=""></img>
          <img className="img-card" src={petImageTwo} alt=""></img>
          <img className="img-card" src={petImageThree} alt=""></img>
        </Carousel>
        <div className="card-content">
        <div className="info-card">
          <div className="div-card-info">
            <h6 className="card-pet-label"><FontAwesomeIcon icon={faPaw} style={{marginRight:'0.3vw',}} />Nome: </h6>
            <h6 className="card-pet-infos"> {name}</h6>
          </div>
          <div className="div-card-info">
            <h6 className="card-pet-label"><FontAwesomeIcon icon={faClock} style={{marginRight:'0.3vw',color:'#87CEEB'}} />Idade: </h6>{" "}
            <h6 className="card-pet-infos"> {age}</h6>
          </div>
          <div className="div-card-info">
            <h6 className="card-pet-label"><FontAwesomeIcon icon={faVenusMars} style={{marginRight:'0.3vw'}} />Genero:</h6>{" "}
            <h6 className="card-pet-infos"> {gender}</h6>
          </div>
          <div className="div-card-info">
            <h6 className="card-pet-label"><FontAwesomeIcon icon={faRuler} style={{marginRight:'0.3vw',color:'#87CEEB'}} />Porte: </h6>{" "}
            <h6 className="card-pet-infos"> {hei}</h6>
          </div>
          <div className="div-card-info">
            <h6 className="card-pet-label"><FontAwesomeIcon icon={faBalanceScale} style={{marginRight:'0.3vw'}} />Peso: </h6>{" "}
            <h6 className="card-pet-infos"> ~ {wei} kg</h6>
          </div>
          <div className="div-card-info">
            <h6 className="card-pet-label"><FontAwesomeIcon icon={faUserNurse} style={{marginRight:'0.3vw',color:'#87CEEB'}} />Cuidador/a: </h6>{" "}
            <h6 className="card-pet-infos"> {owner}</h6>
          </div>
          <div className="div-card-info">
            <h6 className="card-pet-label"><FontAwesomeIcon icon={faInfoCircle} style={{marginRight:'0.3vw'}} />Caracteristicas: </h6>
            <h6 className="card-pet-infos"> {bio} </h6>
          </div>
          </div>
          <div className="div-card-buttons">
          <button onClick={handleAdopt} className="addopt-button">
           Interesse em Adotar
          </button> 
          <button disabled={status === 'Fostered'} onClick={handleFoster} className="foster-button">
          Interesse em Abrigar
          </button> 
          <button disabled={isSaved} onClick={handleSave} className={!isSaved ? "save-buton" : "save-button-disabled"}>
           Salvar em favoritos
          </button> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
