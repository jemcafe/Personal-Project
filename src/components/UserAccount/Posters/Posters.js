import React, { Component } from 'react';
import './Posters.css';
import axios from 'axios';

import { connect } from 'react-redux';

import Poster from './Poster/Poster';

class Posters extends Component {
    constructor () {
        super();
        this.state = {
            posters: [],
            name: '',
            description: '',
            price: '0.00',
            postercategoryid: 1,
            imageurl: ''
        }
        // Methods do not need to be binded if they are function expressions
    }

    componentDidMount () {
        axios.get(`/api/posters`).then( posters => {
            this.setState({ posters: posters.data });
        }).catch(err => console.log(err));
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    handlePriceChange ( value ) {
        // The price input must be a number
        if ( !isNaN(value) && value.length < 10 ) {
            // The decimal point is removed from the string 
            let newPrice = value.split('.').join('');

            // The string is split by dollars and cents
            let dollars = value.length < 4 ? '0' : newPrice.slice(0, newPrice.length-2);
            let cents = newPrice.slice(newPrice.length-2, newPrice.length);

            // Conditions based on the string's length and index value
            if ( newPrice.length > 3 && dollars[0] !== '0' ) {
                newPrice = `${dollars}.${cents}`;
            } else if ( newPrice.length > 3 && dollars[1] !== '0' ) {
                newPrice = `${dollars}.${cents}`;
            } else if ( newPrice.length < 5 && cents[0] !== '0' ) {
                newPrice = `0.${cents}`;
            } else if ( newPrice.length < 5 && cents[1] !== '0' ) {
                newPrice = `0.${cents}`;
            } else {
                newPrice = `0.00`;
            }

            // The string is converted to a decimal number, so the zero at the beginning of the string is removed
            newPrice = `${parseFloat(newPrice,10).toFixed(2)}`;

            this.setState({ price: newPrice });
        }
    }

    addPoster = () => {
        const { name, description, price, postercategoryid, imageurl } = this.state;

        // The user must have input for these fields in order to add the poster
        if ( name && description && price && postercategoryid && imageurl) {
            axios.post('/api/poster', { 
                name, description, price, postercategoryid, imageurl 
            }).then( () => {
                axios.get(`/api/posters`).then( posters => {

                    this.setState({ 
                        posters: posters.data, 
                        name: '', 
                        description: '', 
                        price: '',
                        imageurl: '' 
                    });

                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    deletePoster = ( id ) => {
        axios.delete(`/api/poster/${id}/delete`).then( () => {
            axios.get(`/api/posters`).then( posters => {

                this.setState({ posters: posters.data });

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    editPoster = ( id, name, description, price, postercategoryid, imageurl ) => {
        axios.put(`/api/poster/${id}/edit`, { 
            name, description, price, postercategoryid, imageurl 
        }).then( () => {
            axios.get(`/api/posters`).then( posters => {

                this.setState({ posters: posters.data });

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        const { posters, name, description, price, category, imageurl } = this.state;
        const { productSubcategories } = this.props;

        // If there are subcategories, the first category ('All') is removed from the list
        const posterCategories = productSubcategories[2] && productSubcategories[2]
                                .map( (e, i) => i !== 0 ? <option key={ e.id } value={ e.id }>{ e.category }</option> : false )
                                .filter( e => e );

        // The list of posters
        const listOfPosters = posters.map( poster => {
            return <Poster key={poster.id} 
                           poster={poster}
                           posterCategories={posterCategories}
                           editPoster={this.editPoster}
                           deletePoster={this.deletePoster}/>
        });

        return (
            <div className="posters">
                <div className="container">
                    <h4>POSTERS</h4>

                    <div className="new-poster">
                        <div className="container">
                            <div>
                                <input className="input" value={ imageurl } placeholder="Image url" onChange={ (e) => this.handleChange('imageurl', e.target.value) }/>
                                <input className="input" value={ name } placeholder="Title" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                                <textarea className="input" row="1" value={ description } placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }></textarea>
                                <span className="price">
                                    $&nbsp;<input className="input" value={ price } placeholder="price" onChange={ (e) => this.handlePriceChange(e.target.value) }/>
                                </span>
                                <select value={ category } name="categories" onChange={ (e) => this.handleChange('postercategoryid', e.target.value) }>
                                    { posterCategories }
                                </select>
                                <button className="red-btn" onClick={ this.addPoster }>Save</button>
                            </div>
                        </div>
                    </div>

                    { posters.length
                    ? <ul className="posters-list">{ listOfPosters }</ul>
                    : <h5>No posters created</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posters );