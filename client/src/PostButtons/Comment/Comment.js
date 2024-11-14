// Comment.js
import React, { useState, useEffect} from 'react';
import './Comment.css'
import { fetchUserData, deleteComment, updateComment} from '../../Screen/api';
import { addPrefixIfNeeded, formatDate } from '../../utils';


const Comment = ({ postId, comment, token, updateComments }) => {
    const [userData, setUserData] = useState(null);    
    const [editedCommentId, setEditedCommentId] = useState(null);
    const [editedText, setEditedText] = useState('');
    
    const [storedUserData, setStoredUserData] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    });



    // Function to delete comment
    const handleDeleteComment = async (commentId) => {
        const response = await deleteComment(postId, commentId, token);
        if (response.status === 200) { 
            await updateComments(); 
        } else {
            console.error("Error deleting comment");
        }   
    };

    // Function to initiate editing
    const handleEditComment = (commentId, text) => {
        setEditedCommentId(commentId);
        setEditedText(text);
    };
  
    // Function to cancel editing
    const handleCancelEdit = () => {
        setEditedCommentId(null);
        setEditedText('');
    };

    // Function to save edited comment
    const handleSaveEdit = async (commentId) => {
        const response = await updateComment(postId, commentId, editedText, token);
        if (response.status === 200) {
            await updateComments();
            handleCancelEdit();
        } else {
            console.error("Error saving comment");
        }
    };


    useEffect(() => {
        const fetchCommentUserData  = async () => {
            try {
                const data = await fetchUserData(comment.createdBy, token);
               
                if (data) {
                    setUserData(data);
          
                } else {
                  console.error('Error fetching user details:');
                  return comment;
                }
              } catch (error) {
                console.error('Error fetching user details:', error.message);
                return comment;
              }
        };
      
        fetchCommentUserData();
      }, [comment, token]);
    
 
    return (
    
        <div className="comments-container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            {comment ? (
                <div className='mt-3'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>   
                        <div>          
                        {userData && userData.profilePic && (
                                <img src={addPrefixIfNeeded(userData.profilePic)} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                            )}
                        </div>
                        
                        <div className='comment-content'>
                            {/*dispaly name*/}
                            {userData && userData.displayName && ( 
                            <span className="display-name" style={{ marginRight: '10px' }}>{userData.displayName}</span>
                                )}  

                                   {/*edit and delete buttons - only for comment owner */}
                                   { storedUserData && storedUserData.username === comment.createdBy && (
                                <>
                                    <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleEditComment(comment.commentId, comment.text)}>
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleDeleteComment(comment.commentId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </>
                            )}

                              {/* Conditionally render input field only if editing */}
                              {editedCommentId === comment.commentId ? (
                                 <div>
                                    <textarea
                                        className="form-control"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    ></textarea>
                                    <button type="button" className="btn btn-secondary btn-sm mt-2" onClick={() => handleSaveEdit(comment.commentId)}>Save</button>
                                    <button type="button" className="btn btn-secondary btn-sm mt-2 ml-2" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            ) : (
                                <p style={{ margin: '0', marginRight: '10px' }}>{comment.text}</p>
                            )}


                       </div> 
                        
                    </div>
                    <p style={{ margin: '0', color: 'gray', fontSize:'12px' }}>{formatDate(comment.createdAt)}</p>

                </div> 

            ) : (
                <div>No comment available.</div> 
            )}
        </div>
    );
};

export default Comment;


    {/* Render existing comments */}
            {/* {comments.map(comment => (
                <div key={comment.id} className="comment-container">
                    <div className="comment-content"> */}
                        {/* Conditionally render input field if comment is being edited */}
                        {/* {editedCommentId === comment.id ? (
                            <form className="row g-3">
                                <div className="col-auto">
                                    <textarea
                                        className="form-control custom-textarea"
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-primary" onClick={() => handleSaveEdit(comment.id)}>Save</button>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <p>{comment.text}</p>
                        )} */}
                    {/* </div>
                    <div className="comment-actions"> */}
                        {/* Add delete and edit functionality */}
                        {/* <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleDeleteComment(comment.id)}>
                            <i className="bi bi-trash"></i>
                        </button> */}
                        {/* Render edit button only if not currently editing any comment */}
                        {/* {comment.id !== editedComment.id && (
                            <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleEditComment(comment.id, comment.text)}>
                                <i className="bi bi-pencil"></i>
                            </button>
                        )}
                    </div>
                </div>
            ))} */}