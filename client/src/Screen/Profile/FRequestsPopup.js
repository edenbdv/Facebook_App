import React, { useState, useEffect } from 'react';
import { acceptFriendRequest, deleteFriendRequest } from '../Request_api';
import {fetchUserData} from '../api'
import { Link } from 'react-router-dom'; 



const FRequestsPopup = ({ token, currentUser, friendreqs, handleClose, onHandleFriendRequest }) => {
    const [friendReqDetails, setfriendReqDetails] = useState([]);

    useEffect(() => {
        const fetchFriendReqsDetails = async () => {
            const details = await Promise.all(
                friendreqs.map(async (friendReq) => {
                    try {
                        const friendInfo = await fetchUserData(friendReq, token);
                        return friendInfo; 
                    } catch (error) {
                        console.error('Error fetching friendReq data:', error);
                        return { profilePic: '', displayName: 'Unknown', id: friendReq };
                    }
                })
            );
            setfriendReqDetails(details);
        };
    
        fetchFriendReqsDetails();
    }, [friendreqs, token]); 



    const handleAcceptRequest = async (friendId) => {
        try {
            await acceptFriendRequest(currentUser, friendId, token);
            onHandleFriendRequest();
        } catch (error) {
            console.error('Error accepting friend request:', error.message);
            // Handle error display or logging here
        }
    };

    const handleDeleteRequest = async (friendId) => {
        try {
            await deleteFriendRequest(currentUser, friendId, token);
            onHandleFriendRequest();

        } catch (error) {
            console.error('Error deleting friend request:', error.message);
            // Handle error display or logging here
        }
    };

   

    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    <div className="popup-inner">
                        <h2>Friend Requests</h2>
                        {friendReqDetails.length > 0 ? (
                            <ul>
                                {friendReqDetails.map((request) => {

                                        return (
                                        <li key={request.username}>
                                            <div className="friend-item">
                                            <Link
                                                to={`/profile/${request.username}`}
                                                className="author-link"
                                            >
                                            <img
                                                src={`data:image/jpeg;base64,${request.profilePic}`} 
                                                alt="Profile"
                                                className="rounded-circle profile-image"
                                                />
                                                <span className="display-name fw-bold ">{request.displayName}</span>
                                            </Link>

                                                <button onClick={() => handleAcceptRequest(request.username)}>Accept</button>
                                                <button onClick={() => handleDeleteRequest(request.username)}>Delete</button>
                                            </div>
                                           
                                        </li>
                                     ) })}
                            </ul>
                        ) : (
                            <p>No friend requests</p>
                        )}
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FRequestsPopup;
