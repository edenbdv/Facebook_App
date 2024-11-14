// Navbar.js
import './NavBar.css'; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'bootstrap';


const Navbar = ({ toggleNightMode, nightMode, userProfilePicture }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [userData, setUserData] = useState(null); 

    const navigate = useNavigate();
    const imageUrl = `data:image/jpeg;base64,${userProfilePicture}`;


    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    useEffect(() => {
        // Initialize popover when component mounts
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));

        // Cleanup function
        return () => {
            popoverList.forEach(popover => popover.dispose()); // Dispose popover when component unmounts
        };
    }, []); 

    useEffect(() => {
        // Fetch user data from local storage when component mounts
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/');
    };

    const navigateToProfile = () => {
        if (userData) {

            
            const profileUrl = `/profile/${userData.username}`; // Construct the profile URL with the username parameter
            navigate(profileUrl);
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg sticky-top ${nightMode ? 'night-mode' : ''}`}>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* Wrapper div for search bar and logo */}
                <div className="d-flex align-items-center">
                    <a className="navbar-brand" href="#">
                        <img src="/logo2.svg" alt="Logo" height="55" />
                    </a>

                    <form className="d-none d-md-flex">
                        {/* Search input */}
                        <input
                            className="serach form-control me-2"
                            type="search"
                            placeholder="Search in FooBar"
                            aria-label="Search" />
                    </form>
                </div>
                {/* Wrapper div for profile picture and toggle button */}
                <div className="d-flex align-items-center">
                    {/* Profile Picture Button */}
                    {userData && (
                        <button
                            type="button"
                            className="btn btn-secondary-outline"
                            onClick={navigateToProfile}
                        >
                            <img
                                src={imageUrl}
                                alt="Profile Image"
                                className="rounded-circle profile-image"
                            />
                        </button>
                    )}
                    
                    {/* Toggle button */}
                    <button
                        type="button"
                        className="btn btn-secondary-outline"
                        onClick={toggleNightMode} // Toggle night mode class on body
                    >
                        {nightMode ? (
                        <i className="bi bi-sun text-white"></i> // Icon is white in night mode
                    ) : (
                        <i className="bi bi-moon text-dark"></i> // Icon is black in light mode
                    )}
                    </button>

                    {/* Logout button */}
                    <button
                        type="button"
                        className={`btn btn-secondary-outline btn-logout`}
                        onClick={handleLogout} 
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
