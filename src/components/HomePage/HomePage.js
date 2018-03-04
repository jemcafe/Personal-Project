import React, { Component } from 'react';
import './Home.css';

class HomePage extends Component {
    render () {
        return (
            <div className="home-page">
                <div className="home-page-container">
                    {/* <div>THE HOME PAGE</div> */}
                    
                    <h1>( Latest Content )</h1>

                    <div className="loading">
                        <div className="loading-img loading-anim"></div>
                    </div>

                </div>
            </div>
        )
    }
}

export default HomePage;