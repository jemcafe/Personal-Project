import React, { Component } from 'react';
import './Posters.css';
import FaTrash from 'react-icons/lib/fa/trash';
import axios from 'axios';

import { connect } from 'react-redux';

class Posters extends Component {
    constructor () {
        super();
        this.state = {
            posters: [],
            name: '',
            description: '',
            price: '',
            category: 'Digital Art',
            image: '',
        }
    }

    componentDidMount () {
        const { user, otherUser } = this.props;

        axios.get(`/api/posters/${otherUser.id || user.id}`).then( res => {
            this.setState({ posters: res.data });
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    addPoster ( name, description, price, category, image ) {
        const body = {
            name: name,
            description: description,
            price: price,
            cateogry: category,
            image: image
        };

        axios.post('/api/new-poster', body).then( res => {

            axios.get(`/api/posters/${this.props.user.id}`).then( resp => {
                this.setState({ posters: resp.data, name: '', description: '', price: '', image: '' });
            }).catch( err => console.log(err) );

        }).catch( err => console.log( err ) );
    }

    deletePoster ( id ) {
        axios.delete(`/api/delete-poster/${ id }`).then( res => {

            axios.get(`/api/posters/${this.props.user.id}`).then( resp => {
                this.setState({ posters: resp.data, name: '', description: '', price: '', image: '' });
            }).catch( err => console.log(err) );

        }).catch( err => console.log( err ) );
    }

    render () {
        const { posters, name, description, price, category, image } = this.state;
        const { user, otherUser, paramsUsername, productSubcategories } = this.props;

        // The first category ('All') is removed from the list
        const categories = productSubcategories.length && productSubcategories[2].map( (e, i) => i !== 0 ? <option key={ i } value={ e }>{ e }</option> : false ).filter( e => e );

        const listOfPosters = posters.map( poster => {
            return (
                <li key={ poster.id }>
                    <div className="poster">

                        <div className="thumbnail">
                            { user.username === paramsUsername &&
                            <div className="edit fade">
                                <div className="poster-name">{ poster.name }</div>
                                <button className="edit-btn btn">Edit</button>
                                {/* <button className="btn" onClick={ () => this.deletePoster(poster.id) }>Delete</button> */}
                                <FaTrash className="fa-trash" onClick={ () => this.deletePoster(poster.id) } size={25} color="lightgrey" />
                            </div>
                            }
                            <img src={ poster.imageurl } alt={ poster.name }/>
                        </div>
                        
                    </div>
                </li>
            );
        });

        return (
            <div className="posters">
                <div className="posters-container">
                    <h4>POSTERS</h4>

                    { user.username === paramsUsername &&
                    <div className="new-poster">
                        <div className="new-poster-container">
                            {/* <div>New Poster</div> */}
                            <input className="input" value={ name } placeholder="Name" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                            <input className="input" value={ description } placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }/>
                            <input className="input" value={ price } placeholder="Price" onChange={ (e) => this.handleChange('price', e.target.value) }/>
                            <input className="input" value={ image } placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                            <select value={ category } name="categories" onChange={ (e) => this.handleChange("category", e.target.value) }>
                                { categories }
                            </select>
                            <button className="btn" onClick={ () => this.addPoster(name, description, price, category, image) }>Save</button>
                        </div>
                    </div>
                    }

                    { listOfPosters.length > 0 ? <ul className="posters-list">{ listOfPosters }</ul> : <h5>No posters created</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posters );