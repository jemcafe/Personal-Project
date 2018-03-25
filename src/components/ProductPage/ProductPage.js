import React, { Component } from 'react';
import './ProductPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';
// Components
import Header from '../Header/Header';

class ProductPage extends Component {
    // constructor () {
    //     super();
    //     this.state = {
    //         product: {}
    //     }
    // }

    // componentDidMount () {
    //     axios.get().then().catch(err => console.log(err));
    // }

    addItem () {
        const { productInfo } = this.props;
        axios.post('/api/cart/add', {
            productId: productInfo.id,
            name: productInfo.name,
            price: productInfo.price,
            productCategoryId: productInfo.productcategoryid,
            quantity: 1,
            image: productInfo.imageurl
        }).then( () => {
            axios.get('/api/cart').then( cart => {

                this.props.updateCartItems( cart.data );

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        const { user, productInfo } = this.props;

        return (
            <div className="product-page">
                <Header match={this.props.match} />
                <div className="container panel">

                { productInfo ? (
                <div className="product">
                    <div className="product-img">
                        <img src={ productInfo.imageurl } alt="Product pic"/>
                    </div>
                    <div className="info-container">
                        <h3>{ productInfo.name }</h3>
                        <div>${ productInfo.price }</div>
                        { user.username
                        ? <button className="add-btn red-btn-2" onClick={ () => this.addItem() }>Add To Cart</button>
                        : <Link to="/login" style={{alignSelf: 'center'}}><button className="add-btn red-btn-2">Add To Cart</button></Link> 
                        }
                        <div className="description">
                            <h4>Description</h4>
                            { productInfo.description }
                        </div>
                    </div>
                </div>
                ) : ( 
                <h4 style={{margin: '20px 0', fontSize: '18px', color: '#91405475'}}>
                    Item not found<br/>( Try searching again )
                </h4>
                ) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        cartItems: state.cartItems,
        productInfo: state.productInfo
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems,
}

export default connect( mapStateToProps, mapDispatchToProps )( ProductPage );