import React, { Component } from 'react';
import './SearchPage.css';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { updateCartItems, getProduct } from '../../redux/ducks/reducer';
//Components
import Loading from '../Loading/Loading';
import Header from '../Header/Header';

class SearchPage extends Component {
    constructor () {
        super();
        this.state = {
            category: '',
            searchResults: [],
            userResults: [],
            hasSearchResults: ''
        }
    }

    componentWillReceiveProps (nextProps) {
        const { search } = nextProps.location;
        this.search( search, 'WillReceiveProps results ->' );
    }

    componentDidMount () {
        const { searchResults, userResults } = this.state;

        // If the search results is empty when the page loads, request the data
        if ( !searchResults.length && !userResults.length ) {
            const { search } = this.props.history.location;
            this.search( search, 'DidMount results->' );
        }
    }

    search ( search, lifecycle ) {
        const query = search.slice(1, search.length).split('&');
        const q = query[0].slice(2, query[0].length);
        let c = query[1].slice(2, query[1].length);

        // The second query parameter changes depending on the category
        const subcategory = c === 'games' ? `&platform=${ '' }`
                        : c === 'books' ? `&subject=${ '' }`
                        : c === 'posters' ? `&category=${ '' }`
                        : ``;

        // Search request
        axios.get(`/api/search/${ c === 'creators' ? 'users' : c }?search=${ q }${ subcategory }`)
        .then( res => {
            console.log(lifecycle, res.data);
            this.setState({
                category: c,
                searchResults: c !== 'creators' ? res.data : [],
                userResults: c === 'creators' ? res.data : [],
                hasSearchResults: res.data.length ? 'true' : 'false',
            });
        }).catch(err => {
            console.log(err)
            this.setState({
                searchResults: [],
                userResults: [],
                hasSearchResults: 'false'
            });
        });
    }

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
        const { category, searchResults, userResults, hasSearchResults } = this.state;
        const { user } = this.props;

        // List of products
        const listOfProducts = searchResults.map( (item, i) => {
            // Using i for the key is fine since the items aren't changing order
            return <li key={i} className="item">
                <div className="container">

                    <div className="img-container">
                        <Link to={`/product/${item.productcategory.toLowerCase()}/${item.name.split(' ').join('_')}`} className="img-fade-in">
                            <img src={ item.imageurl } alt="cover" onClick={ () => this.getProduct(item) }/>
                        </Link>
                    </div>

                    <div className="item-info-container">
                        <Link to={`/product/${item.productcategory.toLowerCase()}/${item.name.split(' ').join('_')}`} className="title" onClick={ () => this.getProduct(item) }>
                            { item.name.length > 26 ? `${item.name.slice(0,26).trim()}...` : item.name }
                        </Link>

                        { item.username && 
                            <div className="creator-name">by <Link to={`/${item.username}`}>{ item.username }</Link></div> 
                        }

                        <div className="rating-price">
                            <div className="rating">
                                <span style={{color: '#ffcdb6'}}><i className="fas fa-heart"></i></span> { Math.floor((Math.random() * (150 - 50)) + 50) }
                                {/* <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                <span><i className="fas fa-star"></i></span> */}
                            </div>
                            <div>${ item.price }</div>
                        </div>

                        { user.username
                            ? <button className="add-btn red-btn-2" onClick={ () => this.addItem( item ) }>Add To Cart</button>
                            : <Link to="/login" style={{alignSelf: 'center'}}><button className="add-btn red-btn-2">Add To Cart</button></Link> 
                        }
                    </div>

                </div>
            </li>
        });

        // List of users
        const listOfUsers = userResults.map( item => {
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
                <Header match={this.props.match} history={this.props.history} />
                <div className="container panel">
                    <div style={{ padding: '11px', color: '#7b727c' }}>Search Results:</div>

                    <div className="results">
                    
                        { !searchResults.length && !hasSearchResults.length ? (
                            <Loading /> 
                        ) : ( 
                            hasSearchResults === 'true' ? (
                                category === 'creators'
                                ? <ul className="users-list">{ listOfUsers }</ul>
                                : <ul className="product-list">{ listOfProducts }</ul> 
                            ) : (
                                <h4>No results</h4>
                            )
                        ) }

                    </div>

                    <div className="prev-next">
                        <FaAngleLeft className="fa-angle-L" size={40} color="gray" />
                        <FaAngleRight className="fa-angle-R" size={40} color="gray" />
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        cartItems: state.cartItems,
        product: state.product
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems,
    getProduct: getProduct
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPage );