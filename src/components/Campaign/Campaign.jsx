import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';

function Campaign() {

    const user = useSelector((store) => store.user);

    return (
        <div className="campaign">


            <BackButton />
        </div>
    );
}

export default Campaign;