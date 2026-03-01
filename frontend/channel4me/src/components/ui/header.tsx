// components/Layout/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/header.css';

const Header = () => {
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Features', path: '/features' },
        { label: 'Doctors', path: '/doctors' },
        { label: 'Specialties', path: '/specialties' },
        { label: 'About', path: '/about' }
    ];

    return (
        <header className="header">
            <div className="container">
                <nav className="navbar">
                    <div className="logo">
                        <img src="/logo.png" alt="Channel4Me Logo" />
                    </div>
                    
                    <ul className="nav-menu">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <NavLink 
                                    to={item.path} 
                                    className={({ isActive }) => 
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="nav-buttons">
                        <Link to="/login" className="btn btn-login">Log In</Link>
                        <Link to="/register" className="btn btn-primary">Sign Up Free</Link>
                    </div>
                    
                    <div className="mobile-menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;