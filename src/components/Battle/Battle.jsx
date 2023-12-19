import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../BackButton/BackButton';


function Battle() {

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_BATTLE_INFO', payload: user.id });
    }, []);

    const dispatch = useDispatch();

    const basicAttacks = useSelector((store) => store.character.basicAttacks);
    const characters = useSelector(store => store.character.characters);
    const levelEnemy = useSelector(store => store.character.levelEnemy);
    const user = useSelector(store => store.user);

    let characterOne = characters[0];

    let enemyOne = levelEnemy[0];


    console.log('basic', basicAttacks);
    console.log('character', characterOne);
    console.log('enemy', enemyOne);

    let enemy = {
        name: 'toad',
        attackName: 'headbutt',
        hp: 50,
        damage: 10
    }

    let character = {
        name: 'goomba',
        attackName: 'charge',
        hp: 50,
        unique: 20,
        punch: 5,
        poke: 1
    }

    const [enemyHp, setEnemyHp] = useState(enemy.hp);
    const [characterHp, setCharacterHp] = useState(character.hp);
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

            <p>Goomba hp: {characterHp}</p>

            <br />

            <p>toad hp: {enemyHp}</p>

            <br />


            <p>this is the text box: {textBox}</p>

            <br />

            {/* need to disable button until enemy attacks */}

            <button onClick={() => battle('unique')}>{character.attackName}</button>
            <button onClick={() => battle('punch')}>punch</button>
            <button onClick={() => battle('poke')}>poke</button>

            <br />

            <BackButton />
        </div>
    );
}

export default Battle;