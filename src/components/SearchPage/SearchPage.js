import React, { Component } from 'react';
import './SearchPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCartItems, getProductInfo } from '../../redux/ducks/reducer';

class SearchPage extends Component {
    constructor () {
        super();
        this.state = {}
        this.addItem = this.addItem.bind(this);
    }

    changePage () {
        
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

    getProductInfo ( product ) {
        const { getProductInfo } = this.props;
        getProductInfo( product );
        console.log( this.props.productInfo );
    }

    render () {
        const { user, searchResults } = this.props;
        const { getProductInfo } = this.props;

        // List of products
        const list = searchResults.map( item => {
            return (
                <li key={ item.id }>
                    <div className="item">
                        <div className="item-container">

                            <Link to={`${item.productcategory.toLowerCase()}/${item.name}`}>
                                <div className="image-container">
                                    <img className="img-anim" src={ item.imageurl } alt="cover" onClick={ () => getProductInfo(item) }/>
                                </div>
                            </Link>

                            <div className="info-container">

                                <Link to={`${item.productcategory.toLowerCase()}/${item.name}`} 
                                      className="title" 
                                      onClick={ () => getProductInfo(item) }
                                >{ item.name.length > 20 ? `${item.name.slice(0,20).trim()}...` : item.name }</Link>

                                <div className="info">
                                    <div>Rating</div>
                                    <div>Date</div>
                                    <div>${ item.price }</div>
                                </div>
                                { user.username ? <button className="add-btn btn" onClick={ () => this.addItem( item.id, item.name, item.price, item.productcategoryid, 1, item.imageurl ) }>Add To Cart</button> : <Link to="/login"><button className="add-btn btn">Add To Cart</button></Link> }
                                
                            </div>

                        </div>
                    </div>
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

                            { list.length ? <ul>{ list }</ul> : 'No results' }
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
        user: state.user,
        cartItems: state.cartItems,
        searchResults: state.searchResults,
        productInfo: state.productInfo
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems,
    getProductInfo: getProductInfo
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPage );