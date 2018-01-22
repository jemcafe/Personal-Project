import React, { Component } from 'react';
import axios from 'axios';

// import Item from './Item/Item';

class Cart extends Component {
    constructor () {
        super();
        this.state = {
            items: []
        }
    }

    componentDidMount () {
        axios.get('/api/cart').then( res => {
            console.log( res.data );
            this.setState({ items: res.data });
        }).catch( err => console.log(err) );
    }

    render () {
        const { items } = this.state;

        const priceTotal = items.reduce( (acc, item) => {
            return acc += parseFloat( item.price, 10 )
        }, 0);

        const listOfItems = items.map( item => {
            return (
                <li key={ item.id }>
                    <div className="item">
                        <div className="item-container">

                            <div>
                                <img className="item-img" src={ item.imageurl } alt="Product"/>
                            </div>
                            <div>
                                <div className="item-name">{ item.name }</div>
                                <div className="item-info">
                                    <div>Category: { item.productcategory }</div>
                                    <div>Quantity: { item.quantity }</div>
                                    <div>Price: ${ item.price }</div>
                                </div>
                            </div>

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

export default Cart;