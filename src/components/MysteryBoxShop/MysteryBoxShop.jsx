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


function MysteryBoxShop({ heldItem }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);






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
      </div>

      <div style={{ marginRight: "10px" }}>
        <h5
          style={{
            color: "#FEF202",
            fontSize: 25,
            textShadow: "2px 2px black",
          }}
        >
          {heldItem.cost}x{" "}
          <img
            height={20}
            width={20}
            src="/images/Coin_-_New_Super_Mario_Bros.webp"
          />{" "}
        </h5>

        <button
        style={{ width: "100%"}}
          disabled={user.coins < heldItem.cost ? true : false}
          onClick={handleHeldClickOpen}
        >
          Buy
        </button>
      </div>
    </>
  );
}

export default MysteryBoxShop;
