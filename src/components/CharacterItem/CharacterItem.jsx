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

    // if (character.id === starter[1].id) {
    //   alert("can't do that")
    // } else {
      dispatch({
        type: 'SAGA_SET_STARTER_ONE',
        payload: character.id
      });
    // }
  }

  const setStarterTwo = () => {

    // if (character.id === starter[0].id) {
    //   alert("can't do that")
    // } else {
      dispatch({
        type: 'SAGA_SET_STARTER_TWO',
        payload: character.id
      });
    // }

  }

  const clearStarter = () => {

      dispatch({
        type: 'SAGA_CLEAR_STARTER',
        payload: character.id
      });
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
        <div className='descriptionForCharacterSingle'>

          <div className='mainStatText'>

            <p className='characterTextTotalHp'>{character.hp} hp</p>
            <p className='characterTextStamina'>{character.stamina} stamina</p>
            <p className='characterTextSpeed'>{character.speed} speed</p>

          </div>

          <div className='attackStatText'>
            <p className='characterTextBoxAttack'>{character.unique_attack}</p>
            <p className='characterTextHp'>{character.unique_damage} damage</p>
            <p className='characterTextStamina'>{character.unique_stamina} stamina</p>
          </div>

        </div>
      )
    } else {
      return (
        <div className='characterPictures'>
          <img src={character.profile_pic} />
        </div>
      )
    }
  }

  return (
    <div className={character.new ? "new" : "single-box"} onMouseOver={character.new ? toggleNewClass : doNothing}>

      <div className='starterPTag'>

        <p>{character.new ? "new" : character.starter_1 ? "Starter 1" : ""}</p>

        <p>{character.starter_2 ? "Starter 2" : ""}</p>

      </div>

      <h5>{character.name}</h5>

      <ul className='singleBoxUl' onClick={togglePicture}> {displayText()} </ul>

      <div className='buttonBox'>

        <button id={character.id} onClick={setStarterOne} >Set Starter 1</button>
        <button id={character.id} onClick={setStarterTwo} >Set Starter 2</button>
        <button id={character.id} onClick={clearStarter} >Remove</button>
        <button id={character.id} onClick={confirmSale} >Sell</button>

      </div>


      {/* <p>{character.new ? "new" : ""}</p> */}





      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'New Super Mario Font U', textAlign: 'center' }}>
            {`Are you sure you want to sell ${character.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ fontFamily: 'New Super Mario Font U', textAlign: 'center' }}>
              You will receive 10 coins if you sell {character.name}. You will have to buy the new character box to have the chance to get {character.name} back.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: 'black', fontSize: 20, fontFamily: 'New Super Mario Font U' }} onClick={sellCharacter} autoFocus>
              Sell
            </Button>
            <Button sx={{ color: 'black', fontSize: 20, fontFamily: 'New Super Mario Font U' }} onClick={handleClose}>Close</Button>

          </DialogActions>
        </Dialog>
      </Fragment>

    </div>
  )
}

export default CharacterItem;