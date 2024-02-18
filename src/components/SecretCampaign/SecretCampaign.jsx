import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';
import background from '../../il_570xN.720708044_8vd9.webp';
// import './Campaign.css';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



function SecretCampaign() {
    const history = useHistory()
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user.userReducer);
    const starter = useSelector((store) => store.character.starter);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_BATTLE_INFO' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_IVENTORY' });
    }, []);

    const goToTheBattle = (params) => {
        // console.log('paramas', params);
        dispatch({
            type: 'SAGA_FETCH_LEVEL_ENEMY',
            payload: params
        });
        setTimeout(() => {
            history.push(`/battle/${params}`)
        }, 450);
    };


    return (
        <div className="campaign"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `auto`,
                backgroundColor: `#408AF7`,
                height: `100vh`,
                width: `100%`,
                backgroundPosition: `center`,
                backgroundAttachment: `fixed`
            }}
        >

            <Nav />

            <div className='warning'>
                {starter.length === 1 || starter.length === 0 ? "Must Have 2 Starters to Play Level 1" : ""}
            </div>

            <div className='levelOne'>
                <button onClick={() => goToTheBattle(1)} disabled={starter.length === 1 || starter.length === 0 ? true : false}>1</button>
            </div>

            <div className='levelTwo'>
                <button onClick={() => goToTheBattle(2)} disabled={starter.length === 1 || starter.length === 0 ? true : user.level_1_completed ? false : true}>2</button>
            </div>

       
            <div className='backButton'>
                <button onClick={() => history.push(`/campaign`)}> <KeyboardBackspaceIcon fontSize='large'/></button>
            </div>

        </div>
    );
}

export default SecretCampaign;