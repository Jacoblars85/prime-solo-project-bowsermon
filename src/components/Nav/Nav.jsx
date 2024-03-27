import React, { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import Settings from "../Settings/Settings";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CircularProgressWithLabel(props) {
  const user = useSelector((store) => store.user.userReducer);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={50}
        thickness={6}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          fontSize="20px"
        >
          {Math.floor(user.xp_level)}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function Nav(props) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);
  const userRewards = useSelector((store) => store.user.userRewards);

  const normalise = () =>
    ((user.xp_level - Math.floor(user.xp_level) - 0) * 100) / (1 - 0);

  const [openReward, setOpenReward] = useState(false);

  const handleClickOpenReward = () => {
    setOpenReward(true);
  };

  const handleCloseReward = () => {
    setOpenReward(false);
  };

  const openBox = (rewardId) => {
    let randomNum;

    if (rewardId === 1) {
      // character box
      randomNum = Math.floor(Math.random() * 9 + 1);

      console.log("randomNum in held", randomNum);
    } else if (rewardId === 2) {
      // held item box
      randomNum = Math.floor(Math.random() * (16 - 7) + 7);

      console.log("randomNum in held", randomNum);
    } else if (rewardId === 3) {
      // consumable box
      randomNum = Math.floor(Math.random() * 6 + 1);

      console.log("randomNum in held", randomNum);
    } else if (rewardId === 4) {
      // all item box
      randomNum = Math.floor(Math.random() * 15 + 1);

      console.log("randomNum in held", randomNum);
    }

    // dispatch({
    //   type: "SAGA_OPEN_BOX",
    //   payload: { rewardId: rewardId, randomNum: randomNum, },
    // });
  };

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Bowsermon</h2>
      </Link>
      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "10px 10px 10px 10px",
              color: "white",
              fontSize: "20px",
            }}
          >
            <img
              height={20}
              width={20}
              src="/images/Coin_-_New_Super_Mario_Bros.webp"
            />{" "}
            {user.coins}
          </div>

          <div style={{ paddingLeft: "12px", cursor: "pointer" }}>
            {userRewards.length === 0 ? (
              <RedeemRoundedIcon
                onClick={handleClickOpenReward}
                sx={{ color: "white" }}
              />
            ) : (
              <NewReleasesIcon
                onClick={handleClickOpenReward}
                sx={{ color: "yellow" }}
              />
            )}
          </div>

          <div style={{ padding: "10px 5px 10px 12px" }}>
            <CircularProgressWithLabel value={normalise(props.value)} />
          </div>

          <div>
            <Settings />
          </div>
        </Box>
      )}

      {/* Full screen dialog */}
      <Dialog
        fullScreen
        open={openReward}
        onClose={handleCloseReward}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ backgroundColor: "gray" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseReward}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
              }}
              variant="h6"
              component="div"
            >
              Collect your rewards
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {/* <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            paddingBottom={3}
          > */}

          {userRewards &&
            userRewards.map((rewards) => {
              return (
                <div key={rewards.id}>
                  <ListItemButton
                  // onClick={() => handleEquipClickOpen(rewards.id)}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      columnGap={20}
                      justifyContent="space-around"
                      alignItems="center"
                      height={125}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        columnGap={5}
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <p
                          style={{
                            color: "black",
                            fontSize: "25px",
                          }}
                        >
                          {rewards.number}X
                        </p>
                      </Box>
                      <h4
                        style={{
                          color: "black",
                          fontSize: "25px",
                          width: "200px",
                          textAlign: "center",
                        }}
                      >
                        {rewards.name}
                      </h4>

                      <img height={100} width={100} src={rewards.pic} />

                      <button onClick={() => openBox(rewards.id)}>
                        Open Box
                      </button>
                    </Box>
                  </ListItemButton>
                  <Divider />
                </div>
              );
            })}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            height="85vh"
            width="100%"
            fontSize={25}
          >
            {userRewards.length === 0
              ? "You do not have any rewards at this time, level up to receive more rewards!"
              : ""}
          </Box>
          {/* </Box> */}
        </List>
      </Dialog>
    </div>
  );
}

export default Nav;
