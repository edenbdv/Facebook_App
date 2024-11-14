import React from 'react';
import './EditPost.css';

const EditPostButton = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={onClick}>
            <i className="bi bi-pencil"></i>
        </button>
    );
};

export default EditPostButton;

