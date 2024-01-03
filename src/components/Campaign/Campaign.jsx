import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';

function Campaign() {

    const user = useSelector((store) => store.user);



    return (
        <div>
            <div className="campaign">

                <div className='levelOne'>

                    <button>level 1</button>

                </div>

                <div className='levelTwo'>

                    <button>level 2</button>

                </div>

                <div className='levelThree'>

                    <button>level 3</button>

                </div>

                <div className='levelFour'>

                    <button>level 4</button>

                </div>

                <div className='levelFive'>

                    <button>level 5</button>

                </div>

            </div>

            <div className='backButton'>
                <BackButton />
            </div>
            
        </div>
    );
}

export default Campaign;