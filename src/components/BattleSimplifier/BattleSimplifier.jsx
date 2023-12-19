import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function BattleSimpifier() {

    const basicAttacks = useSelector((store) => store.character.basicAttacks);
    const characters = useSelector(store => store.character.characters);
    const levelEnemy = useSelector(store => store.character.levelEnemy);
    

    return (
        <div>
        {characters.map((pic) => {
            return (
            <div key={pic.id}>

              
                
            </div>
            )
          })}
          </div>
    )
    
}

export default BattleSimpifier;