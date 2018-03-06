import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends Component {
    amountToCents = ( amount ) => amount * 100;

    successfulPayment = ( data ) => {
        console.log('Payment successful', data.data.success);
        
        // If the payment, is successful the cart is emptied
        if ( data.data.success.paid ) {
            this.props.removeCartItems();
        }
    }

    onToken = ( amount, description ) => ( token ) => {
        axios.post('/save-stripe-token', {
            description: description,
            source: token.id,
            currency: 'USD',
            amount: this.amountToCents(amount),
        })
        .then( this.successfulPayment )
        .catch( err => console.log('Payment Error', err) );
    }

    render () {
        const { name, description, amount } = this.props;

        return (
            <StripeCheckout
                name={ name }
                description={ description }
                amount={ this.amountToCents(amount) }
                shippingAddress={ true }
                billingAddress={ true }
                token={ this.onToken( amount, description ) }
                currency="USD"
                stripeKey={ process.env.REACT_APP_STRIPE_PUBLISH_KEY }
            />
        )
    }
}

export default Checkout;