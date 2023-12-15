import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';

function Shop() {

    const user = useSelector((store) => store.user);

    return (
        <div className="shop">



            <BackButton />
        </div>
    );
}

export default Shop;