import React, { useState, useEffect, Fragment, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
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
import axios from "axios";


function MysteryBoxItem({ mysteryBoxItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);
  const characters = useSelector((store) => store.character.userCharacters);


  const [randomOpen, setRandomOpen] = useState(false);

  const handleRandomClickOpen = () => {
    setRandomOpen(true);
  };

  const handleRandomClose = () => {
    setRandomOpen(false);
  };

  const [newRewardPic, setNewRewardPic] = useState("");
  const [newRewardName, setNewRewardName] = useState("");
  const [newRewardId, setNewRewardId] = useState();

  const openBox = (rewardId) => {
    if (user.coins < 15) {
      setRandomOpen(false);
      return alert("you are broke, sorry");
    } else if (characters.length >= 20) {
      setRandomOpen(false);
      return alert("you can only have 20 characters");
    } else {
      let randomNum = Math.floor(Math.random() * 9 + 1);

      const newCharacter = allCharacters.find(
        (Characters) => Characters.id === randomNum
      );

      setNewRewardPic("images/mysteryBoxGif.gif");
      setNewRewardName("...");

      setTimeout(() => {
        setNewRewardPic(newCharacter.profile_pic);
        setNewRewardName(newCharacter.name);
      }, 2500);

      setNewRewardId(randomNum);

      setOpenAnimation(true);
    }
  };

  const [openAnimation, setOpenAnimation] = useState(false);

  const handleClickOpenAnimation = () => {
    setOpenAnimation(true);
  };

  const handleCloseAnimation = () => {
    setRandomOpen(false);

    dispatch({
      type: "SAGA_BUY_NEW_CHARACTER",
      payload: {
        characterID: newRewardId,
        characterCost: 15,
      },
    });
    setOpenAnimation(false);
  };


  return (
    <>

<img
  onClick={handleRandomClickOpen}
  height={150}
  width={150}
  src={mysteryBoxItem.pic}
/>

             <h4 style={{ fontSize: "25px", textShadow: "1px 1px white", width: "40%" }}>{mysteryBoxItem.name}</h4>

<div>
<h5 style={{ fontSize: "25px", textShadow: "1px 1px black", color: "#FEF202", margin: 0 }}>
  {mysteryBoxItem.cost}x{" "}
  <img
    className="randomCharacterCoins"
    height={20}
    width={20}
    src="/images/Coin_-_New_Super_Mario_Bros.webp"
  />
</h5>

<button style={{ width: "100%" }}>Buy</button>
</div>

  {/* random item dialog */}
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
            This will cost {mysteryBoxItem.cost} coins and you may get multiple of the same
            {mysteryBoxItem.id === 1 ? "character" : "item"}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "black",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
            }}
            onClick={openBox}
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

      {/* mystery box animation dialog */}
      <Dialog
        open={openAnimation}
        onClose={handleCloseAnimation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          textAlign: "center",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "New Super Mario Font U",
            textAlign: "center",
            fontSize: "30px",
            width: "420px",
            height: "65px",
            marginBottom: "20px",
          }}
        >
          {`Congrats, you got ${newRewardName}`}
        </DialogTitle>
        <DialogContent>
          <img height={200} width={200} src={newRewardPic} />
        </DialogContent>
        <DialogActions
          sx={{
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              color: "black",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
            }}
            onClick={handleCloseAnimation}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default MysteryBoxItem;
