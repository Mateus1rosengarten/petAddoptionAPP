import "./Form.css";

function SaveButton({ handleButton }) {
  return (
    <button className="save-button" onClick={handleButton}>
      Save
    </button>
  );
}

export default SaveButton;
