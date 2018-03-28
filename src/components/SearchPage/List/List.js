import React, { Component } from 'react';
import './List.css';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { updateCartItems } from '../../../redux/ducks/reducer';

class List extends Component {
    constructor () {
        super();
        this.state = {

        }
    }

    addItem ( item ) {
        axios.post('/api/cart/add', {
            product_id: item.id,
            name: item.name,
            price: item.price,
            product_category_id: item.product_category_id,
            quantity: 1,
            image_url: item.image_url
        }).then( () => {
            axios.get('/api/cart').then( cart => {
                this.props.updateCartItems( cart.data );
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        return (
            <div>
                LIST COMPONENT
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

const mapDispatchToProps = {
    updateCartItems: updateCartItems
}

export default connect( mapStateToProps, mapDispatchToProps )( List );