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
import AllCharactersItem from "../AllCharactersItem/AllCharactersItem";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Shop() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);
  const characters = useSelector((store) => store.character.userCharacters);
  const starter = useSelector((store) => store.character.starter);
  const consumables = useSelector((store) => store.inventory.consumables);
  const held = useSelector((store) => store.inventory.held);
  const allCharacters = useSelector((store) => store.character.allCharacters);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
  }, []);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_CHARACTERS" });
  }, []);

  const [tabValue, setTabValue] = useState(2);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
    <div>
      <Nav />

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            fontFamily: "New Super Mario Font U",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="black"
            indicatorColor="primary"
            centered
          >
            <Tab label="Consumable Items" {...a11yProps(0)} />
            <Tab label="Held Items" {...a11yProps(1)} />
            <Tab label="Shop" {...a11yProps(2)} />
            <Tab label="Mystery Boxes" {...a11yProps(3)} />
            <Tab label="Characters" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <div className="consumablesBox">
            {consumables &&
              consumables.map((consumableItem) => {
                return (
                  <div div className="consumables" key={consumableItem.id}>
                    <Consumables consumableItem={consumableItem} />
                  </div>
                );
              })}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <div className="heldBox">
            {held &&
              held.map((heldItem) => {
                return (
                  <div div className="held" key={heldItem.id}>
                    <HeldItems heldItem={heldItem} />
                  </div>
                );
              })}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          {/* <div className="shop"> */}
          <div className="bigBox">
            <div className="consumablesBox">
              <h3 className="consumableHeader">Consumables Items</h3>

              {consumables &&
                consumables.map((consumableItem) => {
                  return (
                    <div div className="consumables" key={consumableItem.id}>
                      <Consumables consumableItem={consumableItem} />
                    </div>
                  );
                })}
            </div>

            <div className="randomCharacter">
              <div className="allCharacterArea">
                <div className="characterHeader">
                  <h3>All Characters</h3>
                </div>
                <div className="allCharacterBox">
                  {allCharacters &&
                    allCharacters.map((allCharactersItem) => {
                      return (
                        <div
                          div
                          className="allCharactersSingleBox"
                          key={allCharactersItem.id}
                        >
                          <AllCharactersItem
                            allCharactersItem={allCharactersItem}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="heldBox">
              <h3 className="heldHeader">Held Items</h3>

              {held &&
                held.map((heldItem) => {
                  return (
                    <div div className="held" key={heldItem.id}>
                      <HeldItems heldItem={heldItem} />
                    </div>
                  );
                })}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          Mystery Boxes
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={4}>
          <div className="allCharacterArea">
            <div className="allCharacterBox">
              {allCharacters &&
                allCharacters.map((allCharactersItem) => {
                  return (
                    <div
                      div
                      className="allCharactersSingleBox"
                      key={allCharactersItem.id}
                    >
                      <AllCharactersItem
                        allCharactersItem={allCharactersItem}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </CustomTabPanel>
      </Box>

      {/* <div className="shop">
        <div className="bigBox">
          <div className="consumablesBox">
            <h3 className="consumableHeader">Consumables Items</h3>

            {consumables &&
              consumables.map((consumableItem) => {
                return (
                  <div div className="consumables" key={consumableItem.id}>
                    <Consumables consumableItem={consumableItem} />
                  </div>
                );
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
              src="images/mysterBoxPic.webp"
            />
            <div className="allCharacterArea">
              <h3 className="characterHeader">All Characters</h3>

              <div className="allCharacterBox">
                {allCharacters &&
                  allCharacters.map((allCharactersItem) => {
                    return (
                      <div
                        div
                        className="allCharactersSingleBox"
                        key={allCharactersItem.id}
                      >
                        <AllCharactersItem
                          allCharactersItem={allCharactersItem}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="heldBox">
            <h3 className="heldHeader">Held Items</h3>

            {held &&
              held.map((heldItem) => {
                return (
                  <div div className="held" key={heldItem.id}>
                    <HeldItems heldItem={heldItem} />
                  </div>
                );
              })}
          </div>
        </div> */}

      <BackButton />

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
      {/* </div> */}
    </div>
  );
}

export default Shop;
