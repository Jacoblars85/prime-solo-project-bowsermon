import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function DeleteAccount() {

    const history = useHistory();

    const comfimation = () => {
        
        history.push(`/confirmDelete`)

    };


    return (
        <p onClick={comfimation}>Delete Account</p>
    );
}

export default DeleteAccount;