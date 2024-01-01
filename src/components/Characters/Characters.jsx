import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import CharacterItem from '../CharacterItem/CharacterItem';
import './Characters.css';
import Nav from '../Nav/Nav';
import StarterItem from '../StarterItem/StarterItem';


function Characters() {
    const dispatch = useDispatch();

    const characters = useSelector(store => store.character.characters);
    const starter = useSelector(store => store.character.starter);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_CHARACTERS', payload: user.id });
    }, []);

    // console.log('this is the characters', characters);

    let starterOne = starter[0];

    console.log('the starter', starterOne);

    return (
        <div >
            <Nav />

            <div className="characterBox">

                <h2>Characters</h2>

                {characters && characters.map(character => {
                    return (
                        <div key={character.id}>
                            <CharacterItem character={character} />
                        </div>
                    )
                })}

                <div className="starterCharacterView">

                    <h2>Starter</h2>

                    {starter && starter.map(start => {
                        return (

                            <StarterItem start={start} />
                            
                        )
                    })}

                </div>

            </div>

            <div className='backButton'>
                <BackButton />
            </div>

        </div>
    );
}

export default Characters;