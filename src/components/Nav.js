import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {

    const { user } = useContext(UserContext);
    return (
    <div className="Nav">
        <NavLink to="/" exact> Home </NavLink>
        {user &&
            <NavLink to="/create" exact> Create </NavLink>
        }
        {!user &&
            <React.Fragment>
                <NavLink to="/login" exact> Login </NavLink>
                <NavLink to="/signup" exact> SignUp </NavLink>
            </React.Fragment>
        }    
    </div>
    )
}
