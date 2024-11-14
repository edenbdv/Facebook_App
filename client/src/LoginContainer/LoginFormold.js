import React, { useState } from 'react'; // Import useState from React
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './LoginForm.css';


function LoginForm({ onLogin,usersData  }) {

    

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


    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

         
        if (!usersData[formData.username]) {
            errors.username = 'Invalid username'
        } else {
            // Retrieve the user object from usersData
            const user = usersData[formData.username];
            // Check if the password matches
            if (user.password !== formData.password) {
                errors.password = 'Invalid password';
            }
        }
    
        setFormErrors(errors);

        // If there are no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            onLogin(formData.username);
            // After successful login
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
