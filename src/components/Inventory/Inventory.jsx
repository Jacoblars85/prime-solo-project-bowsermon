import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';


function Inventory() {
    const dispatch = useDispatch();

    
    const user = useSelector((store) => store.user.userReducer);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_IVENTORY' });
    }, []);

   

    return (
        <div >

                <Nav />

                <div className="characterBox">

                    <h2>Inventory</h2>

                    

                    <div className="healthPotionView">

                        <h3>Starter</h3>

                        

                    </div>

                </div>

                <div className='backButton'>
                    <BackButton />
                </div>

        </div>
    );
}

export default Inventory;