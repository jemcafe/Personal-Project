import React, { Component } from 'react';
// import axios from 'axios';

class Cart extends Component {
    constructor () {
        super();
        this.state = {
            items: []
        }
    }

    // componentDidMount () {
    //     axios.get().then( res => {
    //         this.setState({ items: res.data });
    //     }).catch( err => console.log(err) );
    // }

    render () {
        const listOfItems = [];

        return (
            <div className="cart">
                <div className="cart-container">
                    <div className="title">CART</div>
                    
                    <div className="summary">
                        <div className="products">
                            PRODUCTS
                            <ul>
                                
                            </ul>
                        </div>

                        <div className="total">
                            TOTAL
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Cart;