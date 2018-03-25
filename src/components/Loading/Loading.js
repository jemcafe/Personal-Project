import React from 'react';
import './Loading.css';

function Loading () {
    return (
        <div className="loading">
            <div className="loading-spin">
                <i className="fas fa-sync fa-spin"></i>
            </div>
        </div>
    )
}

export default Loading;