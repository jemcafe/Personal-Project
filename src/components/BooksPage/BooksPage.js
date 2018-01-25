import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ItemPage from '../ItemPage/ItemPage';

// import axios from 'axios';
// import RatingsGraph from './RatingsGraph/RatingsGraph';

class BooksPage extends Component {

    render () {
        return (
            <div className="books-page">
                <div className="books-page-container">
                    <div>The Books Page</div>

                    <Route path="/books/:name" component={ ItemPage } />

                </div>
            </div>
        )
    }
}

export default BooksPage;