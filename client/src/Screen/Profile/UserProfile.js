// UserProfile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import UserFeed from './UserFeed';
import EditProfilePopup from './EditProfilePopup';
import UsersListPopup from '../UsersList'; 
import { useNavigate } from 'react-router-dom';
import FRequestsPopup from './FRequestsPopup';
import '../Menu.css'; 

import { fetchUserData,fetchUserPosts, fetchFriendsList, saveChanges, deleteUserProfile } from '../api';

const UserProfile = ({ token }) => {
    const [userDetails,setUserDetails] = useState(null);
    const [showEditContainer, setShowEditContainer] = useState(false);
    const [showFriendList, setShowFriendList] = useState(false); 
    const [userPosts, setUserPosts] = useState([]);
    const [friendsList, setFriendsList] = useState([]); 
    const [showFriendRequests, setShowFriendRequests] = useState(false); 

    const [storedUserData, setStoredUserData] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    });

    const navigate = useNavigate(); // Initialize navigate

    const fetchUserDetails = async () => {
        if (storedUserData && token) {
            try {
                const userInfo = await fetchUserData(storedUserData.username, token);
                const friends = await fetchFriendsList(storedUserData.username, token);
                setUserDetails(userInfo);
                setFriendsList(friends);
                

                // Update local storage with merged user data
                const updatedUserData = { ...storedUserData, ...userInfo };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                setStoredUserData(updatedUserData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };


    useEffect(() => {
            fetchUserDetails();
    }, [storedUserData.username, token]);



    useEffect(() => {
        if (storedUserData  && token) {
            fetchUserPosts(storedUserData.username, token)
                .then(posts => {
                    setUserPosts(posts);
                })
                .catch(error => console.error('Error fetching user posts:', error));

            fetchFriendsList(storedUserData.username, token)
                .then(friends => setFriendsList(friends))
                .catch(error => console.error('Error fetching friends list:', error));

        }
    }, [storedUserData,token]);



    const openEditContainer = () => {
        setShowEditContainer(true);
    };

    const closeEditContainer = () => {
        setShowEditContainer(false);
    };

    const handleOpenFriendList = () => {
        setShowFriendList(true);
    };

    const handleCloseFriendList = () => {
        setShowFriendList(false);
    };

    const handleOpenFriendRequests = () => setShowFriendRequests(true);
    const handleCloseFriendRequests = () => setShowFriendRequests(false);

    const handleSaveUserData = async (fieldName, fieldValue) => {
        try {
            const response = await saveChanges(storedUserData.username, fieldName, fieldValue, token);
            if (response.success) {
              
                fetchUserDetails(); 
                return true;
            } else {
                console.error("False"); 
                return false;
            }

            // fetchUserDetails();
        } catch (error) {
            console.error('Error saving changes:', error.message);
        }
    };

    const deleteProfile = async () => {
        try {
            await deleteUserProfile(storedUserData.username, token);
            // If the delete request succeeds, navigate back to the feed page
            navigate('/');
        } catch (error) {
            console.error('Error deleting profile:', error.message);
        }
    };

    if (!storedUserData) {
        return <div>Loading...</div>;
    }

    const { displayName, profilePic } = storedUserData;
    const imageUrl = `data:image/jpeg;base64,${profilePic}`;


    return (
        <div className="container mt-4">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            {/* Profile header */}
                <div className="row justify-content-center">
                <div className="col-md-9">
                    <div className="profile-container p-4 shadow rounded">
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src={imageUrl} alt="Profile" className="rounded-circle profile-picture" />
                            </div>
                            <div className="col-md-8">
                                <h1>{displayName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Edit profile button */}
                <div className="col-md-3 ">
                    <ul class="list-group  flex-buttons">
                            <li className="list-group-item">
                                <button className=" btn  text-start w-100 btn-edit" onClick={openEditContainer}>
                                <span className="icon-text">
                                    <i className="bi bi-pencil icon-above"></i>
                                    <span className="menu-text">Edit Profile</span>
                                </span>
                                </button>
                            </li>

                            <li className="list-group-item">
                                <button className=" btn  text-start w-100 btn-edit" onClick={handleOpenFriendList}>
                                <span className="icon-text">
                                    <i className="bi bi-people-fill icon-above"></i>
                                    <span className="menu-text">View Friends</span>
                                </span>
                                </button>
                            </li>

                            <li className="list-group-item">
                                <button className=" btn  text-start w-100 btn-edit" onClick={deleteProfile}>
                                <span className="icon-text">
                                    <i className="bi bi-trash icon-above"></i>
                                    <span className="menu-text">Delete Profile</span>
                                </span>
                                </button>
                            </li>

                            <li className="list-group-item">
                                <button className=" btn  text-start w-100 btn-edit" onClick={handleOpenFriendRequests}>
                                <span className="icon-text">
                                    <i className="bi bi-person-lines-fill icon-above"></i>
                                    <span className="menu-text">Friend Requests</span>
                                </span>
                                </button>
                            </li>
                    </ul>
                </div>
            </div>
            {/* Edit profile popup */}
            {showEditContainer && (
                <EditProfilePopup
                    handleClose={closeEditContainer}
                    handleSave={handleSaveUserData}
                />
            )}
            {/* Friend list popup */}
            {showFriendList && (
                <UsersListPopup
                    token={token}
                    users={friendsList|| []} 
                    header={"Friends"}
                    handleClose={handleCloseFriendList} 
                />
            )}
            {/* Friend requests popup */}
            {showFriendRequests && (
                <FRequestsPopup token = {token}
                                currentUser = {storedUserData.username}
                                friendreqs = {userDetails.friendRequests}
                                handleClose={handleCloseFriendRequests}   
                                onHandleFriendRequest={fetchUserDetails} 

                />
            )}
            {/* User posts */}
            <div className="mt-4">
                <h2>User Posts</h2>
                <UserFeed posts={userPosts || []}  token={token} />
            </div>
        </div>
    );
};

export default UserProfile;
