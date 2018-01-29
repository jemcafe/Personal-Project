import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ContentSlider from '../ContentSlider/ContentSlider';
import ItemPage from '../ItemPage/ItemPage';

class GamesPage extends Component {
    render () {
        return (
            <div className="games-page">
                <div className="games-page-container">
                    <div>The Games Page</div>

                        <Route exact path="/games" render={ () => <ContentSlider /> } />
                        <Route exact path="/games/:name" component={ ItemPage } />

                </div>
            </div>
        )
    }
}

export default GamesPage;