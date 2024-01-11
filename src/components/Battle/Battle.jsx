import React, { useState, useEffect, Fragment, useRef, forwardRef } from 'react';
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
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SwitchTransition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DeadTransition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Battle() {
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_BATTLE_INFO' });
    }, []);

    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_LEVEL_ENEMY',
            payload: id
        });
    }, []);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_IVENTORY' });
    }, []);

    const history = useHistory()


    const basicAttacks = useSelector((store) => store.character.basicAttacks);
    const characters = useSelector((store) => store.character.characters);
    const starter = useSelector((store) => store.character.starter);
    const levelEnemy = useSelector((store) => store.character.levelEnemy);
    const user = useSelector((store) => store.user.userReducer);
    const inventory = useSelector((store) => store.inventory.inventory);

    // setting each starter/enemy to a varriable
    let enemyOne = levelEnemy[0];
    let starterOne = starter[0];
    let starterTwo = starter[1];


    // setting names for each item in the array
    let healthPot = inventory[0];
    let staminaPot = inventory[1];
    let maxPot = inventory[2];

    // the inventory object and first health pot
    // console.log('inventory', inventory);
    // console.log('healthpot', healthPot);


    // starters
    console.log('starterOne', starterOne);
    console.log('starterTwo', starterTwo);

    // basic attack
    // console.log('basic', basicAttacks);
    // // level enemy
    // console.log('enemy', enemyOne);

    // console.log('currenthp', currentCharacterHp);


    // starter one hp and stamina
    const [starterOneHp, setStarterOneHp] = useState(starterOne.hp);
    const [starterOneStamina, setStarterOneStamina] = useState(starterOne.stamina);
    // starter two hp and stamina
    const [starterTwoHp, setStarterTwoHp] = useState(starterTwo.hp);
    const [starterTwoStamina, setStarterTwoStamina] = useState(starterTwo.stamina);
    // Starter picture/hp/stamina on the screen

    // const [currentCharacterHp, setCurrentCharacterHp] = useState(starterOneHp);
    // const [currentCharacterStamina, setCurrentCharacterStamina] = useState(starterOneStamina);
    const [characterPicture, setCharacterPicture] = useState(starterOne.profile_pic);
    const [currentId, setCurrentId] = useState(starterOne.id);
    const [maxHp, setMaxHp] = useState(starterOne.hp);
    const [maxStamina, setMaxStamina] = useState(starterOne.stamina);


    // enemy hp and stamina
    const [enemyHp, setEnemyHp] = useState(enemyOne.hp);
    const [enemyStamina, setEnemyStamina] = useState(enemyOne.stamina);
    // text box for actions
    const [textBox, setTextBox] = useState('');

    // features that get triggered as the battle goes on
    const [isDisabled, setIsDisabled] = useState(false);
    const [enemyClassName, setEnemyClassName] = useState("enemy");
    const [enemyPicAttack, setEnemyPicAttack] = useState("");
    const [characterPicAttack, setCharacterPicAttack] = useState("");


    // All the inventory dialog functions
    const [inventoryOpen, setInventoryOpen] = useState(null);

    const handleInventoryOpen = () => {
        setInventoryOpen(true);
    };

    const handleInventoryClose = () => {
        setInventoryOpen(false);
    };


    // All of the Switch dialog functions
    const [switchOpen, setSwitchOpen] = useState(null);

    const handleSwitchOpen = () => {
        setSwitchOpen(true);
    };

    const handleSwitchClose = () => {
        setSwitchOpen(false);
    };




    const [deadOpen, setDeadOpen] = useState(null);

    const handleDeadOpen = () => {
        setDeadOpen(true);
    };

    const handleDeadClose = () => {
        setDeadOpen(false);
    };

    const deadSwitch = (switchType) => {

        if (switchType === 'starterOne') {

            setCurrentId(starterOne.id)
            setMaxHp(starterOne.hp)
            setMaxStamina(starterOne.stamina)
            setCharacterPicture(starterOne.profile_pic)
            setDeadOpen(false);

        } else if (switchType === 'starterTwo') {

            setCurrentId(starterTwo.id)
            setMaxHp(starterTwo.hp)
            setMaxStamina(starterTwo.stamina)
            setCharacterPicture(starterTwo.profile_pic)
            setDeadOpen(false);
        }

    };




    // state values to open dialog if you win or lose
    const [openWinner, setWinnerOpen] = useState(false);
    const [openLoser, setLoserOpen] = useState(false);

    // gives money to user and sends you to the campaign page
    const handleWinnerClose = () => {
        history.push(`/campaign`)
        dispatch({
            type: 'SAGA_USER_WON_THE_BATTLE',
            payload: { levelId: enemyOne.level_id }
        });
    };

    // sends you to the campaign page when you lose
    const handleLoserClose = () => {
        history.push(`/campaign`)
    };

    // after doing an action, this will disable buttons for 4.5 sec
    const disableAllButtons = () => {

        setIsDisabled(true)

        setTimeout(() => {
            setIsDisabled(false);

            // setRoundOver(true);

        }, 4500);

    };

    // this is for the users attacks or actions
    const attack = (attackType, basicAttacks, starterOne) => {

        setTimeout(() => {
            setCharacterPicAttack("")
        }, 150);

        if (currentId === starterOne.id) {

            if (attackType === 'unique') {
                setEnemyHp(enemyHp - starterOne.unique_damage)
                setStarterOneStamina(starterOneStamina - starterOne.unique_stamina)

                setCharacterPicAttack("chacracterPicAttack")

                if (enemyHp - starterOne.unique_damage <= 0) {
                    setEnemyHp(0)
                    return setWinnerOpen(true)
                }
            } else if (attackType === 'punch') {
                setEnemyHp(enemyHp - basicAttacks[0].damage)
                setStarterOneStamina(starterOneStamina - basicAttacks[0].stamina)

                setCharacterPicAttack("chacracterPicAttack")

                if (enemyHp - basicAttacks[0].damage <= 0) {
                    setEnemyHp(0)
                    setWinnerOpen(true)
                }
            } else if (attackType === 'poke') {
                setEnemyHp(enemyHp - basicAttacks[1].damage)
                setStarterOneStamina(starterOneStamina - basicAttacks[1].stamina)

                setCharacterPicAttack("chacracterPicAttack")

                if (enemyHp - basicAttacks[1].damage <= 0) {
                    setEnemyHp(0)
                    setWinnerOpen(true)
                }
            } else if (attackType === 'health') {

                setStarterOneHp(starterOneHp + 25)

                if (starterOneHp + 25 > starterOne.hp) {

                    setStarterOneHp(starterOne.hp)
                }

                setInventoryOpen(false);

                dispatch({
                    type: 'SAGA_USE_POTION',
                    payload: {
                        potionId: 1,
                    }
                })

            } else if (attackType === 'stamina') {

                setStarterOneStamina(starterOneStamina + 30)

                if (starterOneStamina + 30 > starterOne.stamina) {

                    setStarterOneStamina(starterOne.stamina)
                }

                setInventoryOpen(false);

                dispatch({
                    type: 'SAGA_USE_POTION',
                    payload: {
                        potionId: 2,
                    }
                })

            } else if (attackType === 'max') {

                setStarterOneHp(starterOneHp + 20)
                setStarterOneStamina(starterOneStamina + 25)

                if (starterOneHp + 20 > starterOne.hp) {
                    setStarterOneHp(starterOne.hp)

                } else if (starterOneStamina + 25 > starterOne.stamina) {
                    setStarterOneStamina(starterOne.stamina)

                }

                setInventoryOpen(false);

                dispatch({
                    type: 'SAGA_USE_POTION',
                    payload: {
                        potionId: 3,
                    }
                })

            } else if (attackType === 'starterTwo') {

                // setCurrentCharacterHp(starterTwoHp)
                // setCurrentCharacterStamina(starterTwoStamina)
                setCurrentId(starterTwo.id)
                setMaxHp(starterTwo.hp)
                setMaxStamina(starterTwo.stamina)
                setCharacterPicture(starterTwo.profile_pic)
                setSwitchOpen(false);
            }
        } else if (currentId === starterTwo.id) {

            if (attackType === 'unique') {
                setEnemyHp(enemyHp - starterTwo.unique_damage)
                setStarterOneStamina(starterTwoStamina - starterTwo.unique_stamina)

                setCharacterPicAttack("chacracterPicAttack")

                if (enemyHp - starterTwo.unique_damage <= 0) {
                    setEnemyHp(0)
                    return setWinnerOpen(true)
                }
            } else if (attackType === 'punch') {
                setEnemyHp(enemyHp - basicAttacks[0].damage)
                setStarterOneStamina(starterTwoStamina - basicAttacks[0].stamina)

                setCharacterPicAttack("chacracterPicAttack")

                if (enemyHp - basicAttacks[0].damage <= 0) {
                    setEnemyHp(0)
                    setWinnerOpen(true)
                }
            } else if (attackType === 'poke') {
                setEnemyHp(enemyHp - basicAttacks[1].damage)
                setStarterOneStamina(starterTwoStamina - basicAttacks[1].stamina)

                setCharacterPicAttack("chacracterPicAttack")

                if (enemyHp - basicAttacks[1].damage <= 0) {
                    setEnemyHp(0)
                    setWinnerOpen(true)
                }
            } else if (attackType === 'health') {

                setStarterOneHp(starterTwoHp + 25)

                if (starterTwoHp + 25 > starterTwo.hp) {

                    setStarterOneHp(starterTwo.hp)
                }

                setInventoryOpen(false);

                dispatch({
                    type: 'SAGA_USE_POTION',
                    payload: {
                        potionId: 1,
                    }
                })

            } else if (attackType === 'stamina') {

                setStarterOneStamina(starterTwoStamina + 30)

                if (starterTwoStamina + 30 > starterTwo.stamina) {

                    setStarterOneStamina(starterTwo.stamina)
                }

                setInventoryOpen(false);

                dispatch({
                    type: 'SAGA_USE_POTION',
                    payload: {
                        potionId: 2,
                    }
                })

            } else if (attackType === 'max') {

                setStarterOneHp(starterTwoHp + 20)
                setStarterOneStamina(starterTwoStamina + 25)

                if (starterTwoHp + 20 > starterTwo.hp) {
                    setStarterOneHp(starterTwo.hp)

                } else if (starterTwoStamina + 25 > starterTwo.stamina) {
                    setStarterOneStamina(starterTwo.stamina)

                }

                setInventoryOpen(false);

                dispatch({
                    type: 'SAGA_USE_POTION',
                    payload: {
                        potionId: 3,
                    }
                })

            } else if (attackType === 'starterOne') {

                // setCurrentCharacterHp(starterOneHp)
                // setCurrentCharacterStamina(starterOneStamina)
                setCurrentId(starterOne.id)
                setMaxHp(starterOne.hp)
                setMaxStamina(starterOne.stamina)
                setCharacterPicture(starterOne.profile_pic)
                setSwitchOpen(false);

            }
        }

        console.log('enemy hp', enemyHp);

        return enemyHp;
    };

    // after an action it reads it and puts it on the screen
    const characterTextBox = (attackType, basicAttacks, starterOne) => {

        if (currentId === starterOne.id) {
            if (attackType === 'unique') {
                setTextBox(`${starterOne.name} used ${starterOne.unique_attack}. It did ${starterOne.unique_damage} damage and took ${starterOne.unique_stamina} stamina.`);
            } else if (attackType === 'punch') {
                setTextBox(`${starterOne.name} used ${basicAttacks[0].attack}. It did ${basicAttacks[0].damage} damage and took ${basicAttacks[0].stamina} stamina.`);
            } else if (attackType === 'poke') {
                setTextBox(`${starterOne.name} used ${basicAttacks[1].attack}. It did ${basicAttacks[1].damage} damage and took ${basicAttacks[1].stamina} stamina.`);
            } else if (attackType === 'health') {
                setTextBox(`${starterOne.name} used a health potion and it healed 25 hp.`);
            } else if (attackType === 'stamina') {
                setTextBox(`${starterOne.name} used a stamina potion and it gave 30 stamina back.`);
            } else if (attackType === 'max') {
                setTextBox(`${starterOne.name} used a max potion. It healed 20 hp and gave 25 stamina back.`);
            } else if (attackType === 'starterTwo') {
                setTextBox(`${starterOne.name} switched out into ${starterTwo.name}.`);
            }

        } else if (currentId === starterTwo.id) {
            if (attackType === 'unique') {
                setTextBox(`${starterTwo.name} used ${starterTwo.unique_attack}. It did ${starterTwo.unique_damage} damage and took ${starterTwo.unique_stamina} stamina.`);
            } else if (attackType === 'punch') {
                setTextBox(`${starterTwo.name} used ${basicAttacks[0].attack}. It did ${basicAttacks[0].damage} damage and took ${basicAttacks[0].stamina} stamina.`);
            } else if (attackType === 'poke') {
                setTextBox(`${starterTwo.name} used ${basicAttacks[1].attack}. It did ${basicAttacks[1].damage} damage and took ${basicAttacks[1].stamina} stamina.`);
            } else if (attackType === 'health') {
                setTextBox(`${starterTwo.name} used a health potion and it healed 25 hp.`);
            } else if (attackType === 'stamina') {
                setTextBox(`${starterTwo.name} used a stamina potion and it gave 30 stamina back.`);
            } else if (attackType === 'max') {
                setTextBox(`${starterTwo.name} used a max potion. It healed 20 hp and gave 25 stamina back.`);
            } else if (attackType === 'starterOne') {
                setTextBox(`${starterTwo.name} switched out into ${starterOne.name}.`);
            }
        }

    };

    // after 3.5 seconds after user attacks, this will do all of the enemys attacks
    const enemyAttack = (attackType, enemyOne, basicAttacks) => {

        setTimeout(() => {

            if (currentId === starterOne.id) {

                if (enemyStamina >= enemyOne.unique_stamina) {

                    if (attackType === 'health') {

                        if (starterOneHp + 25 > starterOne.hp) {
                            setStarterOneHp(starterOne.hp - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        } else {

                            setStarterOneHp(starterOneHp + 25 - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)
                        }

                        if (starterOneHp + 25 - enemyOne.unique_damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp + 25 - enemyOne.unique_damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'max') {

                        if (starterOneHp + 20 > starterOne.hp) {
                            setStarterOneHp(starterOne.hp - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        } else {

                            setStarterOneHp(starterOneHp + 20 - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)
                        }

                        if (starterOneHp + 20 - enemyOne.unique_damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp + 20 - enemyOne.unique_damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }

                    } else if (attackType === 'starterTwo') {

                        setStarterTwoHp(starterTwoHp - enemyOne.unique_damage)
                        setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        if (starterTwoHp - enemyOne.unique_damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp - enemyOne.unique_damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }

                    } else {
                        setStarterOneHp(starterOneHp - enemyOne.unique_damage)
                        setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        if (starterOneHp - enemyOne.unique_damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp - enemyOne.unique_damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }
                    }

                    setEnemyPicAttack("enemyPicAttack")
                    setEnemyClassName("shake")

                } else if (enemyStamina >= basicAttacks[0].stamina) {

                    if (attackType === 'health') {

                        if (starterOneHp + 25 > starterOne.hp) {
                            setStarterOneHp(starterOne.hp - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        } else {

                            setStarterOneHp(starterOneHp + 25 - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)
                        }

                        if (starterOneHp + 25 - basicAttacks[0].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp + 25 - basicAttacks[0].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()

                        }
                    } else if (attackType === 'max') {

                        if (starterOneHp + 20 > starterOne.hp) {
                            setStarterOneHp(starterOne.hp - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        } else {

                            setStarterOneHp(starterOneHp + 20 - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)
                        }

                        if (starterOneHp + 20 - basicAttacks[0].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp + 20 - basicAttacks[0].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'starterTwo') {

                        setStarterTwoHp(starterTwoHp - basicAttacks[0].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        if (starterTwoHp - basicAttacks[0].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp - basicAttacks[0].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }

                    } else {
                        setStarterOneHp(starterOneHp - basicAttacks[0].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        if (starterOneHp - basicAttacks[0].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp - basicAttacks[0].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }
                    }

                    setEnemyPicAttack("enemyPicAttack")
                    setEnemyClassName("shake")

                } else if (enemyStamina >= basicAttacks[1].stamina) {

                    if (attackType === 'health') {

                        if (starterOneHp + 25 > starterOne.hp) {
                            setStarterOneHp(starterOne.hp - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        } else {

                            setStarterOneHp(starterOneHp + 25 - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)
                        }

                        if (starterOneHp + 25 - basicAttacks[1].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp + 25 - basicAttacks[1].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'max') {

                        if (starterOneHp + 20 > starterOne.hp) {
                            setStarterOneHp(starterOne.hp - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        } else {

                            setStarterOneHp(starterOneHp + 20 - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)
                        }

                        if (starterOneHp + 20 - basicAttacks[1].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp + 20 - basicAttacks[1].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'starterTwo') {

                        setStarterTwoHp(starterTwoHp - basicAttacks[1].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        if (starterTwoHp - basicAttacks[1].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp - basicAttacks[1].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    } else {
                        setStarterOneHp(starterOneHp - basicAttacks[1].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        if (starterOneHp - basicAttacks[1].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp - basicAttacks[1].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }
                    }

                    setEnemyPicAttack("enemyPicAttack")
                    setEnemyClassName("shake")
                }
            } else if (currentId === starterTwo.id) {

                if (enemyStamina >= enemyOne.unique_stamina) {

                    if (attackType === 'health') {

                        if (starterTwoHp + 25 > starterTwo.hp) {
                            setStarterTwoHp(starterTwo.hp - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        } else {

                            setStarterTwoHp(starterTwoHp + 25 - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)
                        }

                        if (starterTwoHp + 25 - enemyOne.unique_damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp + 25 - enemyOne.unique_damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'max') {

                        if (starterTwoHp + 20 > starterTwo.hp) {
                            setStarterTwoHp(starterTwo.hp - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        } else {

                            setStarterTwoHp(starterTwoHp + 20 - enemyOne.unique_damage)
                            setEnemyStamina(enemyStamina - enemyOne.unique_stamina)
                        }

                        if (starterTwoHp + 20 - enemyOne.unique_damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp + 20 - enemyOne.unique_damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'starterOne') {

                        setStarterOneHp(starterOneHp - enemyOne.unique_damage)
                        setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        if (starterOneHp - enemyOne.unique_damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp - enemyOne.unique_damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }

                    } else {
                        setStarterTwoHp(starterTwoHp - enemyOne.unique_damage)
                        setEnemyStamina(enemyStamina - enemyOne.unique_stamina)

                        if (starterTwoHp - enemyOne.unique_damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp - enemyOne.unique_damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    }

                    setEnemyPicAttack("enemyPicAttack")
                    setEnemyClassName("shake")

                } else if (enemyStamina >= basicAttacks[0].stamina) {

                    if (attackType === 'health') {

                        if (starterTwoHp + 25 > starterTwo.hp) {
                            setStarterTwoHp(starterTwo.hp - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        } else {

                            setStarterTwoHp(starterTwoHp + 25 - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)
                        }

                        if (starterTwoHp + 25 - basicAttacks[0].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp + 25 - basicAttacks[0].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'max') {

                        if (starterTwoHp + 20 > starterTwo.hp) {
                            setStarterTwoHp(starterTwo.hp - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        } else {

                            setStarterTwoHp(starterTwoHp + 20 - basicAttacks[0].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[0].stamina)
                        }

                        if (starterTwoHp + 20 - basicAttacks[0].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp + 20 - basicAttacks[0].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'starterOne') {

                        setStarterOneHp(starterOneHp - basicAttacks[0].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        if (starterOneHp - basicAttacks[0].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp - basicAttacks[0].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }

                    } else {
                        setStarterTwoHp(starterTwoHp - basicAttacks[0].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[0].stamina)

                        if (starterTwoHp - basicAttacks[0].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp - basicAttacks[0].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    }

                    setEnemyPicAttack("enemyPicAttack")
                    setEnemyClassName("shake")

                } else if (enemyStamina >= basicAttacks[1].stamina) {

                    if (attackType === 'health') {

                        if (starterTwoHp + 25 > starterTwo.hp) {
                            setStarterTwoHp(starterTwo.hp - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        } else {

                            setStarterTwoHp(starterTwoHp + 25 - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)
                        }

                        if (starterTwoHp + 25 - basicAttacks[1].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp + 25 - basicAttacks[1].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'max') {

                        if (starterTwoHp + 20 > starterTwo.hp) {
                            setStarterTwoHp(starterTwo.hp - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        } else {

                            setStarterTwoHp(starterTwoHp + 20 - basicAttacks[1].damage)
                            setEnemyStamina(enemyStamina - basicAttacks[1].stamina)
                        }

                        if (starterTwoHp + 20 - basicAttacks[1].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp + 20 - basicAttacks[1].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    } else if (attackType === 'starterOne') {

                        setStarterOneHp(starterOneHp - basicAttacks[1].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        if (starterOneHp - basicAttacks[1].damage <= 0 && starterTwoHp <= 0) {
                            setStarterOneHp(0)
                            setLoserOpen(true)
                        } else if (starterOneHp - basicAttacks[1].damage <= 0) {
                            setStarterOneHp(0)
                            handleDeadOpen()
                        }

                    } else {
                        setStarterTwoHp(starterTwoHp - basicAttacks[1].damage)
                        setEnemyStamina(enemyStamina - basicAttacks[1].stamina)

                        if (starterTwoHp - basicAttacks[1].damage <= 0 && starterOneHp <= 0) {
                            setStarterTwoHp(0)
                            setLoserOpen(true)
                        } else if (starterTwoHp - basicAttacks[1].damage <= 0) {
                            setStarterTwoHp(0)
                            handleDeadOpen()
                        }
                    }

                    setEnemyPicAttack("enemyPicAttack")
                    setEnemyClassName("shake")
                }

            }


        }, 3000);

        setTimeout(() => {
            setEnemyPicAttack("")
            setEnemyClassName("enemy")
        }, 3150);

        console.log('my hp', starterOneHp);

        return starterOneHp;
    };

    // after 3.5 seconds this will run and put whatever enemy did on the screen
    const enemyTextBox = (enemyOne, basicAttacks) => {

        setTimeout(() => {

            if (enemyStamina >= enemyOne.unique_stamina) {

                setTextBox(`${enemyOne.name} used ${enemyOne.unique_attack}. It did ${enemyOne.unique_damage} damage and took ${enemyOne.unique_stamina} stamina.`);

            } else if (enemyStamina >= basicAttacks[0].stamina) {

                setTextBox(`${enemyOne.name} used ${basicAttacks[0].attack}. It did ${basicAttacks[0].damage} damage and took ${basicAttacks[0].stamina} stamina.`);

            } else if (enemyStamina >= basicAttacks[1].stamina) {

                setTextBox(`${enemyOne.name} used ${basicAttacks[1].attack}. It did ${basicAttacks[1].damage} damage and took ${basicAttacks[1].stamina} stamina.`);

            } else if (enemyStamina === 0) {

                setTextBox(`${enemyOne.name} tried to attack but it failed. They have no more stamina and could not move.`);

            }

        }, 3000);

    };

    // holds every battle funtions inside and in order
    const battle = (attackType) => {

        disableAllButtons();
        attack(attackType, basicAttacks, starterOne);
        characterTextBox(attackType, basicAttacks, starterOne);
        enemyAttack(attackType, enemyOne, basicAttacks);
        enemyTextBox(enemyOne, basicAttacks);

    };

    return (
        <div className="battle"
            style={{
                backgroundImage: `url(${enemyOne.level_id % 2 ? lakeBackground : forestBackground})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                height: `100vh`,
                width: `100vw`,
            }}>

            {/* Character position */}
            <div className='character'>

                <p className="hp-text"> hp: {currentId === starterOne.id ? starterOneHp : starterTwoHp}</p>
                <p className="stamina-text"> stamina: {currentId === starterOne.id ? starterOneStamina : starterTwoStamina}</p>

                <progress className="hp-meter" value={currentId === starterOne.id ? starterOneHp : starterTwoHp} max={maxHp}></progress>
                <progress className="stamina-meter" value={currentId === starterOne.id ? starterOneStamina : starterTwoStamina} max={maxStamina}></progress>

                <img className={characterPicAttack} src={characterPicture} />

            </div>

            {/* enmey position */}
            <div className={enemyClassName}>

                <p className="hp-text"> hp: {enemyHp}</p>
                <p className="stamina-text">stamina: {enemyStamina}</p>

                <progress className="hp-meter" value={enemyHp} max={enemyOne.hp}></progress>
                <progress className="stamina-meter" value={enemyStamina} max={enemyOne.stamina}></progress>

                <img className={enemyPicAttack} height={300} width={200} src={enemyOne.battle_pic} />

            </div>

            {/* text box position */}
            <div className='textBox'>

                <p>{textBox}</p>

            </div>

            {/* attack buttons position */}
            <div className='attacks' >

                <button onClick={handleInventoryOpen} className='inventory' disabled={isDisabled} >Inventory</button>
                <button onClick={() => battle('unique')} className='uniqueAttack' disabled={currentId === starterOne.id ? starterOneStamina < starterOne.unique_stamina ? true : isDisabled : starterTwoStamina < starterTwo.unique_stamina ? true : isDisabled} >{currentId === starterOne.id ? starterOne.unique_attack : starterTwo.unique_attack}</button>
                <button onClick={handleSwitchOpen} className='switch' disabled={isDisabled} >Switch</button>
                <button onClick={() => battle('punch')} className='kickAttack' disabled={currentId === starterOne.id ? starterOneStamina < basicAttacks[0].stamina ? true : isDisabled : starterTwoStamina < basicAttacks[0].stamina ? true : isDisabled}>{basicAttacks[0].attack}</button>

                {/* <button onClick={() => battle('poke')} className='pokeAttack' disabled={starterOneStamina < basicAttacks[1].stamina ? true : isDisabled} >{basicAttacks[1].attack}</button> */}

            </div>

            {/* back button */}
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

            {/* Switching character dialog */}
            <Fragment>
                <Dialog
                    fullScreen
                    open={switchOpen}
                    onClose={handleSwitchClose}
                    TransitionComponent={SwitchTransition}
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleSwitchClose}
                                aria-label="close"
                            // aria-expanded
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 65.5, flex: 1, }} variant="h4" component="div">
                                Choose A Character
                            </Typography>
                            {/* <Button autoFocus color="inherit" onClick={handleInventoryClose}>
                                close
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem >
                            <img height={200} width={200} src={starterOne.profile_pic} />
                            <ListItemText sx={{ ml: 55 }}
                                primary={`starter 1: ${starterOne.name}`}
                                secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina`} />
                            <Button sx={{ color: 'black', fontSize: 20 }} disabled={currentId === starterOne.id ? true : starterOneHp <= 0 ? true : false} onClick={() => battle('starterOne')} >Change Starter</Button>
                        </ListItem>

                        <Divider />

                        <ListItem >
                            <img height={200} width={200} src={starterTwo.profile_pic} />
                            <ListItemText sx={{ ml: 55 }}
                                primary={`starter 2: ${starterTwo.name}`}
                                secondary={`${starterTwoHp}/${starterTwo.hp} hp | ${starterTwoStamina}/${starterTwo.hp} stamina`} />
                            <Button sx={{ color: 'black', fontSize: 20 }} disabled={currentId === starterTwo.id ? true : starterTwoHp <= 0 ? true : false} onClick={() => battle('starterTwo')} >Change Starter</Button>
                        </ListItem>

                        <Divider />

                    </List>
                </Dialog>
            </Fragment>


            {/* Dead switching character dialog */}
            <Fragment>
                <Dialog
                    fullScreen
                    open={deadOpen}
                    onClose={handleDeadClose}
                    TransitionComponent={DeadTransition}
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleDeadClose}
                                aria-label="close"
                            >
                            </IconButton>
                            <Typography sx={{ ml: 65.5, flex: 1, }} variant="h4" component="div">
                                Choose A Character
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem >
                            <img height={200} width={200} src={starterOne.profile_pic} />
                            <ListItemText sx={{ ml: 55 }}
                                primary={`starter 1: ${starterOne.name}`}
                                secondary={`${starterOneHp}/${starterOne.hp} hp | ${starterOneStamina}/${starterOne.stamina} stamina`} />
                            <Button sx={{ color: 'black', fontSize: 20 }} disabled={currentId === starterOne.id ? true : starterOneHp <= 0 ? true : false} onClick={() => deadSwitch('starterOne')} >Change Starter</Button>
                        </ListItem>

                        <Divider />

                        <ListItem >
                            <img height={200} width={200} src={starterTwo.profile_pic} />
                            <ListItemText sx={{ ml: 55 }}
                                primary={`starter 2: ${starterTwo.name}`}
                                secondary={`${starterTwoHp}/${starterTwo.hp} hp | ${starterTwoStamina}/${starterTwo.hp} stamina`} />
                            <Button sx={{ color: 'black', fontSize: 20 }} disabled={currentId === starterTwo.id ? true : starterTwoHp <= 0 ? true : false} onClick={() => deadSwitch('starterTwo')} >Change Starter</Button>
                        </ListItem>

                        <Divider />

                    </List>
                </Dialog>
            </Fragment>

            {/* Inventory dialog */}
            <Fragment>
                <Dialog
                    fullScreen
                    open={inventoryOpen}
                    onClose={handleInventoryClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleInventoryClose}
                                aria-label="close"
                            // aria-expanded
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 73.5, flex: 1, }} variant="h4" component="div">
                                Inventory
                            </Typography>
                            {/* <Button autoFocus color="inherit" onClick={handleInventoryClose}>
                                close
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem >
                            <img height={200} width={200} src="images/healthPotion.png" />
                            <ListItemText sx={{ ml: 55 }} primary="Health Potion" secondary="25 hp | 0 stamina" /><Button sx={{ color: 'black', fontSize: 20 }} disabled={healthPot && healthPot.number == 0 ? true : false} onClick={() => battle('health')} >Use Potion</Button>
                        </ListItem>

                        <Divider />

                        <ListItem >
                            <img height={200} width={200} src="images/staminaPotion.png" />
                            <ListItemText sx={{ ml: 55 }}
                                primary="Stamina Potion"
                                secondary="0 hp | 30 stamina"
                            /><Button sx={{ color: 'black', fontSize: 20 }} disabled={staminaPot && staminaPot.number == 0 ? true : false} onClick={() => battle('stamina')} >Use Potion</Button>
                        </ListItem>

                        <Divider />

                        <ListItem >
                            <img height={200} width={200} src="images/maxPotion.png" />
                            <ListItemText sx={{ ml: 55 }} primary="Max Potion" secondary="20 hp | 25 stamina" /><Button sx={{ color: 'black', fontSize: 20 }} disabled={maxPot && maxPot.number == 0 ? true : false} onClick={() => battle('max')} >Use Potion</Button>
                        </ListItem>
                        <Divider />
                    </List>
                </Dialog>
            </Fragment>

        </div>
    );
}

export default Battle;