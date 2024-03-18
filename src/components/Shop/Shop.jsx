import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import "./Shop.css";
import Nav from "../Nav/Nav";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InfoIcon from "@mui/icons-material/Info";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Consumables from "../Consumables/Consumables";
import HeldItems from "../HeldItems/HeldItems";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import { put } from "redux-saga/effects";

function Shop() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);
  const characters = useSelector((store) => store.character.userCharacters);
  const starter = useSelector((store) => store.character.starter);
  const consumables = useSelector((store) => store.inventory.consumables);
  const held = useSelector((store) => store.inventory.held);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
  }, []);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
  }, []);

  const [randomOpen, setRandomOpen] = useState(false);

  const handleRandomClickOpen = () => {
    setRandomOpen(true);
  };

  const handleRandomClose = () => {
    setRandomOpen(false);
  };

  const getRandomCharacter = () => {
    if (user.coins < 15) {
      setRandomOpen(false);
      return alert("you are broke, sorry");
    } else if (characters.length >= 20) {
      setRandomOpen(false);
      return alert("you can only have 20 characters");
    } else {
      let randomNum = Math.floor(Math.random() * 9 + 1);

      // console.log('random number', randomNum);

      setRandomOpen(false);

      dispatch({
        type: "SAGA_POST_NEW_CHARACTER",
        payload: {
          characterID: randomNum,
        },
      });

      //   axios({
      //     method: "POST",
      //     url: "/api/characters",
      //     data: {
      //       characterID: randomNum,
      //     },
      //   })
      //     .then((responses) => {
      //       setOpenRandomSnack(true);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });

      //   axios({
      //       method: 'POST',
      //       url: '/api/characters',
      //       data: {
      //           characterID: randomNum
      //       }
      //   })
      //       axios({
      //         method: "PUT",
      //         url: "/api/characters/buy",
      //       })
      //         .then((response) => {
      //           dispatch({
      //             type: "FETCH_USER",
      //           });

      //   }).then((response) => {

      //       setOpenRandomSnack(true)

      //   }).catch((err) => {
      //       console.log(err);
      //   });

      //   dispatch({
      //       type: 'SAGA_POST_NEW_CHARACTER',
      //       payload: {
      //           characterID: randomNum,
      //       }
      //   });
      setOpenRandomSnack(true);
    }
  };

  const [openRandomSnack, setOpenRandomSnack] = useState(false);

  const handleRandomSnackClick = () => {
    setOpenRandomSnack(true);
  };

  const handleRandomSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRandomSnack(false);
  };

  return (
    <div>
      <Nav />

      <h2 className="shopHeader">Shop</h2>

      <div className="shop">
        <div className="bigBox">

          <div className="consumablesBox">
            <h3 className="consumableHeader">Consumables Items</h3>

            {consumables && consumables.map(consumableItem => {
                        return (
                            <div div className="consumables" key={consumableItem.id}>
                                <Consumables consumableItem={consumableItem} />
                            </div>
                        )
                    })}

          </div>

          <div className="randomCharacter">
            <h4>Random Character Box</h4>

            <h5>
              15x{" "}
              <img
                className="randomCharacterCoins"
                height={20}
                width={20}
                src="/images/Coin_-_New_Super_Mario_Bros.webp"
              />
            </h5>

            <img
              onClick={handleRandomClickOpen}
              height={200}
              width={200}
              src="images/1200px-ItemBoxMK8.webp"
            />

            <div className="allCharacterBox">
            <h3 className="characterHeader" >All Characters</h3>


            {/* {held && held.map(heldItem => {
                        return (
                            <div div className="held" key={heldItem.id}>
                                <HeldItems heldItem={heldItem} />
                            </div>
                        )
                    })} */}
          </div>
          </div>

          <div className="heldBox">
            <h3 className="heldHeader" >Held Items</h3>


            {held && held.map(heldItem => {
                        return (
                            <div div className="held" key={heldItem.id}>
                                <HeldItems heldItem={heldItem} />
                            </div>
                        )
                    })}
          </div>
        </div>

        <div className="backButton">
          <BackButton />
        </div>

        {/* random character dialog */}
        <Dialog
          open={randomOpen}
          onClose={handleRandomClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
              fontSize: "30px",
            }}
          >
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              This will cost 15 coins and you may get multiple of the same
              character.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: "black",
                fontSize: 16,
                fontFamily: "New Super Mario Font U",
              }}
              onClick={getRandomCharacter}
              autoFocus
            >
              Buy
            </Button>
            <Button
              sx={{
                color: "black",
                fontSize: 16,
                fontFamily: "New Super Mario Font U",
              }}
              onClick={handleRandomClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Button onClick={handleRandomSnackClick}>Open simple snackbar</Button> */}
        <Snackbar
          open={openRandomSnack}
          autoHideDuration={6000}
          onClose={handleRandomSnackClose}
          message="Random Character Is Added"
        />
      </div>
    </div>
  );
}

export default Shop;
