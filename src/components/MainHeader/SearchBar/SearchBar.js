import React, { Component } from 'react';
import searchIcon from '../../../images/icon-search.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateSearchResults } from '../../../redux/ducks/reducer';

class SearchBar extends Component {
    constructor () {
        super();
        this.state = {
            category: 'Game',
            subcategory: 'All',
            subcategoryList: ['All'],
            userInput: ''
        }
    }

    componentWillMount () {
        // Gets all poster ( for test purposes )
        // axios.get('/api/search/posters').then( res => {
        //     console.log( res.data );
        // }).catch( console.log() );

        //
        // axios.get('/api/getgames').then( res => {
        //     console.log( res.data );
        // }).catch( err => console.log(err) );

        //
        // axios.get('/api/getbooks').then( res => {
        //     console.log( res.data );
        // }).catch( err => console.log(err) );

        // axios.get('/api/getGameRatingBoards').then( res => {
        //     console.log( res.data );
        // }).catch( console.log() );
    }
        
    handleInputChange ( value ) {
        this.setState({ userInput: value });
    }

    handleCategoryChange ( property, value ) {
        const { productSubcategories } = this.props;

        this.setState({ [property]: value });

        if ( property === 'category' ) {
            if ( value === 'Games' ) {
                this.setState({ subcategory: productSubcategories[0][0], subcategoryList: productSubcategories[0] });
            } else if ( value === 'Books' ) {
                this.setState({ subcategory: productSubcategories[1][0], subcategoryList: productSubcategories[1] });
            } else if ( value === 'Posters' ) {
                this.setState({ subcategory: productSubcategories[2][0], subcategoryList: productSubcategories[2] });
            }
        }
    }

    search () {
        let { category, subcategory, userInput } = this.state;
        const { updateSearchResults } = this.props;

        if ( category === 'Games' ) {
            axios.get(`/api/search/games?search=${ userInput }&platform=${ subcategory }`).then( res => {

                updateSearchResults( res.data );

            }).catch( console.log() ); 
        }
        else if ( category === 'Books') {
            axios.get(`/api/search/books?search=${ userInput }&subject=${ subcategory }`).then( res => {

                updateSearchResults( res.data );

            }).catch( console.log() );
        } else if ( category === 'Posters' ) {
            axios.get(`/api/search/posters?search=${ userInput }&category=${ subcategory }`).then( res => {

                updateSearchResults( res.data );

            }).catch( console.log() );
        }
    }

    render () {
        const { category, subcategory, subcategoryList } = this.state;
        const { productCategories } = this.props;

        // List of category options ( The list order isn't changing, so using i for the key is fine )
        const categories = productCategories.length && productCategories.map( (e, i) => <option key={ i } value={ e }>{ e }</option> );
        
        const subcategories = subcategoryList.map( (e, i) => <option key={ i } value={ e }>{ e }</option> );

        return (
            <div className="search">
                <div className="search-container">
                    <select value={ category } className="category-1" onChange={ (e) => this.handleCategoryChange("category", e.target.value) }>
                        { categories }
                    </select>

                    {/* <select value={ subcategory } className="category-2" onChange={ (e) => this.handleCategoryChange("subcategory", e.target.value) }>
                        { subcategories }
                    </select> */}
                    
                    <input className="search-bar" placeholder={ 'Search' } onChange={ (e) => this.handleInputChange(e.target.value) }/>
                    <Link to="/search"><img className="search-icon" src={ searchIcon } alt="Search" onClick={ () => this.search() }/></Link>
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