import React from 'react';
import ConnectLeft from '../ConnectionPage/ConnectLeft';
import ConnectRight from '../ConnectionPage/ConnectRight/ConnectRight';
import '../ConnectionPage/ConnectContainer.css';


function SignUpContainer({ setUsername }) {
    return (
        <div className="connect-container container-fluid text-center bg-secondary-subtle">
            <div className="row">
                <div className="col-12">
                    <div className=" header bg-primary bg-opacity-75 shadow p-3 text-white py-4 " style={{ marginLeft: '-15px', marginRight: '-15px' }}>
                        <h1 className="fw-bold"> Join FooBar </h1>
                    </div>
                </div>
            </div>

            <div className="connect-both ">
                <div className="row">
                    <div className="connect-right">
                    <ConnectRight formToShow="signup" setUsername={setUsername} />
                    </div>
                    <div className="connect-left">
                        <ConnectLeft />
                    </div>

                </div>
            </div>
        </div>

    );
}

export default SignUpContainer;