import React, { useState, useEffect, Fragment, forwardRef } from "react";
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
// import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import { put } from "redux-saga/effects";

import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

const NumberInput = forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: '▴',
        },
        decrementButton: {
          children: '▾',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: black;
  border: 2px solid black;
  display: grid;
  grid-template-columns: 20px 1px;
  grid-template-rows: 20px 27.5px;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
  width: 35px;
  height: 45px;
  
`,
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 550;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: black;
  background: inherit;
  border: none;
  
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px
  width: 20px;
  height: 20px;
  font-family: system-ui, sans-serif;
  font-size: 30px;
  line-height: 1;
  border: 0;
  color: black;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    &:hover {
      cursor: pointer;
      color: grey;
    }
  background: inherit;
  color: black;
  
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    &:hover {
      cursor: pointer;
      color: grey;
    }
  background: inherit;
  color: black;
  }
  & .arrow {
    transform: translateY(-1px);
  }
`,
);

function Consumables({ consumableItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);
  const characters = useSelector((store) => store.character.characters);

  console.log("consumableItem", consumableItem);

  const [consumableOpen, setConsumableOpen] = useState(false);

  const handleConsumableClickOpen = () => {
    setConsumableOpen(true);
  };

  const handleConsumableClose = () => {
    setConsumableOpen(false);
  };

  const buyConsumable = (consumableAmount) => {
    if (user.coins < consumableAmount * consumableItem.cost) {
      setConsumableOpen(false);
      return alert("you are broke broke, sorry");
    } else {
      setOpenConsumableSnack(true);

      dispatch({
        type: "SAGA_BUY_POTION",
        payload: {
          potionId: consumableItem.id,
          amountNum: consumableAmount,
        },
      });
    }
  };

  const consumableValuetext = (consumablevalues) => {
    return consumablevalues;
  };

  const [consumableValue, setConsumableValue] = useState(0);

  const handleConsumableChange = (event, newConsumableValue) => {
    setConsumableValue(newConsumableValue);
  };

  const [anchorElConsumable, setAnchorElConsumable] = useState(null);
  const openConsumableInfo = Boolean(anchorElConsumable);

  const handleConsumableInfoClick = (event) => {
    setAnchorElConsumable(event.currentTarget);
  };
  const handleConsumableInfoClose = () => {
    setAnchorElConsumable(null);
  };

  const [openConsumableSnack, setOpenConsumableSnack] = useState(false);

  const handleConsumableSnackClick = () => {
    setOpenConsumableSnack(true);
  };

  const handleConsumableSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenConsumableSnack(false);
  };

  const [value, setValue] = useState(0);

  return (
    <>
        <div>
          <h4 style={{ color: consumableItem.color }}>{consumableItem.name}</h4>
          <img
            onClick={handleConsumableClickOpen}
            height={70}
            width={70}
            src={consumableItem.pic}
          />
        </div>

        <Button
          id="basic-button"
          aria-controls={openConsumableInfo ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openConsumableInfo ? "true" : undefined}
          onClick={handleConsumableInfoClick}
          sx={{ color: "white" }}
        >
          <InfoIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorElConsumable}
          open={openConsumableInfo}
          onClose={handleConsumableInfoClose}
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
            onClick={handleConsumableInfoClose}
          >
            +{consumableItem.hp} HP
          </MenuItem>
          <MenuItem
            sx={{
              color: "limegreen",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
            }}
            onClick={handleConsumableInfoClose}
          >
            +{consumableItem.stamina} stamina
          </MenuItem>
        </Menu>

        <h5 style={{ color: consumableItem.color, fontSize: 30 }}>
          {consumableItem.cost}x{" "}
          <img
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />{" "}
        </h5>

        {/* <Box sx={{ width: 200 }}>
          <Slider
            aria-label="Amount"
            defaultValue={1}
            value={consumableValue}
            onChange={handleConsumableChange}
            getAriaValueText={consumableValuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={5}
            sx={{ color: "white" }}
          />
        </Box> */}
  <div>

      <NumberInput
        aria-label="Compact number input"
        placeholder="Type a number…"
        readOnly
        value={value}
        onChange={(event, val) => setValue(val)}
        min={0} 
      max={5}
      />


        {/* <button>Buy</button> */}
        </div>

      {/* Consumable dialog */}
      <Dialog
        open={consumableOpen}
        onClose={handleConsumableClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
        >
          {`Are you sure you want ${consumableValue} of the ${consumableItem.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
            }}
          >
            This will cost {consumableValue * consumableItem.cost} coins and you
            can not get a refund.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "black",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
            }}
            onClick={() => buyConsumable(consumableValue)}
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
            onClick={handleConsumableClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Button onClick={handleConsumableSnackClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={openConsumableSnack}
        autoHideDuration={4000}
        onClose={handleConsumableSnackClose}
        message={`Your ${consumableItem.name} has been Sent to Your Inventory`}
        // action={action}
      />
    </>
  );
}

export default Consumables;
