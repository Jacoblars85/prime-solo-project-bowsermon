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

          <p>{start.hp} hp</p>
          <p>{start.unique_attack} attack</p>
          <p>{start.unique_damage} damage</p>

        </div>
      )
    } else {
      return (
        <div>
          <img height={100} width={100} src={start.profile_pic} />
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