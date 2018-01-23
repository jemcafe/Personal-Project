import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCartItems } from '../../../redux/ducks/reducer';

// import Item from './Item/Item';

class Cart extends Component {
    constructor () {
        super();
        this.state = {
            userInput: '',
            quantity: ''
        }
    }

    componentDidMount () {
        axios.get('/api/cart').then( res => {
            console.log( res.data );
            this.props.updateCartItems( res.data );
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    removeItem ( id ) {
        const { updateCartItems } = this.props;

        axios.delete(`/api/remove-item/${ id }`).then( res => {
            console.log( res.data );
            
            axios.get('/api/cart').then( resp => {
                updateCartItems( resp.data );
                console.log( resp.data );
            }).catch( err => console.log(err) );

        }).catch( err => console.log(err) );
    }

    updateQuantity ( id, quantity ) {
        axios.patch(`/api/update-quantity/${ id }`, { quantity }).then( res => {
            console.log( res.data );
            
            axios.get('/api/cart').then( resp => {
                this.props.updateCartItems( resp.data );
            }).catch( err => console.log(err) );

        }).catch( err => console.log(err) );
    }

    render () {
        const { cartItems } = this.props;

        const priceTotal = cartItems.reduce( (acc, item) => acc += parseFloat( item.price, 10 ), 0);

        const listOfItems = cartItems.map( item => {
            return (
                <li key={ item.id }>
                    <div className="item">
                        <div className="item-container">

                            <div className="item-img">
                                <img className="image" src={ item.imageurl } alt="Product"/>
                            </div>

                            <div className="item-info">
                                <div className="name">{ item.name }</div>
                                <div className="info">
                                    <div>Category: { item.productcategory }</div>
                                    <div>Quantity: { item.quantity }</div>
                                    <div>Price: ${ item.price }</div>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={ () => this.removeItem( item.id ) }>Remove</button>
                            {/* <button className="remove-btn">Remove</button> */}

                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div className="cart">
                <div className="title">
                    CART
                    <div className="cart-container">

                        <div className="products">
                            <div>PRODUCTS</div>
                            <ul>
                                { listOfItems }
                            </ul>
                        </div>

                        <div className="total">
                            <div>TOTAL</div>
                            <div className="total-summary">
                                <div>Total: ${ priceTotal }</div>
                                <button className="checkout-btn">Checkout</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return { cartItems: state.cartItems };
    };
    
    const mapDispatchToProps = {
        updateCartItems: updateCartItems
    }

export default connect( mapStateToProps, mapDispatchToProps )( Cart );