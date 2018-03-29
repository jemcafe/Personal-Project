import React, { Component } from 'react';
import './Item.css';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { updateCartItems, getProduct } from '../../../redux/ducks/reducer';

class Item extends Component {

    addItem () {
        const { item } = this.props;
        axios.post('/api/cart/add', {
            product_id: item.id,
            name: item.name,
            price: item.price,
            product_category_id: item.product_category_id,
            quantity: 1,
            image_url: item.image_url
        }).then( () => {
            axios.get('/api/cart').then( cart => {
                this.props.updateCartItems( cart.data );
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    productRedirect ( product ) {
        this.props.getProduct( product );
        const category = product.product_category.toLowerCase(),
              name = product.name.split(' ').join('-'),
              id = product.id;
        this.props.history.push(`/product/${category}/${name}?id=${id}`);
    }

    render () {
        const { user, category, item, productRedirect } = this.props;

        return (
            <Aux>
                { category === 'creators' ? (
                    <li className="item">
                        <div className="container panel">

                            <div className="img-container">
                                <Link to={`/${item.username}`} className="img-fade-in" style={{width: '100%', height: '100%'}}>
                                    <div className="avatar" style={{background: `center / cover no-repeat url(${item.avatar})`}}></div>
                                </Link>
                            </div>

                            <div className="item-info-container">
                                <Link to={`/${item.username}`} className="title">{ item.username }</Link>
                            </div>

                        </div>
                    </li>
                ) : (
                    <li className="item">
                        <div className="container">

                            <div className="img-container">
                                <a className="img-fade-in" onClick={ () => this.productRedirect(item) }>
                                    <img src={ item.image_url } alt="cover"/>
                                </a>
                            </div>

                            <div className="item-info-container">
                                <a className="title" onClick={ () => this.productRedirect(item) }>
                                    { item.name.length > 26 ? `${item.name.slice(0,26).trim()}...` : item.name }
                                </a>

                                <div className="rating-price">
                                    <div className="rating">
                                        { category === 'posters' ? (
                                            <Aux>
                                                <span style={{color: '#ffcdb6'}}><i className="fas fa-heart"></i></span> {Math.floor((Math.random() * (150 - 50)) + 50)}
                                            </Aux>
                                        ) : category === 'books' ? (
                                            <Aux>
                                                <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                                <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                                <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                                <span style={{color: '#ffcdb6'}}><i className="fas fa-star"></i></span>
                                                <span style={{color: 'lightgrey'}}><i className="fas fa-star"></i></span>
                                            </Aux> 
                                        ) : (
                                            <Aux>
                                                <span>{ item.rating }</span>
                                            </Aux>
                                        ) }
                                    </div>
                                    <div>${ item.price }</div>
                                </div>

                                {/* { user.username
                                ? <button className="add-btn red-btn-2" onClick={ () => this.addItem(item) }>Add To Cart</button>
                                : <Link to="/login" style={{alignSelf: 'center'}}><button className="add-btn red-btn-2">Add To Cart</button></Link> } */}
                            </div>

                        </div>
                    </li>
                ) }
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        user : state.user,
        cartItems: state.cartItems,
        product: state.product
    }
}

const mapDispatchToProps = {
    updateCartItems: updateCartItems,
    getProduct: getProduct
}

export default connect( mapStateToProps, mapDispatchToProps )( Item );