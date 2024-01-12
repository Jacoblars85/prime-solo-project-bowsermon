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
import InfoIcon from '@mui/icons-material/Info';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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
            // history.push(`/characters`)
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
            // history.push(`/home`)
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


    const [anchorElHealth, setAnchorElHealth] = useState(null);
    const openHealthInfo = Boolean(anchorElHealth);

    const handleInfoHealthClick = (event) => {
        setAnchorElHealth(event.currentTarget);
    };
    const handleHealthInfoClose = () => {
        setAnchorElHealth(null);
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
            // history.push(`/home`)
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

    const [anchorElStamina, setAnchorElStamina] = useState(null);
    const openStaminaInfo = Boolean(anchorElStamina);

    const handleInfoStaminaClick = (event) => {
        setAnchorElStamina(event.currentTarget);
    };
    const handleStaminaInfoClose = () => {
        setAnchorElStamina(null);
    };




    const handleMaxClickOpen = () => {
        setMaxOpen(true);
    };

    const handleMaxClose = () => {
        setMaxOpen(false);
    };

    const buyMaxPot = (maxValue) => {
        console.log(maxValue);
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
            // history.push(`/home`)
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


    const [anchorElMax, setAnchorElMax] = useState(null);
    const openMaxInfo = Boolean(anchorElMax);

    const handleInfoMaxClick = (event) => {
        setAnchorElMax(event.currentTarget);
    };
    const handleMaxInfoClose = () => {
        setAnchorElMax(null);
    };




    return (
        <div className="shop">

            <Nav />

            <h2 className='shopHeader'>Shop</h2>

            <div className='randomCharacter'>

                <h4>Random Character Box</h4>

                <h5>15x <img className='randomCharacterCoins' height={20} width={20} src='/images/Coin_-_New_Super_Mario_Bros.webp' /></h5>

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
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={getRandomCharacter} autoFocus>
                                Buy
                            </Button>
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={handleRandomClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

            </div>

            <div className='healthPot'>

                <h4>Health Pot</h4>

                <div className='healthPotInfo'>

                    <Button
                        id="basic-button"
                        aria-controls={openHealthInfo ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openHealthInfo ? 'true' : undefined}
                        onClick={handleInfoHealthClick}
                        sx={{ color: 'white' }}
                    >
                        <InfoIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElHealth}
                        open={openHealthInfo}
                        onClose={handleHealthInfoClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleHealthInfoClose}>+25 HP</MenuItem>
                    </Menu>

                </div>

                <h5>10x <img className='healthPotCoin' height={20} width={20} src='/images/Coin_-_New_Super_Mario_Bros.webp' /> </h5>


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
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={() => buyHealthPot(healthValue)} autoFocus>
                                Buy
                            </Button>
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={handleHealthClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

                <Box sx={{ width: 200 }}>
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
                        sx={{ color: 'white' }}
                    />
                </Box>

            </div>

            <div className='staminaPot'>

                <h4>Stamina Pot</h4>


                <div className='staminaPotInfo'>

                    <Button
                        id="basic-button"
                        aria-controls={openStaminaInfo ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openStaminaInfo ? 'true' : undefined}
                        onClick={handleInfoStaminaClick}
                        sx={{ color: 'white' }}
                    >
                        <InfoIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElStamina}
                        open={openStaminaInfo}
                        onClose={handleStaminaInfoClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleStaminaInfoClose}>+30 Stamina</MenuItem>
                    </Menu>

                </div>

                <h5>10x <img className='staminaPotCoin' height={20} width={20} src='/images/Coin_-_New_Super_Mario_Bros.webp' /></h5>

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
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={() => buyStaminaPot(staminaValue)} autoFocus>
                                Buy
                            </Button>
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={handleStaminaClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

                <Box sx={{ width: 200 }}>
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
                        sx={{ color: 'white' }}
                    />
                </Box>

            </div>

            <div className='maxPot'>

                <h4>Max Pot</h4>

                <div className='maxPotInfo'>

                    <Button
                        id="basic-button"
                        aria-controls={openMaxInfo ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMaxInfo ? 'true' : undefined}
                        onClick={handleInfoMaxClick}
                        sx={{ color: 'white' }}
                    >
                        <InfoIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElMax}
                        open={openMaxInfo}
                        onClose={handleMaxInfoClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleMaxInfoClose}>+20 HP</MenuItem>
                        <MenuItem onClick={handleMaxInfoClose}>+25 Stamina</MenuItem>
                    </Menu>

                </div>

                <h5>20x <img className='maxPotCoins' height={20} width={20} src='/images/Coin_-_New_Super_Mario_Bros.webp' /></h5>

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
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={() => buyMaxPot(maxValue)} autoFocus>
                                Buy
                            </Button>
                            <Button sx={{ color: 'black', fontSize: 16 }} onClick={handleMaxClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

                <Box sx={{ width: 200 }}>
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
                        sx={{ color: 'white' }}
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



