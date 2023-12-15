import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';

function Characters() {

    const user = useSelector((store) => store.user);

    return (
        <div className="characters">


            <BackButton />
        </div>
    );
}

export default Characters;