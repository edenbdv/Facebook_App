// CommentButton.js
import React from 'react';

const CommentButton = ({ onClick }) => {
  return (
    <button 
      type="button" 
      className="btn btn-outline-secondary" 
      onClick={onClick} 
    >
      <i className="bi bi-chat-dots"></i> Comment
    </button>
  );
};

export default CommentButton;
