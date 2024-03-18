import React, { useState, useEffect, Fragment, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";


function AllCharactersItem({ heldItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);

  const [heldOpen, setHeldOpen] = useState(false);

  const handleHeldClickOpen = () => {
    setHeldOpen(true);
  };

  const handleHeldClose = () => {
    setHeldOpen(false);
  };

  const buyHeld = (heldAmount) => {
    if (user.coins < heldAmount * heldItem.cost) {
      setHeldOpen(false);
      return alert("you are broke broke, sorry");
    } else {
      setOpenHeldSnack(true);

      dispatch({
        type: "SAGA_BUY_ITEM",
        payload: {
          itemId: heldItem.id,
          amountNum: heldAmount,
          totalCoins: heldAmount * heldItem.cost,
        },
      });
    }
  };

  return (
    <>
      <div style={{ marginLeft: "10px" }}>
        <img height={70} width={70} src={heldItem.pic} />
      </div>

      <div style={{ width: "100px", marginLeft: "5px" }}>
        <h4 style={{ color: heldItem.color, width: "100px" }}>
          {heldItem.name}
        </h4>
      </div>
{/* 
      <div
        style={{
          width: "150px",
          height: "122px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "red",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.hp === 0 ? "" : `+${heldItem.hp} hp`}
          </p>

          <p
            style={{
              color: "limegreen",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.stamina === 0 ? "" : `+${heldItem.stamina} stamina`}
          </p>

          <p
            style={{
              color: "yellow",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.speed === 0 ? "" : `+${heldItem.speed} speed`}
          </p>

          <p
            style={{
              color: "red",
              textShadow: "1px 1px black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "New Super Mario Font U",
              margin: 0,
            }}
          >
            {heldItem.attack === 0 ? "" : `+${heldItem.attack} damage`}
          </p>
        </div>
      </div> */}

      <div style={{ marginRight: "10px" }}>
        <h5
          style={{
            color: "#FEF202",
            fontSize: 25,
            textShadow: "2px 2px black",
          }}
        >
          100x{" "}
          <img
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />{" "}
        </h5>

        <button
          disabled={user.coins < heldItem.cost ? true : false}
          onClick={handleHeldClickOpen}
        >
          Buy
        </button>
      </div>

      {/* held item dialog */}
      <Dialog
        open={heldOpen}
        onClose={handleHeldClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
        >
          {`Are you sure you want ${heldValue} of the ${heldItem.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
            }}
          >
            This will cost {heldValue * heldItem.cost} coins and you can not get
            a refund.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <NumberInput
            aria-label="Compact number input"
            placeholder="Type a number…"
            readOnly
            value={heldValue}
            onChange={(event, val) => setHeldValue(val)}
            min={1}
            max={Math.floor(user.coins / heldItem.cost)}
          />
          <Button
            sx={{
              color: "black",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
            }}
            onClick={() => buyHeld(heldValue)}
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
            onClick={handleHeldClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default AllCharactersItem;
