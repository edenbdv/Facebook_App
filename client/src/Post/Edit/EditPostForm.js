// EditPostForm.js
import './EditPostForm.css'
import React, { useState, useEffect, useRef } from 'react';

const EditPostForm = ({ initialText, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(initialText);
  const textAreaRef = useRef(null);

  
  useEffect(() => {
    // Focus the textarea when the component mounts
    textAreaRef.current.focus();
  }, []);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

 
  const handleSave = () => {
    onSave(editedText);
  };
  


  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-content">
          <textarea
            className="form-control"
            ref={textAreaRef} // Assign the ref to the textarea
            value={editedText}
            onChange={handleTextChange} />
          <div className="button-container">
            <button
              className="btn btn-primary mt-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-primary mt-2"
              onClick={handleCancel}
            >
            Cancel
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
