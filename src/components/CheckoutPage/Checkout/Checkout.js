import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// import { connect } from 'react-redux';
// import { updateCartItems } from '../../../redux/ducks/reducer';

class Checkout extends Component {
    amountToCents = ( amount ) => amount * 100;

    onToken = ( amount, description ) => ( token ) => {
        axios.post('/save-stripe-token', {
            description: description,
            source: token.id,
            currency: 'USD',
            amount: this.amountToCents(amount),
        })
        .then( res => console.log( 'Payment successful' ) )
        .catch( err => console.log('Payment Error', err) );
    }

    render () {
        // const { cartItems } = this.props;
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

// const mapStateToProps = ( state ) => {
//     return {
//         cartItems: state.cartItems
//     };
// };

// const mapDispatchToProps = {
//     updateCartItems: updateCartItems
// }

// export default connect( mapStateToProps, mapDispatchToProps )( Checkout );