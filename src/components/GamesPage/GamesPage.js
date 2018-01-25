import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ItemPage from '../ItemPage/ItemPage';

class GamesPage extends Component {
    render () {
        return (
            <div className="games-page">
                <div className="games-page-container">
                    <div>The Games Page</div>

                    <Route path="/games/:name" component={ ItemPage } />

                </div>
            </div>
        )
    }
}

export default GamesPage;