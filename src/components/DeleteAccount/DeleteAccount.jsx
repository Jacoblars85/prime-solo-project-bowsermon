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
        return (
            <div>

                <h6>Are you sure?</h6>

                <button onClick={deleteAccount}>yes</button>
                <button>no</button>

            </div>
        )

    };


    return (
        <p onClick={comfimation}>Delete Account</p>
    );
}

export default DeleteAccount;