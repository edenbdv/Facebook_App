import React, { useState } from 'react';

const EditProfilePopup = ({handleClose, handleSave }) => {
    const [editedUserData, setEditedUserData] = useState({});
    const [previewProfilePic, setPreviewProfilePic] = useState(null); 

    const [fieldAlerts, setFieldAlerts] = useState({
        password: { success: false, error: false },
        username: { success: false, error: false },
        displayName: { success: false, error: false },
        profilePic: { success: false, error: false },
    });

    const handleInputChange = (e) => {
      
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];  // Remove the prefix
                setEditedUserData((prevData) => ({
                    ...prevData,
                    [name]: base64String,  //// Store only the Base64 content without prefix
                }));
                setPreviewProfilePic(reader.result); // Set the preview with full Base64 string
            };
    
            reader.readAsDataURL(file);  // Converts the file to a Base64 string
        } else {
            setEditedUserData((prevData) => ({
                ...prevData,
                [name]: value,  
            }));
        }

    };


    const handleSaveClick = async (e,fieldName) => {
        e.preventDefault();
        const fieldValue = editedUserData[fieldName];
        const saveSuccessful = await handleSave(fieldName, fieldValue);
        if (saveSuccessful) {
            setFieldAlerts((prev) => ({
                ...prev,
                [fieldName]: { success: true, error: false }, 
            }));
        } else {
            setFieldAlerts((prev) => ({
                ...prev,
                [fieldName]: { success: false, error: true }, 
            }));
        }
    };

    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                     <h2>Edit Profile</h2>

                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i> 
                    </button>
                    {/* Edit profile form */}
                    <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default on form submission */}
                        <div className="form-group">
                            <label htmlFor="displayName">Display Name:</label>
                            <input type="text" id="displayName" name="displayName" className="form-control" onChange={handleInputChange} />
                            <div className='d-flex align-items-center mt-2 '> 
                                <button className="btn btn-primary ml-2 mb-4"  onClick={(e) => handleSaveClick(e,'displayName')}  disabled={!editedUserData.displayName}>Save</button>
                                    {/* Success alert */}
                                    {fieldAlerts.displayName.success && (
                                    <div className="alert alert-success mt-2 ms-2 " role="alert">
                                        Changes saved successfully!
                                    </div>
                                )}
                                        {/* Error alert */}
                                {fieldAlerts.displayName.error && (
                                    <div className="alert alert-danger mt-2 ms-2" role="alert">
                                        Failed to save changes
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" className="form-control" onChange={handleInputChange} />
                            <div className='d-flex align-items-center mt-2 '> 
                            <button className="btn btn-primary ml-2 mb-4" onClick={(e) => handleSaveClick(e,'password')} disabled={!editedUserData.password}>Save</button>
                             {/* Success alert */}
                            {fieldAlerts.password.success && (
                                <div className="alert alert-success mt-2 ms-2" role="alert">
                                    Changes saved successfully!
                                </div>
                            )}
                                    {/* Error alert */}
                            {fieldAlerts.password.error && (
                                <div className="alert alert-danger mt-2 ms-2" role="alert">
                                    Failed to save changes
                                </div>
                            )}
                            </div>

                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="profilePic">Profile Picture:</label>
                            <div className=' mt-2 '> 
                                <div className='picture'>
                                <input type="file" id="profilePic" name="profilePic" className="form-control-file" accept="image/*" onChange={handleInputChange} />
                                   {/* Preview of selected image */}
                                    {previewProfilePic && (
                                        <div className="form-group mt-3">
                                            <img
                                                src={previewProfilePic}
                                                alt="Profile Preview"
                                                className="img-thumbnail"
                                                style={{ maxWidth: '150px', maxHeight: '150px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div className='picture-response d-flex align-items-center'>
                                    <button className="btn btn-primary ml-2" onClick={(e) => handleSaveClick(e,'profilePic')} disabled={!editedUserData.profilePic}>Save</button>
                                        {/* Success alert */}
                                        {fieldAlerts.profilePic.success && (
                                        <div className="alert alert-success mt-2 ms-2" role="alert">
                                            Changes saved successfully!
                                        </div>
                                    )}
                                            {/* Error alert */}
                                    {fieldAlerts.profilePic.error && (
                                        <div className="alert alert-danger mt-2 ms-2" role="alert">
                                            Failed to save changes
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePopup;
