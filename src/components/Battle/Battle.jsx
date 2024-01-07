import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';
import './Battle.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import lakeBackground from '../../ExportBackgroundnomoveclound.webp';
import forestBackground from '../../RockForest.webp';


function Battle() {
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_BATTLE_INFO' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_LEVEL_ENEMY',
        payload: id  });
    }, []);


    const history = useHistory()

    const basicAttacks = useSelector((store) => store.character.basicAttacks);
    const characters = useSelector((store) => store.character.characters);
    const starter = useSelector((store) => store.character.starter);
    const levelEnemy = useSelector((store) => store.character.levelEnemy);
    const user = useSelector((store) => store.user.userReducer);


    // let characterOne = characters[0];
    let enemyOne = levelEnemy[0];
    let starterOne = starter[0];


    console.log('starter', starterOne);
    console.log('basic', basicAttacks);
    console.log('enemy', enemyOne);


    const [characterHp, setCharacterHp] = useState(starterOne.hp);
    const [characterStamina, setCharacterStamina] = useState(starterOne.stamina);
    const [enemyHp, setEnemyHp] = useState(enemyOne.hp);
    const [enemyStamina, setEnemyStamina] = useState(enemyOne.stamina);
    const [textBox, setTextBox] = useState('');


    const [isDisabled, setIsDisabled] = useState(false);
    const [enemyClassName, setEnemyClassName] = useState("enemy");
    const [enemyPicAttack, setEnemyPicAttack] = useState("");
    const [characterPicAttack, setCharacterPicAttack] = useState("");


    // const [roundOver, setRoundOver] = useState(false);


    const [openWinner, setWinnerOpen] = useState(false);
    const [openLoser, setLoserOpen] = useState(false);

    const handleWinnerClose = () => {
        history.push(`/campaign`)
        dispatch({
            type: 'SAGA_USER_WON_THE_BATTLE',
            payload: {levelId: enemyOne.level_id}
        });
    };

    const handleLoserClose = () => {
        history.push(`/campaign`)
    };

    // const checkRoundOver = () => {

    //     setTimeout(() => {
    //         if (roundOver === true) {
    //             setCharacterStamina(characterStamina + 5)
    //             setEnemyStamina(enemyStamina + 5)
    //             setRoundOver(false)
    //         }

    //     }, 4550);
            
    // };


    const disableAllButtons = () => {

        setIsDisabled(true)

        setTimeout(() => {
            setIsDisabled(false);
            
            // setRoundOver(true);

        }, 4500);

    };

    const attack = (attackType, basicAttacks, starterOne) => {

        setCharacterPicAttack("chacracterPicAttack")

        setTimeout(() => {
            setCharacterPicAttack("")
        }, 150);

        if (attackType === 'unique') {
            setEnemyHp(enemyHp - starterOne.unique_damage)
            setCharacterStamina(characterStamina - starterOne.unique_stamina)

            if (enemyHp - starterOne.unique_damage <= 0) {
                setEnemyHp(0)
                return setWinnerOpen(true)
            }
        } else if (attackType === 'punch') {
            setEnemyHp(enemyHp - basicAttacks[0].damage)
            setCharacterStamina(characterStamina - basicAttacks[0].stamina)

            if (enemyHp - basicAttacks[0].damage <= 0) {
                setEnemyHp(0)
                setWinnerOpen(true)
            }
        } else if (attackType === 'poke') {
            setEnemyHp(enemyHp - basicAttacks[1].damage)
            setCharacterStamina(characterStamina - basicAttacks[1].stamina)

            if (enemyHp - basicAttacks[1].damage <= 0) {
                setEnemyHp(0)
                setWinnerOpen(true)
            }
        }

        console.log('enemy hp', enemyHp);

        return enemyHp;
    };

    const characterTextBox = (attackType, basicAttacks, starterOne) => {

        if (attackType === 'unique') {
            setTextBox(`${starterOne.name} used ${starterOne.unique_attack}. It did ${starterOne.unique_damage} damage and took ${starterOne.unique_stamina} stamina.`);
        } else if (attackType === 'punch') {
            setTextBox(`${starterOne.name} used ${basicAttacks[0].attack}. It did ${basicAttacks[0].damage} damage and took ${basicAttacks[0].stamina} stamina.`);
        } else if (attackType === 'poke') {
            setTextBox(`${starterOne.name} used ${basicAttacks[1].attack}. It did ${basicAttacks[1].damage} damage and took ${basicAttacks[1].stamina} stamina.`);
        }
    };

    const enemyAttack = (enemyOne) => {

        setEnemyClassName("shake")

        setTimeout(() => {
            setCharacterHp(characterHp - enemyOne.unique_damage)
            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

            if (characterHp - enemyOne.unique_damage <= 0) {
                setCharacterHp(0)
                setLoserOpen(true)
            }
            setEnemyClassName("enemy")
            setEnemyPicAttack("enemyPicAttack")
        }, 3000);


        setTimeout(() => {
            setEnemyPicAttack("")
        }, 3150);

        console.log('my hp', characterHp);

        return characterHp;
    };

    const enemyTextBox = (enemyOne) => {

        setTimeout(() => {
            setTextBox(`${enemyOne.name} used ${enemyOne.unique_attack}. It did ${enemyOne.unique_damage} damage and took ${enemyOne.unique_stamina} stamina.`);
        }, 3000);

    };

    const disableButtons = () => {

        if (characterStamina < starterOne.unique_stamina) {
            
        }

    };

    const battle = (attackType) => {

        disableAllButtons();
        attack(attackType, basicAttacks, starterOne);
        characterTextBox(attackType, basicAttacks, starterOne);
        enemyAttack(enemyOne);
        enemyTextBox(enemyOne);

    };

    return (
        <div className="battle"
            style={{
                backgroundImage: `url(${enemyOne.level_id % 2 ? lakeBackground : forestBackground })`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                height: `100vh`,
                width: `100vw`,
            }}>

            <div className='character'>

                <p className="hp-text">{starterOne.name} hp: {characterHp}</p>

                <p className="stamina-text">{starterOne.name} stamina: {characterStamina}</p>


                <progress className="hp-meter" value={characterHp} max={starterOne.hp}></progress>

                <progress className="stamina-meter" value={characterStamina} max={starterOne.stamina}></progress>

                <img className={characterPicAttack} src={starterOne.profile_pic} />

            </div>

            <div className={enemyClassName}>

                <p className="hp-text">{enemyOne.name} hp: {enemyHp}</p>

                <p className="stamina-text">{enemyOne.name} stamina: {enemyStamina}</p>

                <progress className="hp-meter" value={enemyHp} max={enemyOne.hp}></progress>

                <progress className="stamina-meter" value={enemyStamina} max={enemyOne.stamina}></progress>

                <img className={enemyPicAttack} height={300} width={200} src={enemyOne.battle_pic} />

            </div>

            <div className='textBox'>

                <p>{textBox}</p>

            </div>

            <div className='attacks' >

                <button onClick={() => battle('unique')} className='uniqueAttack' disabled={characterStamina < starterOne.unique_stamina ? true : isDisabled} >{starterOne.unique_attack}</button>
                <button onClick={() => battle('punch')} className='punchAttack' disabled={characterStamina < basicAttacks[0].stamina ? true : isDisabled} >punch</button>
                <button onClick={() => battle('poke')} className='pokeAttack' disabled={characterStamina < basicAttacks[1].stamina ? true : isDisabled} >poke</button>

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