import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

function ChangeUserNameFrom() {
    const [newUsername, setNewUsername] = useState('');

    const user = useSelector((store) => store.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const changeUsername = (e) => {
        e.preventDefault()
        dispatch({
            type: 'SAGA_CHANGE_USERNAME',
            payload: {
                userID: user.id,
                newName: newUsername
            }
        })
        history.push(`/user`)
    };

    return (
        <div>
            <form className="formPanel" onSubmit={changeUsername}>
                <h2>Change Username</h2>

                <div>
                    <label htmlFor="username">
                        Username:
                        <input
                            type="text"
                            name="username"
                            required
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </label>
                </div>

                <button>Submit</button>
            </form>

            <div className='backButton'>
                <BackButton />
            </div>
        </div>
    );
}

export default ChangeUserNameFrom;