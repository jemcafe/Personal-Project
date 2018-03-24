import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateSearchCategory, updateSearchResults } from '../../../redux/ducks/reducer';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            categories: [],
            category: '',
            subcategory: '',
            userInput: '',
            searchRedirect: false
        }
    }

    componentDidMount () {
        // Gets the search categories, and initial category value is the first category.
        axios.get('/api/product/categories').then( categories => {
            this.setState({
                categories: categories.data,
                category: categories.data[0].productcategory 
            });
        }).catch(err => console.log(err));
    }
        
    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    // handleCategoryChange ( property, value ) {
    //     const { productSubcategories } = this.props;

    //     this.setState({ [property]: value });

    //     if ( property === 'category' ) {
    //         if ( value === 'Games' ) {
    //             this.setState({ subcategory: productSubcategories[0][0], subcategoryList: productSubcategories[0] });
    //         } else if ( value === 'Books' ) {
    //             this.setState({ subcategory: productSubcategories[1][0], subcategoryList: productSubcategories[1] });
    //         } else if ( value === 'Posters' ) {
    //             this.setState({ subcategory: productSubcategories[2][0], subcategoryList: productSubcategories[2] });
    //         }
    //     }
    // }

    searchRedirect () {
        if ( this.props.match.url !== '/search' ) {
            this.setState({ searchRedirect: true });
        } else {
            this.setState({ searchRedirect: false });
        }
    }

    search = (e) => {
        // Prevents the form from submitting
        e.preventDefault();
        
        const { category, subcategory, userInput } = this.state;
        const { updateSearchCategory, updateSearchResults } = this.props;

        // The selected category is updated in Redux. This is needed for conditional rendering on the search page.
        updateSearchCategory( category );

        // Resets the search results to an empty array for a fresh search
        updateSearchResults( [] );

        // The search results will change based on the selected category
        if ( category === 'Games' ) {

            axios.get(`/api/search/games?search=${ userInput }&platform=${ subcategory }`)
            .then( res => {
                updateSearchResults( res.data );
            }).catch(err => console.log(err)); 

        } else if ( category === 'Books') {

            axios.get(`/api/search/books?search=${ userInput }&subject=${ subcategory }`)
            .then( res => {
                updateSearchResults( res.data );
            }).catch(err => console.log(err));

        } else if ( category === 'Posters' ) {

            axios.get(`/api/search/posters?search=${ userInput }&category=${ subcategory }`)
            .then( res => {
                updateSearchResults( res.data );
            }).catch(err => console.log(err));
            
        } else if ( category === 'Creators' ) {

            axios.get(`/api/search/users?search=${ userInput }`)
            .then( res => {
                updateSearchResults( res.data );
            }).catch(err => console.log(err));

        }

        // If the user is not on the search page, they will be redirected
        this.searchRedirect();
    }


    render () {
        const { categories, category, subcategory, searchRedirect } = this.state;

        // console.log( 'Categories ->', categories );
        // console.log( 'Category ->', category );
        
        return (
            <div className="search">
                <form onSubmit={ this.search }>
                    <select className="category" value={ category } onChange={ (e) => this.handleChange('category', e.target.value) }>
                        { categories.map( e => <option key={ e.id } value={ e.productcategory }>{ e.productcategory }</option> ) }
                    </select>
                    <div className="search-bar">
                        <input placeholder={ 'Search' } onChange={ (e) => this.handleChange('userInput', e.target.value) }/>
                        <button type="submit" value="Search">
                            <div className="search-icon"><i className="fas fa-search"></i></div>
                        </button>
                    </div>
                </form>
                { searchRedirect && <Redirect to="/search" /> }
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        productSubcategories: state.productSubcategories,
        searchCategory: state.searchCategory,
        searchResults: state.searchResults
    };
};

const mapDispatchToProps = {
    updateSearchCategory: updateSearchCategory,
    updateSearchResults: updateSearchResults
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchBar );