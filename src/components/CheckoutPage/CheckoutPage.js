import React, { Component } from 'react';
import './CheckoutPage.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';

import Checkout from './Checkout/Checkout';

class CheckoutPage extends Component {

    removeCartItems () {
        axios.delete('/api/remove-all-items').then( res => {
            //
        }).catch( err => console.log(err) );
    }

    render () {
        const { user, cartItems } = this.props;

        const priceTotal = cartItems.reduce( (acc, item) => acc += parseFloat(item.price, 10), 0 ).toFixed(2);

        return (
            <div className="checkout-page">

                { user.username &&
                <div className="checkout-page-container">
                    {/* <div>Checkout Page</div> */}

                    {/* <div className="shipping-info">
                        <div>Shipping Address</div>
                        <input placeholder="Name"/>
                        <input placeholder="Address"/>
                        <input placeholder="City"/>
                        <input placeholder="State"/>
                        <input placeholder="Zip Code"/>
                    </div>

                    <div className="payment-info">
                        <div>Payment</div>
                        <select>
                            <option>Visa</option>
                            <option>Master</option>
                        </select>
                    </div> */}

                    <div className="total">Total: ${ priceTotal }</div>

                    {/* <div><button>Place Order</button></div> */}

                    <Checkout name={ 'Products' } 
                              description={ 'Various products' } 
                              amount={ priceTotal } 
                              customer={ user.id } />

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