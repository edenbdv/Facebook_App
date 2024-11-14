import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import './LoginForm.css';
const config = require('../config'); 



function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
    
        try {
            const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/tokens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });
    
            if (response.ok) {
                const tokenData = await response.json();
                // Assuming tokenData contains the JWT token
                const token = tokenData.token;
    
                // Pass the token forward to upper classes
                onLogin(formData.username, token);
              
            } else {
                const errorData = await response.json();
                // Handle login error
                console.error('Error logging in:', errorData);
                errors.password = 'Invalid username or password';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error
            errors.password = 'An error occurred while logging in';
        }
    
        setFormErrors(errors);
    };
    


    return (
        <form onSubmit={handleSubmit}>
            <div className="inputForm mb-2">
                <label htmlFor="validationDefaultUsername" className="form-label"></label>
                <input
                    type="text"
                    className="form-control"
                    id="validationDefaultUsername"
                    name="username"
                    aria-describedby="inputGroupPrepend2"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.username && <div className="error">{formErrors.username}</div>}
            </div>
            <div className="inputForm mb-3">
                <label htmlFor="validationDefaultPassword" className="form-label"></label>
                <input
                    type="password"
                    className="form-control"
                    id="validationDefaultPassword"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.password && <div className="error">{formErrors.password}</div>}
            </div>
            <div>
                <button className="btn btn-primary mb-3" type="submit">Login</button>
            </div>
            <div>
                <Link to="/signup">
                    <button className="btn btn-primary" type="button">Create new account</button>
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;
