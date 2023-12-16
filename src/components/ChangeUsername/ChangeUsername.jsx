import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ChangeUsername() {
    const history = useHistory();

    const changeUsername = () => {
        history.push(`/changename`)

    };

    return (
        <p onClick={changeUsername}>Change Username</p>
    );
}

export default ChangeUsername;