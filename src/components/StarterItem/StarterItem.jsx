import { useState } from "react";

function StarterItem({ start }) {
  const [isPicture, setIsPicture] = useState(false);

  const togglePicture = () => {
    setIsPicture(!isPicture);
  };

  const displayText = () => {
    if (isPicture) {
      return (
        <div className="descriptionForStarters">
          <div className="mainStatTextForStarter">
            <p className="starterTextHp">{start.hp} hp</p>
            <p className="starterTextStamina">{start.stamina} stamina</p>
            <p className="starterTextSpeed">{start.speed} speed</p>
          </div>

          <p className="starterTextAttack">{start.unique_attack}</p>
          <p className="starterDamageTextHp">{start.unique_damage} damage</p>
          <p className="starterTextTakenStamina">
            {start.unique_stamina} stamina
          </p>
        </div>
      );
    } else {
      return (
        <div className="starterPictures">
          <img src={start.profile_pic} />
        </div>
      );
    }
  };

  return (
    <div className="starter-single-box">
      <h5>{start.name}</h5>
      <ul className="starterSingleBoxUl" onClick={togglePicture}>
        {" "}
        {displayText()}{" "}
      </ul>
    </div>
  );
}

export default StarterItem;
