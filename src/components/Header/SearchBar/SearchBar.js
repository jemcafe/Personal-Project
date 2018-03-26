import React, { Component } from 'react';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { updateSearchCategory, updateSearchResults } from '../../../redux/ducks/reducer';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            categories: props.productCategories.length ? props.productCategories : [],
            category: props.productCategories.length ? props.productCategories[0].productcategory : '',
            subcategory: '',
            userInput: ''
        }
    }

    componentDidMount () {
        // If categories is empty, the list search categories is requested, and initial category value is the first category.
        // The list of categories is requested if it is not in redux. The condition prevents unecessary requests.
        if ( !this.props.productCategories.length ) {
            axios.get('/api/product/categories').then( categories => {
                this.setState({
                    categories: categories.data,
                    category: categories.data[0].productcategory 
                });
            }).catch(err => console.log(err));
        }
    }
        
    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    searchRedirect = (e) => {
        // Prevents the form from submitting
        e.preventDefault();

        // Redirect
        const { userInput, category } = this.state;
        this.props.history.push(`/search?q=${userInput}&c=${category.toLowerCase()}`);

        // If the user is on the search page and the component has a toggleMenu prop, the menu will toggle off after a search ( This is for the responive menu )
        if ( this.props.toggleMenu && this.props.match.url === '/search' ) {
            this.props.toggleMenu();
        }
    }

    render () {
        const { categories, category } = this.state;
        
        return (
            <div className="search">
                <form onSubmit={ this.searchRedirect }>
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
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        productCategories: state.productCategories,
        productSubcategories: state.productSubcategories,
    };
};

export default connect( mapStateToProps )( SearchBar );