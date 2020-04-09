import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { json, User, SetUser } from '../../utils/api';


const Navbar: React.FC<IAppProps> = props => {

    const [loginString, setLoginString] = useState<string>('');
    const [addButton, setAddButton] = useState<JSX.Element>(null);
    const [logoutButton, setLogoutButton] = useState<JSX.Element>(null);
    const [currentUserId, setCurrentUserId] = useState<string>(null);
    const [currentUserRole, setCurrentUserRole] = useState<string>(null);
    



    const getLoginStatus = async () => {

        let id = localStorage.getItem('userid');
        let role = localStorage.getItem('role');

        setCurrentUserId(id);
        setCurrentUserRole(role);


        if (currentUserId) {
            let user = await json(`/api/users/${currentUserId}`);
            setLoginString(`${user[0].firstname} ${user[0].lastname}`);
            if (currentUserRole === 'admin') {
                let button1 = <Link to='/newpost' className="btn btn-outline-info nav-link p-2">Add Blog</Link>;
                setAddButton(button1);
            }

            let button2 = <button className="btn btn-outline-danger nav-link p-2" onClick={() => handleLogout()}>Log Out</button>
            setLogoutButton(button2);

        } else {
            setLoginString('Log In');
            setAddButton(null);
            setLogoutButton(null);
        }
    };


    useEffect(() => {
        getLoginStatus();
    }, [currentUserId]);

    const handleLogout = async () => {
        SetUser();
        localStorage.clear();
        setCurrentUserId(null);
        setCurrentUserRole(null);
    }

    return (


        <nav className="navbar navbar-light bg-light border-bottom">
            <span className="navbar-brand mb-0">Regan's Blog</span>
            <ul className="navbar-nav flex-row">
                <li className="nav-item mx-1">
                    {addButton}
                </li>
                <li className="nav-item mx-1">
                    <Link to='/' className="btn btn-outline-secondary nav-link p-2">All Blogs</Link>
                </li>
                <li className="nav-item mx-1">
                    <Link to='/login' className="nav-link">{loginString}</Link>
                </li>
                <li className="nav-item mx-1">
                    {logoutButton}
                </li>
            </ul>
        </nav>


    );
}
interface IAppProps { }

export default Navbar;


