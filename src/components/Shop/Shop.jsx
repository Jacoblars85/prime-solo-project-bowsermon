import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../BackButton/BackButton';

function Shop() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const getRandomCharacter = () => {
        if (user.coins < 15) {
            return alert('you are broke, sorry')
        }

        let randomNum = Math.floor(Math.random() * 2 + 1);


        console.log('random number', randomNum);

        dispatch({
            type: 'SAGA_POST_NEW_CHARACTER',
            payload: {
                characterID: randomNum,
                userID: user.id,
            }
        });


    };



    return (
        <div className="shop">

            <h2>Shop</h2>

            <p>15 coins: Character Crate</p>

            <button onClick={getRandomCharacter} >Open</button>


            <BackButton />
        </div>
    );
}

export default Shop;