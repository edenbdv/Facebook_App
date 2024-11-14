import React from 'react';
import './ButtonStyle.css'; 

const ShareButton = () => {
    return (
        <div className="dropup">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-share"></i> Share
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a className="dropdown-item" href="#">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <i className="bi bi-box-arrow-up-right me-2"></i>
                            </div>
                            <div className="col">
                                Share now (Public)
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <i className="bi bi-plus-circle me-2"></i>
                            </div>
                            <div className="col">
                                Post in Story
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <i className="bi bi-send me-2"></i>
                            </div>
                            <div className="col">
                                Send through Messenger
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}


export default ShareButton;