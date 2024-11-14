// SignupForm.js
import React, { useState } from 'react';
import { Link ,useNavigate  } from 'react-router-dom';
import './SignUpForm.css';
const config = require('../config'); 


function SignupForm({ onSignup }) {

    // eslint-disable-next-line no-restricted-globals
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        profilePicture: null
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        profilePicture: ''
    });

    const [signupSuccess, setSignupSuccess] = useState(false);


    const handleInputChange = (e) => {
       const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
    
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 300; // Adjust as needed
                const MAX_HEIGHT = 300; // Adjust as needed
                let width = img.width;
                let height = img.height;
    
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
    
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
    
            // Save the base64 string without the prefix for backend saving
            const base64WithoutPrefix  = canvas.toDataURL('image/jpeg').split(',')[1];  // Get base64 without prefix
            
            const base64WithPrefix = canvas.toDataURL('image/jpeg'); // base64 with data:image/jpeg;base64,

    
                setFormData({
                    ...formData,
                    profilePicture: base64WithoutPrefix
                });
    
                // Set the image source directly
                const previewImg = document.getElementById('profilePicturePreview');
                previewImg.src = base64WithPrefix;
            };
        };
    
        reader.readAsDataURL(file);
    };
    

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];

    //     setFormData({
    //         ...formData,
    //         profilePicture: file
    //     });

    //     // Read the selected file and display it
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const imageSrc = e.target.result;
    //         const base64String = e.target.result;

    //         setFormData({
    //             ...formData,
    //             profilePicture: base64String
    //         });

    //         // Set the image source directly
    //         const previewImg = document.getElementById('profilePicturePreview');
    //         previewImg.src = imageSrc;
    //     };
    //     reader.readAsDataURL(file);
    //  };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        
        // username validation:
        if (!/^[a-zA-Z]/.test(formData.username)) {
            errors.username = 'Username must start with a letter';
        }


        //password validation:
        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/\d/.test(formData.password)) {
            errors.password = 'Password must contain uppercase letters, lowercase lettesr, and digits';
        }


        // // Check if the username is already taken
        // if (usersData[formData.username]) {
        //     errors.username = 'Username already exists';
        // }


        // Additional validation logic, e.g., password match
        else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        //picture validation:
        if (!formData.profilePicture) {
            errors.profilePicture = 'Profile Picture is required';
        }

        // If there are no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            try {
                const formDataToSend = {
                    username: formData.username,
                    password: formData.password,
                    displayName: formData.displayName,
                    profilePic: formData.profilePicture // Assuming formData.profilePicture is a base64 encoded string
                };
    
                const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataToSend)
                });

                if (response.ok) { 
                    const userData = await response.json(); 

                    // Redirect to login page after successful signup
                    setSignupSuccess(true);
                    navigate('/', { state: { successMessage: 'Signup successful! You can now login.' } });
                } else {
                    const errorData = await response.json();
                    console.error('Error signing up:', errorData);
                    
                    // Handle signup error...
                }
            } catch (error) {
                console.error('Error signing up:', error);
                // Handle signup error...
            }
        } else {
            setFormErrors(errors);
        }
    };


    return (
        <form onSubmit={handleSubmit}>

            <div className="inputForm mb-2">
                <label htmlFor="validationDefaultUsername" className="form-label"></label>
                <input
                    type="text"
                    className="form-control"
                    id="validationDefaultUsername"
                    aria-describedby="inputGroupPrepend2"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange} required />
            </div>
            {formErrors.username && <div className="error">{formErrors.username}</div>}


            <div className="inputForm mb-2">
                <label htmlFor="validPassword" className="form-label"></label>
                <input
                    type="password"
                    className="form-control"
                    id="validPassword"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange} required />
            </div>
            {formErrors.password && <div className="error">{formErrors.password}</div>}


            <div className="inputForm mb-2">
                <label htmlFor="validVerificationPassword" className="form-label"></label>
                <input
                    type="password"
                    className="form-control"
                    id="validVerificationPassword"
                    placeholder="Password verification"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange} required />
                {formErrors.confirmPassword && <div className="error">{formErrors.confirmPassword}</div>}

            </div>

            <div className="inputForm mb-3">
                <label htmlFor="displayName" className="form-label"></label>
                <input
                    type="text"
                    className="form-control"
                    id="displayName"
                    aria-describedby="inputGroupPrepend2"
                    placeholder="display name"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange} required />
                {formErrors.displayName && <div className="error">{formErrors.displayName}</div>}

            </div>

            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupFile01">Upload photo</label>
                <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                    name="profilePicture"
                    onChange={handleFileChange} />
                {formErrors.profilePicture && <div className="error">{formErrors.profilePicture}</div>}
            </div>

            {formData.profilePicture && (
                <div className="image-preview-container">
                    <label className="input-group-text label-profile-picture" htmlFor="inputGroupFile01">Profile Picture:</label>
                    <div className="image-preview-wrapper">
                        <img id="profilePicturePreview" alt="Profile Preview" className="image-preview" />
                    </div>
                </div>
            )}

            {signupSuccess && (
                <div>
                    <p>Signup successful! You now can  <Link to="/">login</Link>.</p>
                </div>
            )}



            <div className="col-12">
                <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
        </form>

    );
};


export default SignupForm;


