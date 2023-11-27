import "../ComponentsMyPets/PetCard.css";

function UserCard({
  image,
  name,
  lastname,
  number,
  email,
  createdAt,
  adopted,
  fostered,
  saved,
}) {
  return (
    <div className="card">
      <img className="img-card" src={image} alt="user-profile-img"></img>
      <div className="info-card">
        <div className="field-container">
          <span className="field-label">Name:</span>
          <span className="field-value">{name}</span>
        </div>

        <div className="field-container">
          <span className="field-label">LastName:</span>
          <span className="field-value">{lastname}</span>
        </div>

        <div className="field-container">
          <span className="field-label">Number:</span>
          <span className="field-value">{number}</span>
        </div>

        <div className="field-container">
          <span className="field-label">Email:</span>
          <span className="field-value">{email}</span>
        </div>

        <div className="field-container">
          <span className="field-label">CreatedAt:</span>
          <span className="field-value">{createdAt}</span>
        </div>

        <div className="field-container">
          <span className="field-label">Addopted:</span>
          <span className="field-value">{adopted}</span>
        </div>

        <div className="field-container">
          <span className="field-label">Fostered:</span>
          <span className="field-value">{fostered}</span>
        </div>

        <div className="field-container">
          <span className="field-label">Saved:</span>
          <span className="field-value">{saved}</span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
