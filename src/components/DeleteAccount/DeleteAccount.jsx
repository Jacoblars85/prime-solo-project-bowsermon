import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



function DeleteAccount() {

    const user = useSelector((store) => store.user);

    const history = useHistory();

    const dispatch = useDispatch();


    const deleteAccount = () => {
       
        history.push(`/registration`)
        
        dispatch({
            type: 'SAGA_DELETE_ACCOUNT',
            payload: user.id
        })

    };

    const comfimation = () => {
     

    };
    

    return (
        <p onClick={deleteAccount}>Delete Account</p>
    );
}

export default DeleteAccount;