import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateSearchResults } from '../../../redux/ducks/reducer';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            categoryONE: 'Game',
            categoryTWO: 'All',
            categoryTWOlist: ['All'],
            userInput: ''
        }
    }

    componentWillMount () {
        // // Gets the product categories
        // axios.get('/api/product-categories').then( res => {
        //     console.log( res.data );
        //     this.setState({ categoryONElist: res.data });
        // }).catch( console.log() );

        // // Gets the game platform names
        // axios.get('/api/game-platforms').then( res => {
        //     console.log( res.data );
        //     this.setState({ gamePlatforms: res.data });
        // }).catch( console.log() );
            
        // // Gets the book subject names
        // axios.get('/api/book-subjects').then( res => {
        //     console.log( res.data );
        //     this.setState({ bookSubjects: res.data });
        // }).catch( console.log() );
            
        // // Gets the poster category names
        // axios.get('/api/poster-categories').then( res => {
        //     console.log( res.data );
        //     this.setState({ posterCategories: res.data });
        // }).catch( console.log() );

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
        
    handleInputChange ( val ) {
        this.setState({ userInput: val });
    }

    handleCategoryChange ( property, val ) {
        const { productSubcategories } = this.props;

        this.setState({ [property]: val });

        if ( property === 'categoryONE' ) {
            if ( val === 'Games' ) {
                this.setState({ categoryTWOlist: productSubcategories[0] });
            } else if ( val === 'Books' ) {
                this.setState({ categoryTWOlist: productSubcategories[1] });
            } else if ( val === 'Posters' ) {
                this.setState({ categoryTWOlist: productSubcategories[2] });
            } else {
                this.setState({ categoryTWOlist: [] });
            }
        }
    }

    search () {
        let { categoryONE, categoryTWO, userInput } = this.state;
        const { updateSearchResults } = this.props;

        if ( categoryONE === 'Games' ) {
            axios.get(`/api/search/games?search=${ userInput }&platform=${ categoryTWO }`).then( res => {

                updateSearchResults( res.data );

            }).catch( console.log() ); 
        }
        else if ( categoryONE === 'Books') {
            axios.get(`/api/search/books?search=${ userInput }&subject=${ categoryTWO }`).then( res => {

                updateSearchResults( res.data );

            }).catch( console.log() );
        } else if ( categoryONE === 'Posters' ) {
            axios.get(`/api/search/posters?search=${ userInput }&category=${ categoryTWO }`).then( res => {

                updateSearchResults( res.data );

            }).catch( console.log() );
        }
    }

    render () {
        // List of category options ( The list order isn't changing, so using i for the key is fine )
        const categories1 = this.props.productCategories.map( (e, i) => {
            return <option key={ i } value={ e }>{ e }</option>
        });
        const categories2 = this.state.categoryTWOlist.map( (e, i) => {
            return <option key={ i } value={ e }>{ e }</option>
        });

        return (
            <div className="search">
                <span>
                <select className="category-1" onChange={ (e) => this.handleCategoryChange("categoryONE", e.target.value) }>
                    { categories1 }
                </select>

                <select className="category-2" onChange={ (e) => this.handleCategoryChange("categoryTWO", e.target.value) }>
                    { categories2 }
                </select>

                <input className="search-bar" placeholder={ 'Search' } onChange={ (e) => this.handleInputChange(e.target.value) }/>
                <Link to="/search"><button className="search-btn" onClick={ () => this.search() }>Search</button></Link>
                </span>
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