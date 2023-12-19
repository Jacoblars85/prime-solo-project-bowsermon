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


    console.log('basic', basicAttacks);
    console.log('character', characters);
    console.log('enemy', levelEnemy);

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


    const attack = (attackType) => {

        if (attackType === 'unique') {
            setEnemyHp(enemyHp - character.unique)
        } else if (attackType === 'punch') {
            setEnemyHp(enemyHp - character.punch)
        } else if (attackType === 'poke') {
            setEnemyHp(enemyHp - character.poke)
        }
        if (enemyHp <= 0) {
            setEnemyHp(0)
            alert('you win!')
        }
        console.log('enemy hp', enemyHp);

        return enemyHp;
    };

    const enemyAttack = () => {

        setTimeout(() => {
            setCharacterHp(characterHp - enemy.damage)
        }, 5000);

        if (characterHp <= 0) {
            setCharacterHp(0)
            alert('you lose!')
        }
        console.log('my hp', characterHp);

        return characterHp;
    };

    const characterTextBox = (attackType) => {
        let damage = 0

        if (attackType === 'unique') {
            damage = character.unique
            setTextBox(`${character.name} used ${character.attackName} and it did ${damage} damage`);
            return damage
        } else if (attackType === 'punch') {
            damage = character.punch
            setTextBox(`${character.name} used ${attackType} and it did ${damage} damage`);
            return damage
        } else if (attackType === 'poke') {
            damage = character.poke
            setTextBox(`${character.name} used ${attackType} and it did ${damage} damage`);
            return damage
        }
    };

    const enemyTextBox = () => {

        setTimeout(() => {
            setTextBox(`${enemy.name} used ${enemy.attackName} and it did ${enemy.damage} damage`);
        }, 5000);

    };

    const battle = (attackType) => {

        attack(attackType);
        characterTextBox(attackType);
        enemyAttack();
        enemyTextBox();

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

            <button onClick={() => battle('unique')}>unique</button>
            <button onClick={() => battle('punch')}>punch</button>
            <button onClick={() => battle('poke')}>poke</button>

            <br />

            <BackButton />
        </div>
    );
}

export default Battle;