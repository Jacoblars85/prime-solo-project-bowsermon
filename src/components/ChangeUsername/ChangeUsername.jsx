import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ChangeUsername(props) {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);


  const changeUsername = () => {
        
    dispatch({
        type: 'SAGA_CHANGE_USERNAME',
        payload: user.id
    })
   
};

  return (
    <p onClick={changeUsername}>Change Username</p>
  );
}

export default ChangeUsername;