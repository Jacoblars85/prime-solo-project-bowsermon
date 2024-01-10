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

  const user = useSelector(store => store.user.userReducer);
  const starter = useSelector(store => store.character.starter);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };

  const setStarterOne = () => {

    if (character.id === starter[1].id) {
      alert("can't do that")
    } else {
      dispatch({
        type: 'SAGA_SET_STARTER_ONE',
        payload: character.id
      });
    }
  }

  const setStarterTwo = () => {

    if (character.id === starter[0].id) {
      alert("can't do that")
    } else {
      dispatch({
        type: 'SAGA_SET_STARTER_TWO',
        payload: character.id
      });
    }
    
  }

  const sellCharacter = () => {
    if (character.id === starter[0].id || character.id === starter[1].id) {
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

  const toggleNewClass = () => {
    console.log(character.id);
    
    dispatch({
      type: 'SAGA_SET_OLD',
      payload: character.id
    });
  }

  const doNothing = () => {
   
  }

  const displayText = () => {
    if (isPicture) {
      return (
        <div className='description'>

          <p>{character.hp} hp</p>
          <p>{character.stamina} stamina</p>
          <p>{character.unique_attack} attack</p>
          <p>{character.unique_damage} damage</p>
          <p>{character.unique_stamina} stamina cost</p>


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
    <div className={character.new ? "new" : "single-box"} onMouseOver={character.new ? toggleNewClass : doNothing }>

      <h5>{character.name}</h5>

      <ul className='singleBoxUl' onClick={togglePicture}> {displayText()} </ul>

      <button id={character.id} onClick={setStarterOne} >Set Starter 1</button>
      <button id={character.id} onClick={setStarterTwo} >Set Starter 2</button>
      <button id={character.id} onClick={confirmSale} >Sell</button>

      <p>{character.new ? "new" : ""}</p>

      <p>{character.starter_1 ? "Starter 1" : ""}</p>

      <p>{character.starter_2 ? "Starter 2" : ""}</p>
    


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
            Yes
          </Button>
          <Button onClick={handleClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
    </Fragment>

    </div>
  )
}

export default CharacterItem;