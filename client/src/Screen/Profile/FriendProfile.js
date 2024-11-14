// FriendProfile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import Feed from '../Feed/Feed';
import UsersListPopup from '../UsersList'; 
import { useNavigate } from 'react-router-dom';
import { fetchUserData, fetchUserPosts, fetchFriendsList } from '../api';

const FriendProfile = ({ visitedUser, token }) => {
    const [friendPosts, setFriendPosts] = useState([]);
    const [showFriendList, setShowFriendList] = useState(false); 
    const [friendsList, setFriendsList] = useState([]); 
    const [userDetails,setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const handleOpenFriendList = () => {
        setShowFriendList(true);
    };

    const handleCloseFriendList = () => {
        setShowFriendList(false);
    };


    const fetchUserDetails = async () => {
        if (visitedUser && token) {
            try {
                const userInfo = await fetchUserData(visitedUser, token);
                const friends = await fetchFriendsList(visitedUser, token);
                setFriendsList(friends);
                setUserDetails(userInfo);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [token, visitedUser]);



    useEffect(() => {
        // Fetch friend's posts when the component mounts
        fetchUserPosts(visitedUser, token)
            .then(posts => setFriendPosts(posts))
            .catch(error => console.error('Error fetching friend posts:', error));
    
        fetchFriendsList(visitedUser, token);

    }, [visitedUser, token]);

    if (loading) {
        return <div>Loading...???</div>;

    }

    if (error) {
        return <div>{error}</div>;  
    }

    const displayName = userDetails.displayName
    const imageUrl = `data:image/jpeg;base64,${userDetails.profilePic}`;



    return (
        <div className="container mt-4">
            {/* Friend profile header */}
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
                <div className="col-md-3">
                    <div className=" list-group ">
                        <li className="list-group-item">
                                <button className=" btn  text-start w-100 btn-edit" onClick={handleOpenFriendList}>
                                    <i className="bi bi-people-fill"></i> 
                                    <span className="menu-text">View Friends</span>
                                </button>
                        </li>

                    </div>
                </div>
            </div>
            {/* Friend list popup */}
            {showFriendList && (
                <UsersListPopup
                    token={token}
                    users={friendsList || []} 
                    header={"Friends"}

                    handleClose={handleCloseFriendList}
                />
            )}
            {/* Friend posts */}
            <div className="mt-4 col-12 col-md-9 d-flex flex-column">
                <h2>Friend Posts</h2>
                {/* Check if userPosts is not null before passing it to Feed */}
                <Feed posts={friendPosts || []} onDeletePost={null} onEditPost={null} token={token}/>
            </div>
        </div>
    );
};

export default FriendProfile;
