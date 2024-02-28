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



//   const buyStaminaPot = (staminaValue) => {
//     if (user.coins < staminaValue * 10) {
//       setStaminaOpen(false);
//       return alert("you are broke broke, sorry");
//     } else if (characters.length === 1) {
//       setStaminaOpen(false);
//       return alert("you must buy a character first, sorry");
//     } else {
//       setOpenStaminaSnack(true);

//       dispatch({
//         type: "SAGA_BUY_POTION",
//         payload: {
//           potionId: 2,
//           amountNum: staminaValue,
//         },
//       });
//     }
//   };

//   const buyMaxPot = (maxValue) => {
//     if (user.coins < maxValue * 20) {
//       setMaxOpen(false);
//       return alert("you are broke, sorry");
//     } else if (characters.length === 1) {
//       setMaxOpen(false);
//       return alert("you must buy a character first, sorry");
//     } else {
//       setOpenMaxSnack(true);

//       dispatch({
//         type: "SAGA_BUY_POTION",
//         payload: {
//           potionId: 3,
//           amountNum: maxValue,
//         },
//       });
//     }
//   };




console.log('consumableItem', consumableItem );

  return (
    <div >


      <div className="consumables">
        <h4 color={consumableItem.color}>{consumableItem.name}</h4>

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

        <h5 sx={{ color: consumableItem.color, }}  >
          {consumableItem.cost}x {" "}
          <img
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />{" "}
        </h5>

     
          <img
            onClick={handleHealthClickOpen}
            height={100}
            width={100}
            src={consumableItem.pic}
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

        {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
        <Snackbar
          open={openHealthSnack}
          autoHideDuration={4000}
          onClose={handleHealthSnackClose}
          message="Your Health Potion has been Sent to Your Inventory"
          // action={action}
        />
    </div>
  );
}

export default Consumables;
