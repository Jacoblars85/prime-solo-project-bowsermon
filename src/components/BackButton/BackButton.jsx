import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function BackButton() {
    const history = useHistory()
    const user = useSelector((store) => store.user);

    const goToHome = () => {

        history.push(`/user`)
    };


    return (
        <div className="backButton">

            <button onClick={goToHome}><KeyboardBackspaceIcon fontSize='large'/></button>

        </div>
    );
}

export default BackButton;