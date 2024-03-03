import React, { useState, useEffect, Fragment } from "react";
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


function HeldItems({ heldItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);



  return (
    <>
      <div style={{ marginLeft:"10px" }}>
        <img
          height={70}
          width={70}
          src={heldItem.pic}
        />
      </div>

<div style={{ width: "150px", marginLeft:"10px" }}>
      <h4 style={{ color: heldItem.color, width: "150px" }}>{heldItem.name}</h4>

      <p style={{ color: "red", textShadow: "1px 1px black",
            fontSize: "15px",
            fontWeight: "bold",
            fontFamily: "New Super Mario Font U",
            marginTop: 10,
            marginBottom: 0,
             }}>+{heldItem.hp} hp</p>

      <p style={{ color: "limegreen", textShadow: "1px 1px black",
            fontSize: "15px",
            fontWeight: "bold",
            fontFamily: "New Super Mario Font U",
            marginTop: 0 }}>+{heldItem.stamina} stamina</p>

      
      </div>

      <h5 style={{ color: heldItem.color, fontSize: 30 }}>
        {heldItem.cost}x{" "}
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
      <button onClick={handleConsumableClickOpen}>Buy</button>

      <div style={{ marginRight:"10px" }}>

        <NumberInput
          aria-label="Compact number input"
          placeholder="Type a number…"
          readOnly
          value={consumableValue}
          onChange={(event, val) => setConsumableValue(val)}
          min={0}
          max={Math.floor(user.coins / heldItem.cost)}
        />

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

export default HeldItems;
