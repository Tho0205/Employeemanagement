import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css'; // style riêng nếu bạn muốn

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-title">Employee Management</div>
            <ul className="navbar-menu">
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/">Employees</Link>
                </li>
                <li className={location.pathname === '/skills' ? 'active' : ''}>
                    <Link to="/skills">Skills</Link>
                </li>
                <li className={location.pathname === '/skill-stats' ? 'active' : ''}>
                    <Link to="/skill-stats">Statistics</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
