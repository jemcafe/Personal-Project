import React, { Component } from 'react';
import './SearchPage.css';
import Aux from '../../hoc/Aux';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import axios from 'axios';
//Components
import Loading from '../Loading/Loading';
import Header from '../Header/Header';
import Item from './Item/Item';

class SearchPage extends Component {
    constructor () {
        super();
        this.state = {
            category: '',
            searchResults: [],
            hasSearchResults: 'loading'
        }
    }

    componentWillReceiveProps (nextProps) {
        // console.log(nextProps);
        const { search } = nextProps.location;
        this.search( search, 'WillReceiveProps results ->' );
    }

    componentDidMount () {
        // If the search results is empty when the page loads, request the data
        const { search } = this.props.history.location;
        this.search( search, 'DidMount results->' );
    }

    resetSearch () {
        if ( this.state.hasSearchResults === 'true' ) {
            this.setState({ 
                searchResults: [],
                hasSearchResults: 'loading'
            });
        }
    }

    search ( search, lifecycle ) {
        // Resets the search for a fresh search
        this.resetSearch();
        
        // The query string is used for the search request
        const query = search.slice(1, search.length).split('&');
        const q = query[0].slice(2, query[0].length);
        let c = query[1].slice(2, query[1].length);

        // The second query parameter changes depending on the category (this is not implemented yet)
        const subcategory = c === 'games' ? `&platform=${ '' }`
                        : c === 'books' ? `&subject=${ '' }`
                        : c === 'posters' ? `&category=${ '' }`
                        : ``;

        // Search request
        axios.get(`/api/search/${ c === 'creators' ? 'users' : c }?search=${ q }${ subcategory }`)
        .then( res => {
            // console.log(lifecycle, res.data);
            // The 'No results' condition of the ternary is for Google Books
            this.setState({
                category: c,
                searchResults: res.data === 'No results' ? [] : res.data,
                hasSearchResults: res.data.length ? 'true' : 'false',
            });
        }).catch(err => {
            console.log(err)
            this.setState({
                searchResults: [],
                hasSearchResults: 'false'
            });
        });
    }

    render () {
        const { category, searchResults, hasSearchResults } = this.state;

        // List of Products
        const listOfProducts = searchResults.map((item, i) => {
            return <Item key={i}
                         history={this.props.history}
                         category={category} 
                         item={item} />
        });

        // List of Users
        const listOfUsers = searchResults.map((item, i) => {
            return <Item key={i} 
                         category={category} 
                         item={item} 
                         productRedirect={this.productRedirect} />
        });

        return (
            <div className="search-page">
                <Header match={this.props.match} history={this.props.history} />
                <div className="container panel">
                    
                    <div style={{ padding: '11px', color: '#7b727c' }}>Search Results:</div>

                    <div className="results">
                    
                        { !searchResults.length && hasSearchResults === 'loading' ? (
                            <Loading /> 
                        ) : ( 
                            hasSearchResults === 'true' ? (
                                category === 'creators'
                                ? <ul className="users-list">{ listOfUsers }</ul>
                                : <ul className="product-list">{ listOfProducts }</ul> 
                            ) : (
                                <h4>No results</h4>
                            )
                        ) }

                    </div>

                    <div className="prev-next">
                        <FaAngleLeft className="fa-angle-L" size={40} color="gray" />
                        <FaAngleRight className="fa-angle-R" size={40} color="gray" />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default SearchPage;