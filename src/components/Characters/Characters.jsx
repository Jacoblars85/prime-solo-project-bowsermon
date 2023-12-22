import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import CharacterItem from '../CharacterItem/CharacterItem'

function Characters() {
    const dispatch = useDispatch();

    const characters = useSelector(store => store.character.characters);

    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_CHARACTERS', payload: user.id });
      }, []);

    console.log('this is the characters', characters);

    return (
        <div className="characterBox">
         
                {characters && characters.map(character => {
                    return (
                           
                            <CharacterItem key={character.id} character={character}/>

                    
                    )
                })}
    


            <BackButton />
        </div>
    );
}

export default Characters;