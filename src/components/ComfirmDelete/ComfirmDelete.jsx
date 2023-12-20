import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ConfirmDelete() {

    const user = useSelector((store) => store.user);

    const history = useHistory();

    const dispatch = useDispatch();


    const deleteAccount = () => {

        history.push(`/login`)
        
        dispatch({
            type: 'SAGA_DELETE_ACCOUNT',
            payload: user.id
        })
        
    };

    const goToHome = () => {

        history.push(`/user`)
    };


    return (
        <div>
            <form className="formPanel">
                <h3>Are you sure you want to delete your account?</h3>

                <button onClick={deleteAccount}>yes</button>
                <button onClick={goToHome}>No</button>

            </form>
        </div>
    );
}

export default ConfirmDelete;