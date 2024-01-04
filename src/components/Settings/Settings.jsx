import LogOutButton from '../LogOutButton/LogOutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import ChangeUsername from '../ChangeUsername/ChangeUsername';
import HomeIcon from '@mui/icons-material/Home';
import HomeButton from '../HomeButton/HomeButton';
import { useHistory } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function Settings() {

  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDeleteClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    history.push(`/login`)

    dispatch({
      type: 'SAGA_DELETE_ACCOUNT',
    })
  };



  const [formOpen, setFormOpen] = useState(false);

  const handleFormClickOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const changeUsername = (e) => {
    e.preventDefault()
    dispatch({
        type: 'SAGA_CHANGE_USERNAME',
        payload: {
            newName: newUsername
        }
    })
    history.push(`/home`)
};





  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const user = useSelector((store) => store.user);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[`${user.username}`, `${user.coins}`].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <PersonIcon /> : <img height={25} width={25} src='/images/Coin_-_New_Super_Mario_Bros.webp' />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {[<HomeButton />].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <HomeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {[<p onClick={handleFormClickOpen}>Change Username</p>, <p onClick={handleDeleteClickOpen}>Delete Account</p>].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <ManageAccountsIcon /> : <DeleteForeverIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {[<LogOutButton />].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><SettingsIcon /> </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}

      {/* delete diolog */}
      <Fragment>
        <Dialog
          open={open}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete your account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting your account cannot be undone. Once deleted, it will be gone for good. Thank You For Playing!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteAccount} autoFocus>
              Delete
            </Button>
            <Button onClick={handleDeleteClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Fragment>


      {/* change user name diolog */}
      <Fragment>
        <Dialog open={formOpen} onClose={handleFormClose}>
          <DialogTitle>Change Username</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={newUsername}
              label="Username"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => changeUsername(e.target.value)}>Submit</Button>
            <Button onClick={handleFormClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Fragment>



    </div>
  );
}




