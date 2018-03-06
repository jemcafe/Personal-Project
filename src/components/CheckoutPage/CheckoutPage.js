import React, { Component } from 'react';
import './CheckoutPage.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';

import Checkout from './Checkout/Checkout';

class CheckoutPage extends Component {
    constructor () {
        super();
        this.state = {}
    }

    removeCartItems = () => {
        const { user, updateCartItems } = this.props;
        axios.delete('/api/cart/remove-all').then( cart => {

                updateCartItems( cart.data );
                this.props.history.push(`/useraccount/cart`);

        }).catch(err => console.log(err));
    }

    render () {
        const { user, cartItems } = this.props;

        const priceTotal = cartItems.reduce( (acc, item) => acc += parseFloat(item.price, 10), 0 ).toFixed(2);

        return (
            <div className="checkout-page">

                { user.username &&
                <div className="checkout-page-container">

                    <div className="total">Total: <span>${ priceTotal }</span></div>

                    {/* <div><button>Place Order</button></div> */}

                    <Checkout name={ 'Products' } 
                              description={ 'Various products' } 
                              amount={ priceTotal } 
                              customer={ user.id }
                              removeCartItems={ this.removeCartItems } />

                </div>
                }

            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems
}

export default connect( mapStateToProps, mapDispatchToProps )( CheckoutPage );