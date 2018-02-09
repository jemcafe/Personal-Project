import React, { Component } from 'react';
import './SearchPage.css';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
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

    addItem ( item ) {
        const body = {
            productId: item.id,
            name: item.name,
            price: item.price,
            productCategoryId: item.productcategoryid,
            quantity: 1,
            image: item.imageurl
        };

        axios.post('/api/add-item', body).then( res => {
            axios.get('/api/cart').then( resp => {

                this.props.updateCartItems( resp.data );

            }).catch( err => console.log(err) );
        }).catch( err => console.log(err) );
    }

    getProductInfo ( product ) {
        this.props.getProductInfo( product );
    }

    render () {
        const { user, searchResults } = this.props;
        const { getProductInfo } = this.props;

        // List of products
        const list = searchResults.map( item => {
            return <li key={ item.id }>
                <div className="item">
                    <div className="item-container">

                        <Link to={`${item.productcategory.toLowerCase()}/${item.name}`}>
                            <div className="image-container">
                                <img className="img-anim" src={ item.imageurl } alt="cover" onClick={ () => getProductInfo(item) }/>
                            </div>
                        </Link>

                        <div className="item-info-container">

                            <Link to={`${item.productcategory.toLowerCase()}/${item.name}`} 
                                    className="title" 
                                    onClick={ () => getProductInfo(item) }
                            >{ item.name.length > 20 ? `${item.name.slice(0,20).trim()}...` : item.name }</Link>

                            <div className="info">
                                <div>Rating</div>
                                <div>Date</div>
                                <div>${ item.price }</div>
                            </div>

                            { user.username ? 
                            <button className="add-btn btn" onClick={ () => this.addItem( item ) }>Add To Cart</button> : 
                            <Link to="/login"><button className="add-btn btn">Add To Cart</button></Link> }
                            
                        </div>

                    </div>
                </div>
            </li>
        });

        return (
            <div className="search-page">
                <div className="search-page-container">
                    {/* <div>The Search Page</div> */}
                    <div className="">Search Results:</div>

                    <div className="results">
                        <div className="results-container">

                            { list.length ? <ul>{ list }</ul> : <h4>No results</h4> }

                            <div className="prev-next-btn">
                                <FaAngleLeft className="fa-angle-L" size={40} color="gray" />
                                <FaAngleRight className="fa-angle-R" size={40} color="gray" />
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