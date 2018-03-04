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
            price: '',
            category: 'Digital Art',
            imageurl: ''
        }
        // Methods do not need to be binded if they are function expressions ( React 2016 )    
    }

    componentDidMount () {
        axios.get(`/api/posters/${this.props.user.id}`).then( posters => {
            console.log('Posters', posters.data);
            this.setState({ posters: posters.data });
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    addPoster = () => {
        const { name, description, price, category, imageurl } = this.state;
        axios.post('/api/new-poster', { name, description, price, category, imageurl }).then( res => {
            axios.get(`/api/posters/${this.props.user.id}`).then( posters => {

                this.setState({ 
                    posters: posters.data, 
                    name: '', 
                    description: '', 
                    price: '', 
                    imageurl: '' 
                });

            }).catch( err => console.log(err) );
        }).catch( err => console.log( err ) );
    }

    deletePoster = ( id ) => {
        axios.delete(`/api/delete-poster/${ id }`).then( () => {
            axios.get(`/api/posters/${this.props.user.id}`).then( posters => {

                this.setState({ 
                    posters: posters.data, 
                    name: '', 
                    description: '', 
                    price: '', 
                    imageurl: '' 
                });

            }).catch( err => console.log(err) );
        }).catch( err => console.log( err ) );
    }

    render () {
        const { posters, name, description, price, category, imageurl } = this.state;
        const { productSubcategories } = this.props;

        // The first category ('All') is removed from the list of poster categories
        const posterCategories = productSubcategories[2]
                           .map( (e, i) => i !== 0 ? <option key={ i } value={ e.id }>{ e.category }</option> : false )
                           .filter( e => e );

        // The list of posters
        const listOfPosters = posters.map( poster => {
            return <Poster key={poster.id} 
                           poster={poster}
                           posterCategories={posterCategories}
                           deletePoster={this.deletePoster}/>
        });

        return (
            <div className="posters">
                <div className="posters-container">
                    <h4>POSTERS</h4>

                    <div className="new-poster">
                        <div className="new-poster-container">
                            <input className="input" value={ imageurl } placeholder="Url" onChange={ (e) => this.handleChange('imageurl', e.target.value) }/>
                            <input className="input" value={ name } placeholder="Title" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                            <input className="input" value={ description } placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }/>
                            <input className="input" value={ price } placeholder="Price" onChange={ (e) => this.handleChange('price', e.target.value) }/>
                            <select value={ category } name="categories" onChange={ (e) => this.handleChange("category", e.target.value) }>
                                { posterCategories }
                            </select>
                            <button className="btn" onClick={ this.addPoster }>Save</button>
                        </div>
                    </div>

                    { posters
                    ? <ul className="posters-list">{ listOfPosters }</ul>
                    : <h5>No posters created</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posters );