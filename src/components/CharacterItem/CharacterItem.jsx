import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function CharacterItem({ character }) {
  const [isPicture, setIsPicture] = useState(false)

  const user = useSelector(store => store.user);

  const dispatch = useDispatch();


  const setStarter = () => {
    dispatch({
      type: 'SET_CURRENT_CHARACTERS',
      payload: character
    });
  }

  const sellCharacter = () => {
    dispatch({
      type: 'SAGA_SELL_CHARACTER',
      payload: {
        characterID: character.id,
        userID: user.id
      }
    });
  }


  const togglePicture = () => {
    setIsPicture(!isPicture)
  }

  const displayText = () => {
    if (isPicture) {
      return (
        <div className='description'>

          <p>{character.hp} hp</p>
          <p>{character.unique_attack} attack</p>
          <p>{character.unique_damage} damage</p>
          {/* <button id={character.id} onClick={sellCharacter} >Sell</button>
          <button id={character.id} onClick={setStarter} >Start</button> */}

        </div>
      )
    } else {
      return (
        <div>
          <img height={100} width={100} src={character.profile_pic} />
        </div>
      )
    }
  }

  return (
    <div className="single-box">

      <h5>{character.name}</h5>

      <ul onClick={togglePicture}> {displayText()} </ul>


      <button id={character.id} onClick={setStarter} >Start</button>
      <button id={character.id} onClick={sellCharacter} >Sell</button>
    </div>
  )
}

export default CharacterItem;