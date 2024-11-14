import React, { useEffect, useState } from 'react';
import { fetchUserData, sendFriendRequest } from '../api'; 

const NonFriendProfile = ({ visitedUser, token }) => {
    const [userData, setUserData] = useState(null);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);

    useEffect(() => {
        // Fetch user data when the component mounts
        fetchUserData(visitedUser, token)
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching non friend data:', error));
    }, [visitedUser, token]);

    // Function to handle sending a friend request
    const handleSendFriendRequest = async () => {
        try {
            const response = await sendFriendRequest(visitedUser, token);
            
            if (response.success) {
                setSuccessAlertVisible(true);
            } else {
                console.error('Error sending friend request:', response.error);
                setErrorAlertVisible(true);
            }
        } catch (error) {
            console.error('Error sending friend request:', error.message);
            setErrorAlertVisible(true);
        }
    };

    if (!userData) {
        return <div>Loading...</div>; // Render a loading indicator while user data is being fetched
    }

    const { displayName, profilePic } = userData;
    const imageUrl = `data:image/jpeg;base64,${profilePic}`;


    return (
        <div className="container mt-4">
            {/* Profile header */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="profile-container p-4 shadow rounded">
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src={imageUrl} alt="Profile" className="rounded-circle profile-picture" />
                            </div>
                            <div className="col-md-8 ">
                                <h1>{displayName}</h1>
                                {/* Button to send friend request */}
                                <button className="btn btn-primary" onClick={handleSendFriendRequest}>Add Friend</button>
                                {/* Success alert */}
                                {successAlertVisible && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        Friend request sent successfully
                                    </div>
                                )}
                                {/* Error alert */}
                                {errorAlertVisible && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        Already has a pending friend request
                                    </div>
                                )}
                            </div>
                        </div>
                        </div>
                       {/* Message to indicate that only friends can see posts */}
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>
                        <div className="text-center">
                            <p className="text-muted">
                                Only friends can see this user's posts.
                            </p>
                            <i className="bi bi-people-fill fs-1"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NonFriendProfile;
