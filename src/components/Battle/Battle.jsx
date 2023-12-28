import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../BackButton/BackButton';
import './Battle.css';


function Battle() {

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_BATTLE_INFO', payload: user.id });
    }, []);

    const dispatch = useDispatch();

    const basicAttacks = useSelector((store) => store.character.basicAttacks);
    const characters = useSelector(store => store.character.characters);
    const starter = useSelector(store => store.character.currentCharacter);
    const levelEnemy = useSelector(store => store.character.levelEnemy);
    const user = useSelector(store => store.user);


    // make starter[0] the character one but async error with that
    let characterOne = characters[0];
    let enemyOne = levelEnemy[0];

    console.log('starter', starter);
    console.log('basic', basicAttacks);
    console.log('character', characterOne);
    console.log('enemy', enemyOne);

    const [enemyHp, setEnemyHp] = useState(enemyOne.hp);
    const [characterHp, setCharacterHp] = useState(characterOne.hp);
    const [textBox, setTextBox] = useState('');

    const attack = (attackType, basicAttacks, characterOne) => {

        if (attackType === 'unique') {
            setEnemyHp(enemyHp - characterOne.unique_damage)
        } else if (attackType === 'punch') {
            setEnemyHp(enemyHp - basicAttacks[0].damage)
        } else if (attackType === 'poke') {
            setEnemyHp(enemyHp - basicAttacks[1].damage)
        }

        console.log('enemy hp', enemyHp);

        return enemyHp;
    };

    const enemyAttack = (enemyOne) => {

        setTimeout(() => {
            setCharacterHp(characterHp - enemyOne.unique_damage)
        }, 5000);


        console.log('my hp', characterHp);

        return characterHp;
    };

    const characterTextBox = (attackType, basicAttacks, characterOne) => {

        if (attackType === 'unique') {
            setTextBox(`${characterOne.name} used ${characterOne.unique_attack} and it did ${characterOne.unique_damage} damage`);
        } else if (attackType === 'punch') {
            setTextBox(`${characterOne.name} used ${basicAttacks[0].attack} and it did ${basicAttacks[0].damage} damage`);
        } else if (attackType === 'poke') {
            setTextBox(`${characterOne.name} used ${basicAttacks[1].attack} and it did ${basicAttacks[1].damage} damage`);
        }
    };

    const enemyTextBox = (enemyOne) => {

        setTimeout(() => {
            setTextBox(`${enemyOne.name} used ${enemyOne.unique_attack} and it did ${enemyOne.unique_damage} damage`);
        }, 5000);

    };

    const decideWinner = () => {
        if (enemyHp <= 0) {
            setEnemyHp(0)
            return alert('you win!')
        } else if (characterHp <= 0) {
            setCharacterHp(0)
            return alert('you lose!')
        }
    };

    const battle = (attackType) => {

        attack(attackType, basicAttacks, characterOne);
        characterTextBox(attackType, basicAttacks, characterOne);
        enemyAttack(enemyOne);
        enemyTextBox(enemyOne);
        decideWinner();
    };

    return (
        <div className="battle">

            <div className='character'>

                <p>{characterOne.name} hp: {characterHp}</p>
                <progress id="hp-meter" value="100" max="100"></progress>
                <img height={300} width={300} src={characterOne.profile_pic} />

            </div>


            <br />


            <div className='enemy'>

                <p>{enemyOne.name} hp: {enemyHp}</p>
                <progress id="hp-meter" value="100" max="100"></progress>
                <img height={300} width={200} src={enemyOne.battle_pic} />

            </div>


            <br />


            <div className='textBox'>

                <p>this is the text box: {textBox}</p>

            </div>





            <div className='attacks'>

                {/* need to disable button until enemy attacks */}
                <button onClick={() => battle('unique')} className='uniqueAttack' >{characterOne.unique_attack}</button>
                <button onClick={() => battle('punch')} className='punchAttack' >punch</button>
                <button onClick={() => battle('poke')} className='pokeAttack' >poke</button>

            </div>


            <br />

            <div className='backButton'>
                <BackButton />
            </div>

        </div>
    );
}

export default Battle;