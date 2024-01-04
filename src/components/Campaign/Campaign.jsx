import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';
import background from '../../il_570xN.720708044_8vd9.webp';
import './Campaign.css';




function Campaign() {
    const history = useHistory()




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

                    <button onClick={() => history.push(`/battle`)}>level 1</button>

                </div>

                <div className='levelTwo'>

                    <button onClick={() => history.push(`/battle`)}>level 2</button>

                </div>

                <div className='levelThree'>

                    <button onClick={() => history.push(`/battle`)} >level 3</button>

                </div>

                <div className='levelFour'>

                    <button onClick={() => history.push(`/battle`)} >level 4</button>

                </div>

                <div className='levelFive'>

                    <button onClick={() => history.push(`/battle`)} >level 5</button>

                </div>


            <div className='backButton'>
                <BackButton />
            </div>
            
        </div>
    );
}

export default Campaign;