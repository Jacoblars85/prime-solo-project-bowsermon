import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';

function Characters() {
    const dispatch = useDispatch();

    const characters = useSelector(store => store.character.characters);

    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_CHARACTERS' });
      }, []);

    console.log('this is the characters', characters);

    return (
        <div className="characters">
            <ul>
                {characters.map(character => {
                    return (
                        <div key={character.id}>

                            <li>{character.name}</li>

                        </div>
                    )
                })}
            </ul>


            <BackButton />
        </div>
    );
}

export default Characters;