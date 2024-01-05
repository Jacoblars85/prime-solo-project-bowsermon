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

    const [open, setOpen] = useState(false);
    const [prizeOpen, setPrizeOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handlePrizeClose = () => {
    //     setPrizeOpen(false);
    // };

    // const handlePrizeClickOpen = () => {
    //     setPrizeOpen(true);
    // };


    const getRandomCharacter = () => {

        if (user.coins < 15) {
            setOpen(false);
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



    return (
        <div className="shop">

            <Nav />

            <h2>Shop</h2>

            <div className='randomCharacter'>

                <h4>Random Character Box</h4>

                <p>15 coins</p>

                <Fragment>
                    <img onClick={handleClickOpen} height={200} width={200} src="images/1200px-ItemBoxMK8.webp" />
                    <Dialog
                        open={open}
                        onClose={handleClose}
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
                            <Button onClick={handleClose}>No</Button>
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


