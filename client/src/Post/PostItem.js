import './PostItem.css'; 
import LikeButton from '../PostButtons/LikeButton';
import ShareButton from '../PostButtons/ShareButton';
import CommentButton from '../PostButtons/Comment/CommentButton';
import CommentPopUp from '../PostButtons/Comment/CommentPopUp';
import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import EditPost from './Edit/EditPost';
import EditPostForm from './Edit/EditPostForm'; 
import DeletePost from './Delete/DeletePost';
import { formatDate } from  '../utils';
import { getLikes ,likePost, unlikePost } from '../Screen/api';
import UsersListPopup from  '../Screen/UsersList';

function PostItem({ _id, text, picture, authorP, authorN, isoDate, username, onDelete, onEditPost, token }) {
    const [editing, setEditing] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const currentUser = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : null;
    const [likeLst, setLikeLst] = useState(null);  
    const [likeCount, setLikeCount] = useState(0);  
    const [showLikesPopup, setShowLikesPopup] = useState(false); 


       // Fetch the like count when the component mounts
       useEffect(() => {
        const fetchLikes = async () => {
            const likes = await getLikes(_id, token);
            if (likes) setLikeCount(likes.length);  // Set like count to the length of the likes array
            setLiked(likes.includes(currentUser));  // Check if the current user has liked the post
            setLikeLst(likes); 

        };

        fetchLikes();
    }, [_id, token, currentUser]);


    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
    };

    const handleSaveEdit = (editedText) => {
        onSaveText(editedText);
        setEditing(false);
    };

    const onSaveText = (editedText) => {
        onEditPost('text', editedText);
    };


    const toggleComments = () => {
        setShowComments(!showComments);
    };


    const handleLikeClick = async () => {
        if (liked) {
            const likes = await unlikePost(_id, token);
            if (likes) {
                setLiked(false);
                setLikeCount((prevCount) => Math.max(prevCount - 1, 0));
                setLikeLst(likes); 
            }
        } else {
            const likes = await likePost(_id, token);

            if (likes) {
                setLiked(true);
                setLikeCount((prevCount) => prevCount + 1);
                setLikeLst(likes); 
            }
        }    };

    const handleDeleteClick = () => {
        onDelete(_id); 
    };

    const toggleLikesPopup = () => {
        setShowLikesPopup(!showLikesPopup);
    };

    return (
<div className=" card-container">
        <div className="card mb-3" >
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-center">
                    <Link
                        to={{
                            pathname: `/profile/${username}`,
                            state: { onDelete, onEditPost }
                        }}
                        className="author-link"
                    >
                        <img src={authorP} className="rounded-circle me-2" alt="Author" style={{ width: '40px', height: '40px' }} />
                        <span className="author-name">{authorN}</span>
                    </Link>
                      
                    </div>
                    <div className="d-flex align-items-between">
                        {/* Edit and Delete buttons */}
                        {currentUser === username && (
                            <div className="d-flex align-items-between">
                                {editing ? (
                                    <EditPostForm
                                        initialText={text}
                                        onSave={handleSaveEdit}
                                        onCancel={handleCancelEdit}
                                        onEditPost={onEditPost} 
                                    />
                                ) : (

                                    <EditPost onClick={handleEditClick} />
                                )}
                                <DeletePost onDeletePost={DeletePost} onClick={handleDeleteClick} />
                            </div>
                        )}
                        <div className="card-date  mt-2 ml-2" >
                                {formatDate(isoDate)}
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <p className="card-text">{text}</p>
                </div>
                {picture && (
                    <div className="post-image-container">
                        <img src={picture} className="post-image" alt="Post" />
                    </div>
                )}

                {likeCount > 0 && (
                    <span className="d-flex align-items-center ms-2 mt-2 text-primary" onClick={toggleLikesPopup} style={{ cursor: 'pointer' }}>
                    <i className="bi bi-hand-thumbs-up me-1"></i> {/* Thumbs-up icon with some margin */}
                    {likeCount} {/* Display like count */}

                </span>)}


                <div className="card-footer d-flex justify-content-between align-items-center">
                    
                <div className="col-4 d-flex justify-content-center">
                    <LikeButton 
                        liked={liked} 
                        handleLikeClick={handleLikeClick} />
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <CommentButton onClick={toggleComments} />
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <ShareButton />
                </div>
                </div>
            </div>
            {showComments && <CommentPopUp
                   postId = { _id}
                   token = {token}
                onClose={() => setShowComments(false)}
            />}

            {showLikesPopup && (
                <UsersListPopup
                    token={token}
                    users = {likeLst}
                    header={"Likes"}
                    handleClose={() => setShowLikesPopup(false)}
                />
              )}
        </div>
    );
}


export default PostItem;