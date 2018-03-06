import React, { Component } from 'react';
import './ProductPage.css';
import { connect } from 'react-redux';

class ProductPage extends Component {
    
    render () {
        const { productInfo } = this.props;

        return (
            <div className="product-page">
            { productInfo.name ?
                <div className="product-page-container">

                    <div className="img-container">
                        <img className="product-img"src={ productInfo.imageurl } alt="Product pic"/>
                    </div>
                    <div className="info-container">
                        <div>{ productInfo.name }</div>
                        <div>${ productInfo.price }</div>
                        <div><button className="btn">Add to cart</button></div>
                        <div>{ productInfo.description }</div>
                    </div>

                </div>
                : <h4>Item not found</h4> }
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        productInfo: state.productInfo
    };
};

export default connect( mapStateToProps )( ProductPage );