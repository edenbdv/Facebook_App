import React ,{ useEffect, useState }  from 'react';
import {fetchUserData} from './api'
import { Link } from 'react-router-dom'; 

const UsersListPopup = ({ token, users, header ,handleClose }) => {

    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const details = await Promise.all(
                users.map(async (user) => {
                    try {
                        const userInfo = await fetchUserData(user, token);
                        return userInfo; 
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        return { profilePic: '', displayName: 'Unknown', id: user };
                    }
                })
            );
            setUserDetails(details);
        };
    
        fetchUserDetails();
    }, [users, token]); // The effect runs when 'users' or 'token' changes


    // Check if friends is null or undefined
    if (users === null || users.length === 0) {
        return (
            <div className="popup-container">
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClose}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                        <div>No friends to show</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!Array.isArray(users)) {
        return null; 
    }


    // Render the list of users
    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <h2>{header}</h2>

                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    {userDetails.map((user, index) => (
                        <div className="friend-item mb-3" key={index}>
                
                            <Link
                                to={`/profile/${user.username}`}
                                className="author-link"
                            >
                               <img
                                src={`data:image/jpeg;base64,${user.profilePic}`} 
                                alt="Profile"
                                className="rounded-circle profile-image"
                                />
                                <span className="display-name fw-bold">{user.displayName}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersListPopup;
