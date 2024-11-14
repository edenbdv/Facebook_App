// CommentPopup.js
import React, {useEffect, useState } from 'react';
import './CommentPopUp.css'
import Comment from './Comment';
import { fetchCommentsList, createComment } from '../../Screen/api';

const CommentPopup = ({ postId, token, onClose }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]); 

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            await createComment(postId, newComment, token);
            setNewComment('');
            updateComments(); // Refresh comments list after adding a new one
        }
    };

    const updateComments = async () => {
        const updatedComments = await fetchCommentsList(postId, token); 
        setComments(updatedComments);
    };


    useEffect(() => {
             updateComments(); // Fetch comments when the component mounts or postId changes
        }, [postId, token]); 



    return (
        <div className="popup-container">
            <div className="popup">
                <div className="popup-content">
                    <span className="close-btn" onClick={onClose}>&times;</span>
                    <h2>Comments</h2>
                    <div className="comment-container">
                         {comments.map(comment => (
                            <Comment  key={comment._id} postId ={postId} comment={comment} token={token} updateComments={updateComments} /> // Pass each comment to the Comment component
                        ))}

                    </div>
                    <div className="comment-form">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                        ></textarea>
                        <button className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentPopup;
