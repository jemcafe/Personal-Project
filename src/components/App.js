import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, getProductCategories, getProductSubcategories } from '../redux/ducks/reducer';
import routes from '../router';
import Header from './Header/Header';

class App extends Component {

    componentDidMount () {
        const { getUser, getProductCategories, getProductSubcategories } = this.props;
        
        // Checks if the user is logged in (session)
        // Gets the list of product categories and subcategories
        axios.all([
            axios.get('/api/user'),
            axios.get('/api/product/categories'),
            axios.get('/api/product/subcategories')
        ]).then(axios.spread( ( userRes, productCategoriesRes, productSubcategoriesRes ) => {
            getUser( userRes.data );
            getProductCategories( productCategoriesRes.data );
            getProductSubcategories( productSubcategoriesRes.data );
        })).catch(err => console.log(err));
    }
    
    render() {
        return (
            <div className="App">

                <Header />

                <main className="main">
                    <div className="main-container panel">

                        { routes }

                    </div>
                </main>
                
                <footer className="footer">
                    <div className="footer-container panel">

                        <div>&copy; 2018 ThruAgate</div>

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
