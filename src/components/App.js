import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { getUser, getProductCategories, getProductSubcategories } from '../redux/ducks/reducer';

import routes from '../router';
import MainHeader from './MainHeader/MainHeader';

class App extends Component {

    componentDidMount () {
        const { getUser, getProductCategories, getProductSubcategories } = this.props;

        // Check if the user is logged in
        axios.get('/api/user').then( res => {
            getUser( res.data );
        }).catch( err => console.log(err) );

        // Get the product categories
        axios.get('/api/product-categories').then( res => {
            getProductCategories( res.data );
        }).catch( console.log() );

        // Get the product subcategories
        axios.get('/api/product-subcategories').then( res => {
            getProductSubcategories( res.data );
            console.log( this.props.productSubcategories );
        }).catch( console.log() );

        axios.get('/api/other-users').then( res => {
            console.log( res.data );
        }).catch( err => console.log(err) );
    }
    
    render() {
        return (
            <div className="App">

                <MainHeader />

                <main className="main">
                    <div className="main-container panel">

                        { routes }

                    </div>
                </main>
                
                <footer className="footer">
                    <div className="footer-container panel">

                        <div>&copy; 2018 My Site</div>

                    </div>
                </footer>

            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        productCategories: state.productCategories,
        productSubcategories: state.productSubcategories
    };
};

const mapDispatchToProps = {
    getUser: getUser,
    getProductCategories: getProductCategories,
    getProductSubcategories: getProductSubcategories,
};

export default connect( mapStateToProps , mapDispatchToProps, null, { pure: false } )( App );
