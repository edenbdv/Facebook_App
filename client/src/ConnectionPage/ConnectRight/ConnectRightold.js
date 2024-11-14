import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../LoginContainer/LoginForm';
import SignupForm from '../../SignUpContainer/SignUpForm';
import './ConnectRight.css';


function ConnectRight({ formToShow, usersData, setUsersData,setUsername  }) {

    const navigate = useNavigate();
   

    const renderForm = () => {
        switch (formToShow) {
            case 'login':
                return <LoginForm onLogin={handleLogin} usersData={usersData }  />;
            case 'signup':
                return <SignupForm onSignup={handleSignup} usersData={usersData }  />;
            default:
                return null;
        }
    };


    const handleSignup = (userData) => {
        setUsersData(prevUsersData => {
          return { ...prevUsersData, [userData.username]: userData };
        });
      };
      

    const handleLogin= (newUsername) => {
         // Set username in the App component's state
         setUsername(newUsername);
        navigate('/feed');   
      };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className=" card">
                <div className="card-body">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}

export default ConnectRight;
