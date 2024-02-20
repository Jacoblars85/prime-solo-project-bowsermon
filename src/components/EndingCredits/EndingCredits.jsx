import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import video from './Bowsermon-ending-credits.mp4'


function EndingCredits() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>

<video autoPlay >
  <source src={video} type="video/mp4" />
</video>

    </div>
  );
}

export default EndingCredits;
