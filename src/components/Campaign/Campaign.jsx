import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton/BackButton';

function Campaign() {

    const user = useSelector((store) => store.user);

    return (
        <div className="campaign">

            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>

            <BackButton />
        </div>
    );
}

export default Campaign;