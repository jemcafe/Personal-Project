import React, { Component } from 'react';
import './App.css';
import routes from '../router/router';

import MainHeader from './MainHeader/MainHeader';

class App extends Component {
    render() {
        return (
            <div className="App">

                <MainHeader />

                <main className="main">
                    <div className="main-container panel">

                        { routes }

                    </div>
                </main>
                
                <footer className="footer">
                    <div className="footer-container panel">

                        <div>&copy; 2018 My Site</div>

                    </div>
                </footer>

            </div>
        );
    }
}

export default App;
