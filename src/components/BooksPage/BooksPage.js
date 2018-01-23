import React, { Component } from 'react';
import axios from 'axios';

class BooksPage extends Component {
    constructor () {
        super();
        this.state = {
            ratings: []
        }
    }

    componentDidMount () {
        axios.get('/api/book-ratings').then( res => {
            // console.log( res.data );
            this.setState({ ratings: res.data });
            console.log( this.state.ratings );
        }).catch( err => console.log(err) );
    }    

    render () {
        return (
            <div className="books-page">
                <div className="books-page-container">
                    <div>The Books Page</div>

                    <div className="ratings-graph">RATINGS GRAPH</div>

                </div>
            </div>
        )
    }
}

export default BooksPage;