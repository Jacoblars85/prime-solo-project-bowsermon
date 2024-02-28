import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
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
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import { put } from "redux-saga/effects";

function Consumables({ consumableItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);
  const characters = useSelector((store) => store.character.characters);

  const [healthOpen, setHealthOpen] = useState(false);
  const [staminaOpen, setStaminaOpen] = useState(false);
  const [maxOpen, setMaxOpen] = useState(false);
 

  const handleHealthClickOpen = () => {
    setHealthOpen(true);
  };

  const handleHealthClose = () => {
    setHealthOpen(false);
  };

  const buyHealthPot = (healthValue) => {
    if (user.coins < healthValue * 10) {
      setHealthOpen(false);
      return alert("you are broke broke, sorry");
    } else if (characters.length === 1) {
      setHealthOpen(false);
      return alert("you must buy a character first, sorry");
    } else {
      setOpenHealthSnack(true);

      dispatch({
        type: "SAGA_BUY_POTION",
        payload: {
          potionId: 1,
          amountNum: healthValue,
        },
      });
    }
  };

  const healthValuetext = (healthvalues) => {
    return healthvalues;
  };

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

  const [openHealthSnack, setOpenHealthSnack] = useState(false);

  const handleHealthSnackClick = () => {
    setOpenHealthSnack(true);
  };

  const handleHealthSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenHealthSnack(false);
  };

  const handleStaminaClickOpen = () => {
    setStaminaOpen(true);
  };

  const handleStaminaClose = () => {
    setStaminaOpen(false);
  };

  const buyStaminaPot = (staminaValue) => {
    if (user.coins < staminaValue * 10) {
      setStaminaOpen(false);
      return alert("you are broke broke, sorry");
    } else if (characters.length === 1) {
      setStaminaOpen(false);
      return alert("you must buy a character first, sorry");
    } else {
      setOpenStaminaSnack(true);

      dispatch({
        type: "SAGA_BUY_POTION",
        payload: {
          potionId: 2,
          amountNum: staminaValue,
        },
      });
    }
  };

  const staminaValuetext = (value) => {
    return value;
  };

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

  const [openStaminaSnack, setOpenStaminaSnack] = useState(false);

  const handleStaminaSnackClick = () => {
    setOpenStaminaSnack(true);
  };

  const handleStaminaSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenStaminaSnack(false);
  };

  const handleMaxClickOpen = () => {
    setMaxOpen(true);
  };

  const handleMaxClose = () => {
    setMaxOpen(false);
  };

  const buyMaxPot = (maxValue) => {
    if (user.coins < maxValue * 20) {
      setMaxOpen(false);
      return alert("you are broke, sorry");
    } else if (characters.length === 1) {
      setMaxOpen(false);
      return alert("you must buy a character first, sorry");
    } else {
      setOpenMaxSnack(true);

      dispatch({
        type: "SAGA_BUY_POTION",
        payload: {
          potionId: 3,
          amountNum: maxValue,
        },
      });
    }
  };

  const maxValuetext = (value) => {
    return value;
  };

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

  const [openMaxSnack, setOpenMaxSnack] = useState(false);

  const handleMaxSnackClick = () => {
    setOpenMaxSnack(true);
  };

  const handleMaxSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMaxSnack(false);
  };

  return (
    <div >


      <div className="healthPot">
        <h4>Health Pot</h4>

        <div className="healthPotInfo">
          <Button
            id="basic-button"
            aria-controls={openHealthInfo ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openHealthInfo ? "true" : undefined}
            onClick={handleInfoHealthClick}
            sx={{ color: "white" }}
          >
            <InfoIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElHealth}
            open={openHealthInfo}
            onClose={handleHealthInfoClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{
                color: "red",
                textShadow: "1px 1px black",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "New Super Mario Font U",
              }}
              onClick={handleHealthInfoClose}
            >
              +25 HP
            </MenuItem>
          </Menu>
        </div>

        <h5>
          10x{" "}
          <img
            className="healthPotCoin"
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />{" "}
        </h5>

     
          <img
            onClick={handleHealthClickOpen}
            height={100}
            width={100}
            src="images/redMushroomPic.webp"
          />



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
            min={0}
            max={5}
            sx={{ color: "white" }}
          />
        </Box>
      </div>

      <div className="staminaPot">
        <h4>Stamina Pot</h4>

        <div className="staminaPotInfo">
          <Button
            id="basic-button"
            aria-controls={openStaminaInfo ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openStaminaInfo ? "true" : undefined}
            onClick={handleInfoStaminaClick}
            sx={{ color: "white" }}
          >
            <InfoIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElStamina}
            open={openStaminaInfo}
            onClose={handleStaminaInfoClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{
                color: "limegreen",
                textShadow: "1px 1px black",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "New Super Mario Font U",
              }}
              onClick={handleStaminaInfoClose}
            >
              +30 Stamina
            </MenuItem>
          </Menu>
        </div>

        <h5>
          10x{" "}
          <img
            className="staminaPotCoin"
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />
        </h5>

   
          <img
            onClick={handleStaminaClickOpen}
            height={100}
            width={100}
            src="images/greenMushroomPic.webp"
          />

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
            min={0}
            max={5}
            sx={{ color: "white" }}
          />
        </Box>
      </div>


      <div className="maxPot">
        <h4>Max Pot</h4>

        <div className="maxPotInfo">
          <Button
            id="basic-button"
            aria-controls={openMaxInfo ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMaxInfo ? "true" : undefined}
            onClick={handleInfoMaxClick}
            sx={{ color: "white" }}
          >
            <InfoIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElMax}
            open={openMaxInfo}
            onClose={handleMaxInfoClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{
                color: "red",
                textShadow: "1px 1px black",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "New Super Mario Font U",
              }}
              onClick={handleMaxInfoClose}
            >
              +20 HP
            </MenuItem>
            <MenuItem
              sx={{
                color: "limegreen",
                textShadow: "1px 1px black",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "New Super Mario Font U",
              }}
              onClick={handleMaxInfoClose}
            >
              +25 Stamina
            </MenuItem>
          </Menu>
        </div>

        <h5>
          20x{" "}
          <img
            className="maxPotCoins"
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />
        </h5>


          <img
            onClick={handleMaxClickOpen}
            height={100}
            width={100}
            src="images/megaMushroomPic.webp"
          />


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
            min={0}
            max={5}
            sx={{ color: "white" }}
          />
        </Box>
      </div>


{/* health dialog */}
      <Dialog
            open={healthOpen}
            onClose={handleHealthClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
            >
              {`Are you sure you want ${healthValue} of the Health Potions?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{
                  fontFamily: "New Super Mario Font U",
                  textAlign: "center",
                }}
              >
                This will cost {healthValue * 10} coins and you can not get a
                refund.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "New Super Mario Font U",
                }}
                onClick={() => buyHealthPot(healthValue)}
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
                onClick={handleHealthClose}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

{/* stamina dialog */}
          <Dialog
            open={staminaOpen}
            onClose={handleStaminaClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
            >
              {`Are you sure you want ${staminaValue} of the Stamina Potions?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{
                  fontFamily: "New Super Mario Font U",
                  textAlign: "center",
                }}
              >
                This will cost {staminaValue * 10} coins and you can not get a
                refund.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "New Super Mario Font U",
                }}
                onClick={() => buyStaminaPot(staminaValue)}
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
                onClick={handleStaminaClose}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

{/* max dialog */}
          <Dialog
            open={maxOpen}
            onClose={handleMaxClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
            >
              {`Are you sure you want ${maxValue} of the Max Potions?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{
                  fontFamily: "New Super Mario Font U",
                  textAlign: "center",
                }}
              >
                This will cost {maxValue * 20} coins and you can not get a
                refund.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "New Super Mario Font U",
                }}
                onClick={() => buyMaxPot(maxValue)}
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
                onClick={handleMaxClose}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>


 
        {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
        <Snackbar
          open={openHealthSnack}
          autoHideDuration={4000}
          onClose={handleHealthSnackClose}
          message="Your Health Potion has been Sent to Your Inventory"
          // action={action}
        />

        {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
        <Snackbar
          open={openStaminaSnack}
          autoHideDuration={4000}
          onClose={handleStaminaSnackClose}
          message="The Stamina Potion has been Sent to Your Inventory"
          // action={action}
        />

        <Snackbar
          open={openMaxSnack}
          autoHideDuration={4000}
          onClose={handleMaxSnackClose}
          message="The Max Potion has been Sent to Your Inventory"
          // action={action}
        />
    </div>
  );
}

export default Consumables;
