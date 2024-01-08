import { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function InventoryItem({ inventoryItem }) {
  const [isPicture, setIsPicture] = useState(false)

  const user = useSelector(store => store.user.userReducer);
  const starter = useSelector(store => store.character.starter);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };


  const sellCharacter = () => {
    dispatch({
      type: 'SAGA_SELL_CHARACTER',
      payload: {
        characterID: inventoryItem.id
      }
    })
    setOpen(false);
  }

  const confirmSale = () => {
    setOpen(true);

  }

  const togglePicture = () => {
    setIsPicture(!isPicture)
  }

  const toggleNewClass = () => {
    console.log(inventoryItem.id);
    
    dispatch({
      type: 'SAGA_SET_OLD',
      payload: inventoryItem.id
    });
  }

  const doNothing = () => {
   
  }

  const displayText = () => {
    if (isPicture) {
      return (
        <div className='description'>

          <p>{inventoryItem.hp} hp</p>
          <p>{inventoryItem.stamina} stamina</p>

        </div>
      )
    } else {
      return (
        <div>
          <img height={100} width={100} src={inventoryItem.pic} />
        </div>
      )
    }
  }

  const valuetext = (value) => {
    return `${value}°C`;
  }

  return (
    <div className={inventoryItem.new ? "new_item" : "item_box"} onMouseOver={inventoryItem.new ? toggleNewClass : doNothing }>

      <h5>{inventoryItem.name}</h5>

      <ul className='singleBoxUl' onClick={togglePicture}> {displayText()} </ul>

      <p>amount: {inventoryItem.number}</p>

      <Box sx={{ width: 170 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={inventoryItem.number}
        disabled={inventoryItem.number === 0 ? true : false}
      />
    </Box>

      <button id={inventoryItem.id} onClick={confirmSale} >Sell</button>

      {/* <p>{inventoryItem.new ? "new" : ""}</p> */}
    


<Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to sell ${inventoryItem.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will receive 5 coins if you sell {inventoryItem.name}. You will have to buy the another {inventoryItem.name}, to have this in the battle.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={sellCharacter} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
    </Fragment>

    </div>
  )
}

export default InventoryItem;

