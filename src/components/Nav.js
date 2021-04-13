import React from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
    return (
    <div className="Nav">
        <NavLink to="/" exact> Home </NavLink>
        <NavLink to="/create" exact> Create </NavLink>
    </div>
    )
}
