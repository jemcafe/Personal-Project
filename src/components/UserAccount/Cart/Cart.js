import React, { Component } from 'react';
import './Cart.css';
import FaTrash from 'react-icons/lib/fa/trash';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        console.log( this.props.cartItems );
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

        const priceTotal = cartItems.reduce( (acc, item) => acc += parseFloat(item.price), 0 ).toFixed(2);

        const listOfItems = cartItems.map( item => {
            return (
                <li key={ item.id }>
                    <div className="item">
                        <div className="item-container">

                            <div className="item-img">
                                <img className="image" src={ item.imageurl } alt="Product"/>
                            </div>

                            <div className="item-info">
                                <h4 className="name">{ item.name }</h4>
                                <div className="info">
                                    <div>Category: { item.productcategory }</div>
                                    <div>Quantity: { item.quantity }</div>
                                    <div>Price: ${ item.price }</div>
                                </div>
                            </div>
                            
                            {/* <button className="remove-btn" onClick={ () => this.removeItem( item.id ) }>Remove</button> */}
                            <FaTrash className="fa-trash" onClick={ () => this.removeItem( item.id ) } size={25} color="gray" />

                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div className="cart">
                <div className="cart-container">

                    <div className="products">
                        <div>CART</div>
                        <ul>
                            { listOfItems.length ? listOfItems : <li>This cart's boring.</li> }
                        </ul>
                    </div>

                    <div className="total">
                        <div>TOTAL</div>
                        <div className="total-summary">
                            <div>Total: ${ priceTotal }</div>
                            { priceTotal > 0 && <Link to="/checkout"><button className="checkout-btn btn">Checkout</button></Link> }
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