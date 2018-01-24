import React, { Component } from 'react';
// import axios from 'axios';

// import RatingsGraph from './RatingsGraph/RatingsGraph';

class BooksPage extends Component {
    // constructor () {
    //     super();
    //     this.state = {
    //         ratings: []
    //     }
    // }

    // componentDidMount () {
    //     axios.get('/api/book-ratings').then( res => {
    //         console.log( res.data );
    //         this.setState({ ratings: res.data });
    //     }).catch( err => console.log(err) );
    // }    

    render () {
        return (
            <div className="books-page">
                <div className="books-page-container">
                    <div>The Books Page</div>

                    {/* <RatingsGraph data={ this.state.ratings } /> */}

                </div>
            </div>
        )
    }
}

export default BooksPage;