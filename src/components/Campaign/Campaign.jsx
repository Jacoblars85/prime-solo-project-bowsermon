import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';
import background from '../../il_570xN.720708044_8vd9.webp';
import './Campaign.css';
import { useDispatch, useSelector } from 'react-redux';


function Campaign() {
    const history = useHistory()
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user.userReducer);
    // const levelsCompleted = useSelector((store) => store.user.usersLevelsCompleted);



    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_BATTLE_INFO' });
    }, []);

    const goToTheBattle = (params) => {
        console.log('paramas', params);
        dispatch({
            type: 'SAGA_FETCH_LEVEL_ENEMY',
            payload: params
        });
        setTimeout(() => {
            history.push(`/battle/${params}`)
        }, 50);
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

            <div className='levelOne'>

                <button onClick={() => goToTheBattle(1)} >level 1</button>

            </div>

            <div className='levelTwo'>

                <button onClick={() => goToTheBattle(2)} disabled={user.level_1_completed ? false : true}>level 2</button>

            </div>

            <div className='levelThree'>

                <button onClick={() => goToTheBattle(3)} disabled={user.level_2_completed ? false : true}>level 3</button>

            </div>

            <div className='levelFour'>

                <button onClick={() => goToTheBattle(4)} disabled={user.level_3_completed ? false : true}>level 4</button>

            </div>

            <div className='levelFive'>

                <button onClick={() => goToTheBattle(5)} disabled={user.level_4_completed ? false : true}>level 5</button>

            </div>


            <div className='backButton'>
                <BackButton />
            </div>

        </div>
    );
}

export default Campaign;