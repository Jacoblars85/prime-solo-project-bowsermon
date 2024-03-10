import { useState, Fragment, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

const InfoTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CharacterItem({ character }) {
  const [isPicture, setIsPicture] = useState(false);

  const user = useSelector((store) => store.user.userReducer);
  const starter = useSelector((store) => store.character.starter);

  const dispatch = useDispatch();

  const [openSell, setOpenSell] = useState(false);

  // console.log('character', character);

  const handleSellClose = () => {
    setOpenSell(false);
  };

  const confirmSale = () => {
    setOpenSell(true);
  };

  const setStarterOne = () => {
    if (starter.length === 0) {
      dispatch({
        type: "SAGA_SET_STARTER_ONE",
        payload: character.id,
      });
    } else if (starter.length === 1) {
      if (character.starter_2 === true) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 1,
            otherStarter: 2,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_ONE",
          payload: character.id,
        });
      }
    } else if (starter.length === 2) {
      if (character.id === starter[1].id) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 1,
            otherStarter: 2,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_ONE",
          payload: character.id,
        });
      }
    }
  };

  const setStarterTwo = () => {
    if (starter.length === 0) {
      dispatch({
        type: "SAGA_SET_STARTER_TWO",
        payload: character.id,
      });
    } else if (starter.length === 1) {
      if (character.starter_1 === true) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 2,
            otherStarter: 1,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_TWO",
          payload: character.id,
        });
      }
    } else if (starter.length === 2) {
      if (character.id === starter[0].id) {
        dispatch({
          type: "SAGA_SET_STARTER_CONDITIONALLY",
          payload: {
            characterId: character.id,
            currentStarter: 2,
            otherStarter: 1,
          },
        });
      } else {
        dispatch({
          type: "SAGA_SET_STARTER_TWO",
          payload: character.id,
        });
      }
    }
  };

  const clearStarter = () => {
    dispatch({
      type: "SAGA_CLEAR_STARTER",
      payload: character.id,
    });
  };

  const sellCharacter = () => {
    if (starter.length === 2) {
      if (character.id === starter[0].id || character.id === starter[1].id) {
        setOpen(false);
        return alert("you can't sell your starter");
      } else {
        dispatch({
          type: "SAGA_SELL_CHARACTER",
          payload: {
            characterID: character.id,
          },
        });
      }
    } else if (starter.length === 1) {
      if (character.id === starter[0].id) {
        setOpen(false);
        return alert("you can't sell your starter");
      } else {
        dispatch({
          type: "SAGA_SELL_CHARACTER",
          payload: {
            characterID: character.id,
          },
        });
      }
    } else {
      dispatch({
        type: "SAGA_SELL_CHARACTER",
        payload: {
          characterID: character.id,
        },
      });
    }
    setOpen(false);
  };

  const togglePicture = () => {
    setIsPicture(!isPicture);
  };

  const toggleNewClass = () => {
    dispatch({
      type: "SAGA_SET_OLD",
      payload: character.id,
    });
  };

  const doNothing = () => {};

  const displayText = () => {
    if (isPicture) {
      return (
        <div className="descriptionForCharacterSingle">
          <div className="mainStatText">
            <p className="characterTextTotalHp">{character.hp} hp</p>
            <p className="characterTextStamina">{character.stamina} stamina</p>
            <p className="characterTextSpeed">{character.speed} speed</p>
          </div>

          <div className="attackStatText">
            <p className="characterTextBoxAttack">{character.unique_attack}</p>
            <p className="characterTextHp">{character.unique_damage} damage</p>
            <p className="characterTextStamina">
              {character.unique_stamina} stamina
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="characterPictures">
          <img src={character.profile_pic} />
        </div>
      );
    }
  };


  const [openInfo, setOpenInfo] = useState(false);

  const handleInfoClickOpen = () => {
    setOpenInfo(true);
  };

  const handleInfoClose = () => {
    setOpenInfo(false);
  };



  return (
    <div
      className={character.new ? "new" : "single-box"}
      onMouseOver={character.new ? toggleNewClass : doNothing}
    >
      <div className="starterPTag">
        <p>{character.new ? "new" : character.starter_1 ? "Starter 1" : ""}</p>

        <p>{character.starter_2 ? "Starter 2" : ""}</p>
      </div>

      <h5>{character.name}</h5>

      <ul className="singleBoxUl" onClick={togglePicture}>
        {" "}
        {displayText()}{" "}
      </ul>

      <div className="buttonBox">
        <button id={character.id} onClick={setStarterOne}>
          Set Starter 1
        </button>
        <button id={character.id} onClick={setStarterTwo}>
          Set Starter 2
        </button>
        <button id={character.id} onClick={clearStarter}>
          Remove
        </button>
        <button id={character.id} onClick={confirmSale}>
          Sell
        </button>
      </div>


{/* sell conformation dialog */}
        <Dialog
          open={openSell}
          onClose={handleSellClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            {`Are you sure you want to sell ${character.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
            >
              You will receive 10 coins if you sell {character.name}. You will
              have to buy the new character box to have the chance to get{" "}
              {character.name} back.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: "black",
                fontSize: 20,
                fontFamily: "New Super Mario Font U",
              }}
              onClick={sellCharacter}
              autoFocus
            >
              Sell
            </Button>
            <Button
              sx={{
                color: "black",
                fontSize: 20,
                fontFamily: "New Super Mario Font U",
              }}
              onClick={handleSellClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>


      <Button variant="outlined" onClick={handleInfoClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={openInfo}
        onClose={handleInfoClose}
        TransitionComponent={InfoTransition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleInfoClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {character.name}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleInfoClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          <Box display="flex" flexDirection="row" justifyContent="space-around">
        <img src={character.profile_pic} height={350} width={350} />

        <Box display="flex" flexDirection="column">
        <Divider />
        <ListItemText primary="Hp" secondary={character.hp} />
        <Divider />
        <ListItemText primary="Stamina" secondary={character.stamina} />
        <Divider />
        <ListItemText primary="Speed" secondary={character.speed} />
        <Divider />
        <ListItemText primary="Special Attack" secondary={character.unique_attack} />
        <Divider />
        <ListItemText primary="Special Attack Damage" secondary={character.unique_damage} />
        <Divider />
        <ListItemText primary="Special Attack Cost" secondary={character.unique_stamina} />
        <Divider />
        </Box>

        <Divider />

        </Box>
          {/* <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton> */}
        </List>
      </Dialog>
    </div>
  );
}

export default CharacterItem;

  

      
