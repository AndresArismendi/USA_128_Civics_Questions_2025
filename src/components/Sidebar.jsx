import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-menu">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
                    end
                >
                    <div className="icon-container">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="label">Home</span>
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
                >
                    <div className="icon-container">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="8" r="1" fill="currentColor" />
                        </svg>
                    </div>
                    <span className="label">About</span>
                </NavLink>

                <NavLink
                    to="/privacy"
                    className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
                >
                    <div className="icon-container">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="label">Privacy</span>
                </NavLink>
            </div>
            <ThemeToggle />
        </nav>
    );
};

export default Sidebar;
