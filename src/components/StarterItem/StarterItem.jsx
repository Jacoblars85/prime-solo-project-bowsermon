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

          <p className='characterTextHp'>{start.hp} hp</p>
          <p className='characterTextStamina'>{start.stamina} stamina</p>
          <p>{start.unique_attack}</p>
          <p className='characterTextHp'>{start.unique_damage} damage</p>
          <p className='characterTextStamina'>{start.unique_stamina} stamina cost</p>

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