import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';
import './Battle.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import background from '../../public/images/ExportBackgroundnomoveclound.webp';


function Battle() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_BATTLE_INFO', payload: user.id });
    }, []);

    
    const history = useHistory()

    const basicAttacks = useSelector((store) => store.character.basicAttacks);
    const characters = useSelector((store) => store.character.characters);
    const starter = useSelector((store) => store.character.starter);
    const levelEnemy = useSelector((store) => store.character.levelEnemy);
    const user = useSelector((store) => store.user);


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

    const [isDisabled, setIsDisabled] = useState(false);
    const [enemyClassName, setEnemyClassName] = useState("enemy");
    const [enemyPicAttack, setEnemyPicAttack] = useState("");
    const [characterPicAttack, setCharacterPicAttack] = useState("");


    const [openWinner, setWinnerOpen] = useState(false);
    const [openLoser, setLoserOpen] = useState(false);

    const handleWinnerClose = () => {
        history.push(`/user`)
        dispatch({
            type: 'SAGA_USER_WON_THE_BATTLE',
            payload: user.id
        });
    };

    const handleLoserClose = () => {
        history.push(`/user`)
    };


    const disableButtons = () => {

        setIsDisabled(true)

        setTimeout(() => {
            setIsDisabled(false);
        }, 5500);

    };

    const attack = (attackType, basicAttacks, characterOne) => {

        setCharacterPicAttack("chacracterPicAttack")

        setTimeout(() => {
            setCharacterPicAttack("")
        }, 150);

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

        setEnemyClassName("shake")

        setTimeout(() => {
            setCharacterHp(characterHp - enemyOne.unique_damage)
            setEnemyClassName("enemy")
            setEnemyPicAttack("enemyPicAttack")
        }, 5000);


        setTimeout(() => {
            setEnemyPicAttack("")
        }, 5150);

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
            return setWinnerOpen(true)
        } else if (characterHp <= 0) {
            setCharacterHp(0)
            return setLoserOpen(true)
        }
    };

    const battle = (attackType) => {

        disableButtons();
        attack(attackType, basicAttacks, characterOne);
        characterTextBox(attackType, basicAttacks, characterOne);
        enemyAttack(enemyOne);
        enemyTextBox(enemyOne);
        decideWinner();
    };

    return (
        <div className="battle"
            style={{
                backgroundImage: `url(images/ExportBackgroundnomoveclound.webp)`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `100%`
            }}>

            <div className='character'>

                <p>{characterOne.name} hp: {characterHp}</p>
                <progress id="hp-meter" value={characterHp} max={characterOne.hp}></progress>
                <img className={characterPicAttack} height={300} width={300} src={characterOne.profile_pic} />

            </div>

            <div className={enemyClassName}>

                <p>{enemyOne.name} hp: {enemyHp}</p>
                <progress id="hp-meter" value={enemyHp} max={enemyOne.hp}></progress>
                <img className={enemyPicAttack} height={300} width={200} src={enemyOne.battle_pic} />

            </div>

            <div className='textBox'>

                <p>{textBox}</p>

            </div>

            <div className='attacks'>

                <button onClick={() => battle('unique')} className='uniqueAttack' disabled={isDisabled} >{characterOne.unique_attack}</button>
                <button onClick={() => battle('punch')} className='punchAttack' disabled={isDisabled} >punch</button>
                <button onClick={() => battle('poke')} className='pokeAttack' disabled={isDisabled} >poke</button>

            </div>

            <div className='backButton'>
                <BackButton />
            </div>

            {/* for the winner  */}
            <Fragment>
                <Dialog
                    open={openWinner}
                    onClose={handleWinnerClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Congrats, you win!!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Click the close button to go back home and collect your 5 coins!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleWinnerClose} autoFocus> Close </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

            {/* for the loser */}
            <Fragment>
                <Dialog
                    open={openLoser}
                    onClose={handleLoserClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You Lost, better luck next time pal."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You Suck, click the close button to go home and try again!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoserClose} autoFocus> Close </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        </div>
    );
}

export default Battle;