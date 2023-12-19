import { useState } from 'react';

function CharacterItem({ character }) {
    const [isPicture, setIsPicture] = useState(false)

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
            <button id={character.id} >Sell</button>


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

        

        </div>
    )
}

export default CharacterItem;