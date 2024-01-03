import { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function CharacterItem({ character }) {
  const [isPicture, setIsPicture] = useState(false)

  const user = useSelector(store => store.user);
  const starter = useSelector(store => store.character.starter);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };

  const setStarter = () => {
    dispatch({
      type: 'SAGA_SET_STARTER',
      payload: character.id
    });
  }


  const sellCharacter = () => {
    if (character.id === starter[0].id) {
      setOpen(false);
      return alert("you can't sell your starter")
    }
    dispatch({
      type: 'SAGA_SELL_CHARACTER',
      payload: {
        characterID: character.id
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

  const displayText = () => {
    if (isPicture) {
      return (
        <div className='description'>

          <p>{character.hp} hp</p>
          <p>{character.unique_attack} attack</p>
          <p>{character.unique_damage} damage</p>

        </div>
      )
    } else {
      return (
        <div>
          <img height={100} width={100} src={character.profile_pic} />
        </div>
      )
    }
  }

  return (
    <div className="single-box">

      <h5>{character.name}</h5>

      <ul className='singleBoxUl' onClick={togglePicture}> {displayText()} </ul>


      <button id={character.id} onClick={setStarter} >Start</button>
      <button id={character.id} onClick={confirmSale} >Sell</button>
    


<Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to sell ${character.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will receive 10 coins if you sell {character.name}. You will have to buy the new character box to have the chance to get {character.name} back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={sellCharacter} autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose}>Disagree</Button>
          
        </DialogActions>
      </Dialog>
    </Fragment>

    </div>
  )
}

export default CharacterItem;