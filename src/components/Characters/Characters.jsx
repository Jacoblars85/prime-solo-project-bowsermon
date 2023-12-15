import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';

function Characters() {

    const characters = useSelector(store => store.characters);

    const user = useSelector((store) => store.user);


    console.log('this is the characters', characters);

    return (
        <div className="characters">




            <BackButton />
        </div>
    );
}

export default Characters;