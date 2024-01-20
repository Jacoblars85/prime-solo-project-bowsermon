import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function StarterItem({ start }) {
  const [isPicture, setIsPicture] = useState(false)

  const togglePicture = () => {
    setIsPicture(!isPicture)
  }

  const displayText = () => {
    if (isPicture) {
      return (
        <div className='description'>

          <div className='mainStatText'>
            
            <p className='starterTextHp'>{start.hp} hp</p>
            <p className='starterTextStamina'>{start.stamina} stamina</p>
            <p className='starterTextSpeed'>{start.speed} speed</p>

          </div>

          <p className='starterTextAttack'>{start.unique_attack}</p>
          <p className='starterTextHp'>{start.unique_damage} damage</p>
          <p className='starterTextStamina'>{start.unique_stamina} stamina</p>

        </div>
      )
    } else {
      return (
        <div className='starterPictures'>
          <img src={start.profile_pic} />
        </div>
      )
    }
  }

  return (
    <div className="starter-single-box">

      <h5>{start.name}</h5>

      <ul className='starterSingleBoxUl' onClick={togglePicture}> {displayText()} </ul>

    </div>
  )
}

export default StarterItem;