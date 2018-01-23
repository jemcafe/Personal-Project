import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';

class CheckoutPage extends Component {
    render () {
        const { user, cartItems } = this.props;

        const priceTotal = cartItems.reduce( (acc, item) => acc += parseFloat( item.price, 10 ), 0);

        return (
            <div className="books-page">

                { user.username &&
                <div className="books-page-container">
                    <div>Checkout Page</div>

                    <div>Shipping Address</div>
                    <input placeholder="Name"/>
                    <input placeholder="Address"/>
                    <input placeholder="City"/>
                    <input placeholder="State"/>
                    <input placeholder="Zip Code"/>

                    <div>Payment</div>
                    <select>
                        <option>Visa</option>
                        <option>Master</option>
                    </select>

                    <div>Total: { priceTotal }</div>
                    <button>Place Order</button>

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