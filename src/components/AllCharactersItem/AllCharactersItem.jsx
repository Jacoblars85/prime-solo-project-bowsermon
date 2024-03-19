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


function AllCharactersItem({ allCharactersItem }) {
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
          characterId: allCharactersItem.id,
          amountNum: heldAmount,
          totalCoins: heldAmount * heldItem.cost,
        },
      });
    }
  };

  return (
    <>
    <div style={{ width: "100px", }}>
        <h4 style={{ color: "white", width: "100px" }}>
          {allCharactersItem.name}
        </h4>
      </div>

      <div >
        <img height={70} width={70} src={allCharactersItem.profile_pic} />
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
          disabled={user.coins < 100 ? true : false}
          onClick={handleHeldClickOpen}
        >
          Buy
        </button>


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
          {`Are you sure you want to buy ${allCharactersItem.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "New Super Mario Font U",
              textAlign: "center",
            }}
          >
            This will cost 100 coins and you can not get
            a refund.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            sx={{
              color: "black",
              fontSize: 16,
              fontFamily: "New Super Mario Font U",
            }}
            onClick={buyHeld}
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
