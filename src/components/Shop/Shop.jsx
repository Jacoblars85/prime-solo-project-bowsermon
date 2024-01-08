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

    const buyHealthPot = () => {

        if (user.coins < 10) {
            setHealthOpen(false);
            return alert('you are broke broke, sorry')
        } else {

            dispatch({
                type: 'SAGA_BUY_POTION',
                payload: {
                    potionId: 1
                }
            });
            history.push(`/home`)
        }
    };



    const handleStaminaClickOpen = () => {
        setStaminaOpen(true);
    };

    const handleStaminaClose = () => {
        setStaminaOpen(false);
    };

    const buyStaminaPot = () => {

        if (user.coins < 10) {
            setStaminaOpen(false);
            return alert('you are broke broke, sorry')
        } else {

            dispatch({
                type: 'SAGA_BUY_POTION',
                payload: {
                    potionId: 2
                }
            });
            history.push(`/home`)
        }
    };




    const handleMaxClickOpen = () => {
        setMaxOpen(true);
    };

    const handleMaxClose = () => {
        setMaxOpen(false);
    };

    const buyMaxPot = () => {

        if (user.coins < 10) {
            setMaxOpen(false);
            return alert('you are broke, sorry')
        } else {

            dispatch({
                type: 'SAGA_BUY_POTION',
                payload: {
                    potionId: 3
                }
            });
            history.push(`/home`)
        }
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
                            {"Are you sure you want a Health Pot?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                A health pot will cost 10 coins and you can not get a refund.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={buyHealthPot} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={handleHealthClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

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
                            {"Are you sure you want a Stamina Pot?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            A stamina pot will cost 10 coins and you can not get a refund.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={buyStaminaPot} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={handleStaminaClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

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
                            {"Are you sure you want a Max Pot?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            A max pot will cost 20 coins and you can not get a refund.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={buyMaxPot} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={handleMaxClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>

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


