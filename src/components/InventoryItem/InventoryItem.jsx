import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function InventoryItem({ inventoryItem }) {
  const [isPicture, setIsPicture] = useState(false);

  const user = useSelector((store) => store.user.userReducer);
  const starter = useSelector((store) => store.character.starter);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const sellPot = (potValue) => {
    console.log("potValue", potValue);
    dispatch({
      type: "SAGA_SELL_POTION",
      payload: {
        potionId: inventoryItem.id,
        amountNum: potValue,
      },
    });
    setOpen(false);
  };

  const potValuetext = (value) => {
    return value;
  };

  const [potValue, setPotValue] = useState(0);

  const handlePotChange = (event, newPotValue) => {
    setPotValue(newPotValue);
  };

  const confirmSale = () => {
    setOpen(true);
  };

  const togglePicture = () => {
    setIsPicture(!isPicture);
  };

  const displayText = () => {
    if (isPicture) {
      return (
        <div className="statDescription">
          <p className="statHpText">{inventoryItem.hp} hp</p>
          <p className="statStaminaText">{inventoryItem.stamina} stamina</p>
        </div>
      );
    } else {
      return (
        <div className="potionImg">
          <img src={inventoryItem.pic} />
        </div>
      );
    }
  };

  return (
    <div className={"item_box"}>
      <div className="amountOfItems">
        <p>{inventoryItem.number}X</p>
      </div>

      <h3>{inventoryItem.name}</h3>

      <ul className="singleItemBoxUl" onClick={togglePicture}>
        {" "}
        {displayText()}{" "}
      </ul>

      <div className="slider">
        <Box sx={{ width: 170 }}>
          <Slider
            aria-label="Temperature"
            defaultValue={0}
            value={potValue}
            onChange={handlePotChange}
            getAriaValueText={potValuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={inventoryItem.number}
            disabled={inventoryItem.number === 0 ? true : false}
            sx={{ color: "blue" }}
          />
        </Box>
      </div>

      <button
        className="sellButton"
        onClick={confirmSale}
        disabled={inventoryItem.number === 0 ? true : false}
      >
        Sell
      </button>

      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
          >
            {`Are you sure you want to sell ${potValue} ${inventoryItem.name}s`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontFamily: "New Super Mario Font U", textAlign: "center" }}
            >
              You will receive {potValue * 5} coins if you sell{" "}
              {inventoryItem.name}s.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                color: "black",
              }}
              onClick={() => sellPot(potValue)}
              autoFocus
            >
              Sell
            </Button>
            <Button
              sx={{
                fontFamily: "New Super Mario Font U",
                textAlign: "center",
                color: "black",
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
}

export default InventoryItem;
