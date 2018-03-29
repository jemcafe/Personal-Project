import React, { Component } from 'react';
import './ProductPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';
// Components
import Loading from '../Loading/Loading';
import Header from '../Header/Header';

class ProductPage extends Component {
    constructor () {
        super();
        this.state = {
            product: {},
            hasProduct: 'loading',
            hasImage_url: 'loading',
            hasDescription: 'loading'
        }
    }

    componentDidMount () {
        // console.log( 'Props match ->', this.props.match );
        // console.log( 'Props history ->', this.props.history );
        const { match, history } = this.props;
        
        const category = match.params.category;
        const name = match.params.name;
        const id = history.location.search.slice(4, history.location.search.length);

        // console.log({ category, name, id });

        axios.get(`/api/product?category=${ category }&product_id=${ id }&name=${ name }`)
        .then( product => {
        //    console.log( 'Product ->', product.data );
           this.setState({ 
               product: product.data,
               hasProduct: product.data.length ? 'true' : 'false',
               hasImage_url: product.data.image_url ? 'true' : 'false',
               hasDescription: product.data.description ? 'true' : 'false'
            });
        }).catch(err => console.log(err));
    }

    addItem  = () => {
        const { product } = this.state;
        const { productInfo } = this.props;
        axios.post('/api/cart/add', {
            product_id: productInfo.id,
            name: productInfo.name,
            price: productInfo.price,
            product_category_id: productInfo.product_category_id,
            quantity: 1,
            image_url: productInfo.image_url
        }).then( () => {
            axios.get('/api/cart').then( cart => {

                this.props.updateCartItems( cart.data );

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        const { product } = this.state;
        const { match, user, productInfo } = this.props;

        const image_url = product.image_url_sml ? product.image_url_sml : product.image_url;

        return (
            <div className="product-page">
                <Header match={this.props.match} history={this.props.history} />
                <div className="container panel">

                { product ? (
                    <div className="product">
                        <div className="product-img">
                            { this.state.hasImage_url === 'loading' 
                              ? <Loading />
                              : <img src={ image_url } alt="Product pic"/> }
                        </div>
                        <div className="info-container">
                            <h3>{ product.name }</h3>
                            <div>${ product.price }</div>
                            { user.username
                              ? <button className="add-btn red-btn-2" onClick={ this.addItem }>Add To Cart</button>
                              : <Link to="/login" style={{alignSelf: 'center'}}><button className="add-btn red-btn-2">Add To Cart</button></Link> 
                            }
                            <div className="description">
                                <h4>Description</h4>
                                { this.state.hasDescription === 'loading'
                                  ? <Loading />
                                  : (
                                    product.description
                                    ? product.description
                                    : <h5>No description</h5> 
                                  ) }
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