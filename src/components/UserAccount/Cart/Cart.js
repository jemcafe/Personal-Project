import React, { Component } from 'react';
import './Cart.css';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { updateCartItems } from '../../../redux/ducks/reducer';

// Components
import Checkout from './Checkout/Checkout';

class Cart extends Component {
    constructor () {
        super();
        this.state = {
            quantity: ''
        }
    }

    componentDidMount () {
        axios.get('/api/cart').then( cart => {
            this.props.updateCartItems( cart.data );
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    removeItem ( id ) {
        const { updateCartItems } = this.props;

        axios.delete(`/api/cart/remove/${id}`).then( () => {
            axios.get('/api/cart').then( cart => {

                updateCartItems( cart.data );

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    updateQuantity ( id ) {
        const { quantity } = this.state;
        axios.patch(`/api/cart/update/quantity/${id}`, { quantity }).then( res => {
            axios.get('/api/cart').then( cart => {

                this.props.updateCartItems( cart.data );

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    removeAllItems = () => {
        // Removes all items from the cart
        axios.delete('/api/cart/remove-all').then( cart => {

                this.props.updateCartItems( cart.data );
                this.props.history.push(`/useraccount/cart`);

        }).catch(err => console.log(err));
    }

    render () {
        const { user, cartItems } = this.props;

        const priceTotal = cartItems.reduce( (acc, item) => acc += item.quantity * parseFloat(item.price), 0 ).toFixed(2);

        const listOfItems = cartItems.map( item => {
            return <li key={ item.id }>
                <div className="item">
                    <div className="item-container">

                        <div className="item-img">
                            <img src={ item.imageurl } alt="Product"/>
                        </div>

                        <div className="item-info">
                            <h4 className="title">
                                { item.name.length > 28 ? `${item.name.slice(0,28).trim()}...` : item.name }
                            </h4>
                            <div className="info">
                                <div>Category: { item.productcategory }</div>
                                <div>Quantity: <span>{ item.quantity }</span></div>
                                <div>Price: <span>${ item.price }</span></div>
                            </div>
                        </div>
                        <div>
                            <div className="trash-icon" onClick={ () => this.removeItem( item.id ) }><i className="fas fa-trash"></i></div>
                        </div>

                    </div>
                </div>
            </li>
        });

        return (
            <div className="cart">
                <div className="cart-container">

                    <div className="products">
                        <h4>CART</h4>
                        { listOfItems.length ? <ul>{ listOfItems }</ul> : <h5 style={{textAlign: 'center'}}>This cart's boring.</h5> }
                    </div>

                    <div className="total">
                        <h4>TOTAL</h4>
                        <div className="total-summary">
                            <div className="total">${ priceTotal }</div>
                            { priceTotal > 0 && 
                            <Checkout name={ 'Products' } 
                                description={ 'Various products' } 
                                amount={ priceTotal } 
                                customer={ user.id }
                                removeAllItems={ this.removeAllItems } /> }
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
        cartItems: state.cartItems 
    }
};
    
const mapDispatchToProps = {
    updateCartItems: updateCartItems
}

export default connect( mapStateToProps, mapDispatchToProps )( Cart );