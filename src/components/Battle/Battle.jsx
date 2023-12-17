import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';


function Battle() {
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
        setCharacterHp(characterHp - enemy.damage)
        if (characterHp <= 0) {
            setCharacterHp(0)
            alert('you lose!')
        }
        console.log('my hp', characterHp);

        return characterHp;
    };

    const textBox = (attackType) => {
        let damage = 0

        if (attackType === 'unique') {
            damage = character.unique
            console.log(`${character.name} used ${character.attackName} and it did ${damage} damage`);
            return damage
        } else if (attackType === 'punch') {
            damage = character.punch
            console.log(`${character.name} used ${attackType} and it did ${damage} damage`);
            return damage
        } else if (attackType === 'poke') {
            damage = character.poke
            console.log(`${character.name} used ${attackType} and it did ${damage} damage`);
            return damage
        }

    };


    const enemyTextBox = () => {


        console.log(`${enemy.name} used ${enemy.attackName} and it did ${enemy.damage} damage`);

    };


    const battle = (attackType) => {

        attack(attackType);
        textBox(attackType);
        enemyAttack();
        enemyTextBox();


    };



    return (
        <div className="battle">

            {characterHp}
            <br />
            {enemyHp}

            <br />

            <button onClick={() => battle('unique')}>unique</button>
            <button onClick={() => battle('punch')}>punch</button>
            <button onClick={() => battle('poke')}>poke</button>

            <br />
            <BackButton />
        </div>
    );
}

export default Battle;