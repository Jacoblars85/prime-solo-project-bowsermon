import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BackButton() {
    const history = useHistory()
    const user = useSelector((store) => store.user);

    const goToHome = () => {

        history.push(`/user`)
    };


    return (
        <div className="backButton">

            <button onClick={goToHome}>back</button>

        </div>
    );
}

export default BackButton;