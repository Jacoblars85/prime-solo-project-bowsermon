import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';
import './Shop.css';
import Nav from '../Nav/Nav';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function Shop() {

    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector((store) => store.user.userReducer);
    const characters = useSelector(store => store.character.characters);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_CHARACTERS' });
    }, []);

    // console.log('characters', characters[characters.length-1].name);

    const [randomOpen, setRandomOpen] = useState(false);
    const [healthOpen, setHealthOpen] = useState(false);
    const [staminaOpen, setStaminaOpen] = useState(false);
    const [maxOpen, setMaxOpen] = useState(false);






    // const [prizeOpen, setPrizeOpen] = useState(false);


    const handleRandomClickOpen = () => {
        setRandomOpen(true);
    };

    const handleRandomClose = () => {
        setRandomOpen(false);
    };

    // const handlePrizeClose = () => {
    //     setPrizeOpen(false);
    // };

    // const handlePrizeClickOpen = () => {
    //     setPrizeOpen(true);
    // };


    const getRandomCharacter = () => {

        if (user.coins < 15) {
            setRandomOpen(false);
            return alert('you are broke, sorry')
        } else {

            let randomNum = Math.floor(Math.random() * 7 + 1);

            console.log('random number', randomNum);

            dispatch({
                type: 'SAGA_POST_NEW_CHARACTER',
                payload: {
                    characterID: randomNum
                }
            });
            history.push(`/characters`)
        }
    };


    const handleHealthClickOpen = () => {
        setHealthOpen(true);
    };

    const handleHealthClose = () => {
        setHealthOpen(false);
    };

    const buyHealthPot = (healthValue) => {

        console.log(healthValue);
        console.log(healthValue * 10);

        if (user.coins < healthValue * 10) {
            setHealthOpen(false);
            return alert('you are broke broke, sorry')
        } else {
            console.log("healthValue:", healthValue)
            dispatch({
                type: 'SAGA_BUY_POTION',
                payload: {
                    potionId: 1,
                    amountNum: healthValue
                }
            });
            history.push(`/home`)
        }
    };

    const healthValuetext = (healthvalues) => {
        // console.log(value);
        return healthvalues;
    }

    const [healthValue, setHealthValue] = useState(0);

    const handleHealthChange = (event, newHealthValue) => {
        setHealthValue(newHealthValue);
    };



    const handleStaminaClickOpen = () => {
        setStaminaOpen(true);
    };

    const handleStaminaClose = () => {
        setStaminaOpen(false);
    };

    const buyStaminaPot = (staminaValue) => {

console.log(staminaValue);
console.log(staminaValue * 10);

        if (user.coins < staminaValue * 10) {
            setStaminaOpen(false);
            return alert('you are broke broke, sorry')
        } else {

            dispatch({
                type: 'SAGA_BUY_POTION',
                payload: {
                    potionId: 2,
                    amountNum: staminaValue
                }
            });
            history.push(`/home`)
        }
    };

    const staminaValuetext = (value) => {
        // console.log(value);
        return value;
    }

    const [staminaValue, setStaminaValue] = useState(0);

    const handleStaminaChange = (event, newStaminaValue) => {
        setStaminaValue(newStaminaValue);
    };




    const handleMaxClickOpen = () => {
        setMaxOpen(true);
    };

    const handleMaxClose = () => {
        setMaxOpen(false);
    };

    const buyMaxPot = (maxValue) => {
console.log(maxValue );
console.log(maxValue * 20);

        if (user.coins < maxValue * 20) {
            setMaxOpen(false);
            return alert('you are broke, sorry')
        } else {

            dispatch({
                type: 'SAGA_BUY_POTION',
                payload: {
                    potionId: 3,
                    amountNum: maxValue
                }
            });
            history.push(`/home`)
        }
    };

    const maxValuetext = (value) => {
        // console.log(value);
        return value;
    }

    const [maxValue, setMaxValue] = useState(0);

    const handleMaxChange = (event, newMaxValue) => {
        setMaxValue(newMaxValue);
    };




    return (
        <div className="shop">

            <Nav />

            <h2>Shop</h2>

            <div className='randomCharacter'>

                <h4>Random Character Box</h4>

                <p>15 coins</p>

                <Fragment>
                    <img onClick={handleRandomClickOpen} height={200} width={200} src="images/1200px-ItemBoxMK8.webp" />
                    <Dialog
                        open={randomOpen}
                        onClose={handleRandomClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This will cost 15 coins and you may get multiple of the same character.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={getRandomCharacter} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={handleRandomClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

            </div>

            <div className='healthPot'>

                <h4>Health Pot</h4>

                <p>10 coins</p>

                <Fragment>
                    <img onClick={handleHealthClickOpen} height={200} width={200} src="images/healthPotion.png" />
                    <Dialog
                        open={healthOpen}
                        onClose={handleHealthClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {`Are you sure you want ${healthValue} of the Health Potions?`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This will cost {healthValue * 10} coins and you can not get a refund.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => buyHealthPot(healthValue)} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={handleHealthClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

                <Box sx={{ width: 170 }}>
                    <Slider
                        aria-label="Amount"
                        defaultValue={1}
                        value={healthValue}
                        onChange={handleHealthChange}
                        getAriaValueText={healthValuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={5}
                    />
                </Box>

            </div>


            <div className='staminaPot'>

                <h4>Stamina Pot</h4>

                <p>10 coins</p>

                <Fragment>
                    <img onClick={handleStaminaClickOpen} height={200} width={200} src="images/staminaPotion.png" />
                    <Dialog
                        open={staminaOpen}
                        onClose={handleStaminaClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {`Are you sure you want ${staminaValue} of the Stamina Potions?`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This will cost {staminaValue * 10} coins and you can not get a refund.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => buyStaminaPot(staminaValue)} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={handleStaminaClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

                <Box sx={{ width: 170 }}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={1}
                        value={staminaValue}
                        onChange={handleStaminaChange}
                        getAriaValueText={staminaValuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={5}
                    />
                </Box>

            </div>


            <div className='maxPot'>

                <h4>Max Pot</h4>

                <p>20 coins</p>

                <Fragment>
                    <img onClick={handleMaxClickOpen} height={200} width={200} src="images/maxPotion.png" />
                    <Dialog
                        open={maxOpen}
                        onClose={handleMaxClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {`Are you sure you want ${maxValue} of the Max Potions?`}

                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            This will cost {maxValue * 20} coins and you can not get a refund.

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => buyMaxPot(maxValue)} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={handleMaxClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

                <Box sx={{ width: 170 }}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={1}
                        value={maxValue}
                        onChange={handleMaxChange}
                        getAriaValueText={maxValuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={5}
                    />
                </Box>

            </div>

            <div className='backButton'>
                <BackButton />
            </div>

            {/* <Fragment>
                <Dialog
                    open={prizeOpen}
                    onClose={handlePrizeClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`You got a ${characters[characters.length - 1].name}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <img height={100} width={100} src={characters[characters.length - 1].profile_pic} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePrizeClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment> */}

        </div>
    );
}

export default Shop;


