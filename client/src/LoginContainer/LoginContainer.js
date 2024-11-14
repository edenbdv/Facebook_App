import React from 'react';
import ConnectLeft from '../ConnectionPage/ConnectLeft';
import ConnectRight from '../ConnectionPage/ConnectRight/ConnectRight';
import '../ConnectionPage/ConnectContainer.css';

function LoginContainer({ setUsername, setToken }) {
    return (
        <div className="container-fluid text-center connect-container">
             <div className="row">
                <div className="col-12">
                <div className="header bg-opacity-75 shadow p-3 text-white py-4 ">
                        <h1 className="fw-bold"> Welcome to FooBar</h1>
                    </div>
                </div>
            </div>
            
            <div className="connect-both">
                
                <div className="connect-right">
                  <ConnectRight formToShow="login" setUsername={setUsername} setToken={setToken} />
                </div>
                <div className="connect-left">
                    <ConnectLeft />
                </div>
            </div>
        </div>
    );
}

 /*col-12 col-md-6 order-md-1 connect-right*/

export default LoginContainer;
