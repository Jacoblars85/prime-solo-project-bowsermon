import React from 'react';
import BackButton from '../BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';

function Characters() {

    const characters = useSelector(store => store.character.characters);

    const user = useSelector((store) => store.user);


    console.log('this is the characters', characters);

    return (
        <div className="characters">
<ul>
        {characters.map(character => {
            return (
                <div>

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