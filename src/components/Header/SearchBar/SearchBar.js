import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateSearchResults } from '../../../redux/ducks/reducer';

class SearchBar extends Component {
    constructor () {
        super();
        this.state = {
            category: 'Game',
            subcategory: 'All',
            userInput: '',
            searchRedirect: false
        }
    }
        
    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    handleCategoryChange ( property, value ) {
        const { productSubcategories } = this.props;

        this.setState({ [property]: value });

    //     if ( property === 'category' ) {
    //         if ( value === 'Games' ) {
    //             this.setState({ subcategory: productSubcategories[0][0], subcategoryList: productSubcategories[0] });
    //         } else if ( value === 'Books' ) {
    //             this.setState({ subcategory: productSubcategories[1][0], subcategoryList: productSubcategories[1] });
    //         } else if ( value === 'Posters' ) {
    //             this.setState({ subcategory: productSubcategories[2][0], subcategoryList: productSubcategories[2] });
    //         }
    //     }
    }

    search () {
        let { category, subcategory, userInput } = this.state;
        const { updateSearchResults } = this.props;

        updateSearchResults( [] );  // Resets the search results to an empty array

        if ( category === 'Games' ) {

            axios.get(`/api/search/games?search=${ userInput }&platform=${ subcategory }`)
            .then( res => {
                updateSearchResults( res.data );
            }).catch(err => console.log(err)); 

        }
        else if ( category === 'Books') {

            axios.get(`/api/search/books?search=${ userInput }&subject=${ subcategory }`)
            .then( res => {
                updateSearchResults( res.data );
            }).catch(err => console.log(err));

        } else if ( category === 'Posters' ) {

            axios.get(`/api/search/posters?search=${ userInput }&category=${ subcategory }`)
            .then( res => {
                updateSearchResults( res.data );
            }).catch(err => console.log(err));
            
        }
        this.setState(prevState => ({ searchRedirect: !prevState.searchRedirect }));
    }

    render () {
        const { category, subcategory, searchRedirect } = this.state;
        const { productCategories } = this.props;

        // List of category options ( The list order isn't changing, so using i for the key is fine )
        const categories = productCategories && productCategories.map( (e, i) => <option key={ i } value={ e.productcategory }>{ e.productcategory }</option> );

        return (
            <div className="search">
                <div className="search-container">
                    <select defaultValue={ category } className="category-1" onChange={ (e) => this.handleCategoryChange("category", e.target.value) }>
                        { categories }
                    </select>
                    
                    <div>
                        <input className="search-bar" placeholder={ 'Search' } onChange={ (e) => this.handleChange('userInput', e.target.value) } onKeyDown={ (e) => e.keyCode === 13 ? this.search() : '' }/>
                        <Link to="/search"><FaSearch className="fa-search" size={20} onClick={ () => this.search() }/></Link>
                        {/* <Link to="/search" className="search-icon" onClick={ () => this.search() }>
                            <i className="fas fa-search"></i>
                        </Link> */}
                    </div>

                    { searchRedirect && <Redirect to="/search" /> }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        productCategories: state.productCategories,
        productSubcategories: state.productSubcategories,
        searchResults: state.searchResults 
    };
};

const mapDispatchToProps = {
    updateSearchResults: updateSearchResults
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchBar );