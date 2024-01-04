import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    const user = useSelector((store) => store.user);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const getRandomCharacter = () => {

        setOpen(false);

        if (user.coins < 15) {
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

        </div>
    );
}

export default Shop;


