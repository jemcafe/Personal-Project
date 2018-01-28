import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import ContentSlider from './ContentSlider/ContentSlider';
import ItemPage from '../ItemPage/ItemPage';

class PostersPage extends Component {

    render () {
        return (
            <div className="posters-page">
                <div className="posters-page-container">
                    <div>The Posters Page</div>

                    {/* <ContentSlider /> */}

                    <Route path="/posters/:name" component={ ItemPage } />

                </div>
            </div>
        )
    }
}

export default PostersPage;