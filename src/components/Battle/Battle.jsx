import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';


function Battle() {

    const user = useSelector((store) => store.user);

    return (
        <div className="battle">

            <BackButton />
        </div>
    );
}

export default Battle;