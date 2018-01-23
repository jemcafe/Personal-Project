import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';

import Item from './Item/Item';

class SearchPage extends Component {
    constructor () {
        super();
        this.state = {}
        this.addItem = this.addItem.bind(this);
    }

    addItem ( productId, name, price, productCategoryId, quantity, image) {
        const { updateCartItems } = this.props;

        const body = {
            productId: productId,
            name: name,
            price: price,
            productCategoryId: productCategoryId,
            quantity: quantity,
            image: image
        };

        axios.post('/api/add-item', body).then( res => {
            console.log( res.data );
            
            axios.get('/api/cart').then( resp => {

                updateCartItems( resp.data );
                console.log( this.props.cartItems );

            }).catch( err => console.log(err) );

        }).catch( err => console.log(err) );
    }

    render () {
        const { searchResults } = this.props;

        // List of category options
        const list = searchResults.map( result => {
            return (
            <li key={ result.id }>
                <Item result={ result } 
                      addItem={ this.addItem } />
            </li>
            )
        });

        return (
            <div className="search-page">
                <div className="search-page-container">
                    {/* <div>The Search Page</div> */}
                    <div>Search Results:</div>

                    <div className="results">
                        <div className="results-container">

                            <div className="list">
                                { list.length === 0 ? 'No results' : <ul>{ list }</ul> }
                            </div>
                            <div className="prev-next-btn">
                                <button className="previous-btn">Previous</button>
                                <button className="next-btn">Next</button>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        searchResults: state.searchResults,
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPage );