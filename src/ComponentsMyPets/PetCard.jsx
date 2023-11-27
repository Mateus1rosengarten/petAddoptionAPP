import "./PetCard.css";

function PetCard({ imag,name, status, type, hei, wei, color, bio, breed,}) {
  return (
    <div className="card">
      <img src="" alt="" />
     
        <img className="img-card" src={imag} alt=""></img>
        <div className="info-card">
        <h6 className="h6-card">Name : </h6> <h6 className="h6-result"> {name}</h6> 
        <h6 className="h6-card">Status : </h6> <h6 className="h6-result">  {status}</h6>
        <h6 className="h6-card">Type : </h6> <h6 className="h6-result">  {type}</h6> 
        <h6 className="h6-card">Heigth :  </h6>  <h6 className="h6-result">  {hei} cm</h6>
        <h6 className="h6-card">Weigth : </h6> <h6 className="h6-result">  {wei} kg</h6>
        <h6 className="h6-card">Color :</h6><h6 className="h6-result">  {color}</h6>
        <h6 className="h6-card">Bio :  </h6><h6 className="h6-result">  {bio} </h6>
        <h6 className="h6-card">Breed :  </h6><h6 className="h6-result">  {breed}</h6>

        
        
        
      </div>
    </div>
  );
}

export default PetCard;
