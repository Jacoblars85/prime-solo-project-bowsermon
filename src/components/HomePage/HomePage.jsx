import React from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory()
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'SAGA_FETCH_CHARACTERS' });
  }, []);

  const goToNextPage = (params) => {

    history.push(`/${params}`)
};

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>


      <button onClick={() => goToNextPage('characters')}>Characters</button>
      <button onClick={() => goToNextPage('shop')}>Shop(closed)</button>
      <button onClick={() => goToNextPage('battle')}>Campaign</button>
    </div>
  );
}

export default HomePage;
