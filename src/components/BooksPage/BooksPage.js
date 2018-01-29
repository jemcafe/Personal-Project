import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContentSlider from '../ContentSlider/ContentSlider';
import ItemPage from '../ItemPage/ItemPage';

class BooksPage extends Component {

    render () {
        return (
            <div className="books-page">
                <div className="books-page-container">
                    <h3>Books</h3>

                    <Route exact path="/books" render={ () => {
                        return <ContentSlider 
                                    images={ ['https://i.ytimg.com/vi/9dQTgndDbhc/maxresdefault.jpg',
                                              'http://img1.ak.crunchyroll.com/i/spire2/e405c8c17ef60eb2b1e1fe5f7e8b45b91491626797_full.jpg',
                                              'https://images-na.ssl-images-amazon.com/images/I/91mya47EdnL.jpg',
                                              'https://m.media-amazon.com/images/I/51jVpI9h-jL._SL500_.jpg'] } /> 
                    } } />

                    <Route exact path="/books/:name" component={ ItemPage } />

                </div>
            </div>
        )
    }
}

export default BooksPage;