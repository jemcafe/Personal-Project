import React, { Component } from 'react';
import './ProductPage.css';
import { connect } from 'react-redux';

import Header from '../Header/Header';

class ProductPage extends Component {
    render () {
        const { productInfo } = this.props;

        return (
            <div className="product-page">
                <Header match={this.props.match} />
                { productInfo.name ?
                <div className="container panel">

                    <div className="img-container">
                        <img className="product-img"src={ productInfo.imageurl } alt="Product pic"/>
                    </div>
                    <div className="info-container">
                        <div>{ productInfo.name }</div>
                        <div>${ productInfo.price }</div>
                        <div><button className="red-btn-2">Add to cart</button></div>
                        <div className="description">
                            <h4>Description</h4>
                            { productInfo.description }
                        </div>
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