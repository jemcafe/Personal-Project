import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContentSlider from '../ContentSlider/ContentSlider';
import ItemPage from '../ItemPage/ItemPage';

class BooksPage extends Component {

    render () {
        return (
            <div className="books-page">
                <div className="books-page-container">
                    <div>The Books Page</div>

                    <Route exact path="/books" render={ () => <ContentSlider /> } />
                    <Route exact path="/books/:name" component={ ItemPage } />

                </div>
            </div>
        )
    }
}

export default BooksPage;