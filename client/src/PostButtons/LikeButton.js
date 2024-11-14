import React from 'react';
import './ButtonStyle.css'; 

function LikeButton({ liked, handleLikeClick }) {
    return (
        <button type="button" className={`btn btn-outline-secondary ${liked ? 'text-primary' : ''}`} onClick={handleLikeClick}>
            <i className={`bi bi-hand-thumbs-up${liked ? '-fill' : ''}`}></i> Like
        </button>
    );
}

export default LikeButton;