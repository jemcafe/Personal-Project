import React, { Component } from 'react';
import './SearchPage.css';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateCartItems, getProduct } from '../../redux/ducks/reducer';

import Header from '../Header/Header';

class SearchPage extends Component {

    addItem ( item ) {
        axios.post('/api/cart/add', {
            productId: item.id,
            name: item.name,
            price: item.price,
            productCategoryId: item.productcategoryid,
            quantity: 1,
            image: item.imageurl
        }).then( () => {
            axios.get('/api/cart').then( cart => {

                this.props.updateCartItems( cart.data );

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    getProduct ( product ) {
        this.props.getProduct( product );
    }

    render () {
        const { user, searchCategory, searchResults } = this.props;

        // List of products
        const listOfProducts = searchResults.map( item => {
            return <li key={ item.id } className="item">
                <div className="container">

                    <div className="img-container">
                        <Link to={`/product/${item.name.split(' ').join('_')}`} className="img-fade-in">
                            <img src={ item.imageurl } alt="cover" onClick={ () => this.getProduct(item) }/>
                        </Link>
                    </div>

                    { (!item.headerbkgdimgurl || item.headerbkgdimgurl === '' ) && 
                    <div className="item-info-container">
                        <Link to={`/product/${item.name.split(' ').join('_')}`} className="title" onClick={ () => this.getProduct(item) }>
                            { item.name.length > 26 ? `${item.name.slice(0,26).trim()}...` : item.name }
                        </Link>

                        { item.username && 
                            <div className="creator-name">by <Link to={`/${item.username}`}>{ item.username }</Link></div> 
                        }

                        <div className="rating-price">
                            <div>Rating</div>
                            <div>${ item.price }</div>
                        </div>

                        { user.username
                            ? <button className="add-btn red-btn-2" onClick={ () => this.addItem( item ) }>Add To Cart</button>
                            : <Link to="/login" style={{alignSelf: 'center'}}><button className="add-btn red-btn-2">Add To Cart</button></Link> 
                        }
                    </div>
                    }

                </div>
            </li>
        });

        // List of users
        const listOfUsers = searchResults.map( item => {
            return <li key={ item.id } className="item">
                <div className="container panel">

                    <div className="img-container">
                        <Link to={`/${item.username}`} className="img-fade-in" style={{width: '100%', height: '100%'}}>
                            <div className="avatar" style={{background: `center / cover no-repeat url(${item.imageurl})`}}></div>
                        </Link>
                    </div>

                    <div className="item-info-container">
                        <Link to={`/${item.username}`} className="title">{ item.username }</Link>
                    </div>

                </div>
            </li>
        });

        return (
            <div className="search-page">
                <Header match={this.props.match} />
                <div className="container panel">
                    <div style={{ padding: '11px', color: '#7b727c' }}>Search Results:</div>

                    <div className="results">
                            
                            { searchCategory === 'Creators' && listOfUsers.length
                            ? <ul className="users-list">{ listOfUsers }</ul>
                            : listOfProducts.length
                            ? <ul className="product-list">{ listOfProducts }</ul> 
                            : <h4>No results</h4> }
                            
                    </div>

                    <div className="prev-next">
                        <FaAngleLeft className="fa-angle-L" size={40} color="gray" />
                        <FaAngleRight className="fa-angle-R" size={40} color="gray" />
                        {/* <div className="left-icon" style={{fontSize: '30px', color: 'gray', padding: '10px'}}><i className="fas fa-angle-left"></i></div> */}
                        {/* <div className="right-icon" style={{fontSize: '30px', color: 'gray', padding: '10px'}}><i className="fas fa-angle-right"></i></div> */}
                    </div>

                    {/* <div className="loading">
                        <div className="loading-spin"><i class="fas fa-sync fa-spin"></i></div>
                    </div> */}
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        cartItems: state.cartItems,
        searchCategory: state.searchCategory,
        searchResults: state.searchResults,
        product: state.product
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems,
    getProduct: getProduct
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPage );