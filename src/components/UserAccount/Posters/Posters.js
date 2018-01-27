import React, { Component } from 'react';
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
            category: '',
            image: '',
        }
    }

    componentDidMount () {
        axios.get('/api/posters').then( res => {
            console.log( res.data );
            this.setState({ posters: res.data });
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
        console.log( this.state.category );
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
            console.log( res.data );

            axios.get('/api/posters').then( resp => {
                this.setState({ posters: resp.data, name: '', description: '', price: '', image: '' });
            }).catch( err => console.log(err) );

        }).catch( err => console.log( err ) );
    }

    deletePoster ( id ) {
        axios.delete(`/api/delete-poster/${ id }`).then( res => {
            console.log( res.data );

            axios.get('/api/posts').then( resp => {
                this.setState({ posts: resp.data });
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }

    render () {
        const { posters, name, description, price, category, image } = this.state;

        const categories = this.props.productSubcategories[2].map( (e, i) => {
            return i !== 0 ? <option key={ i } value={ e }>{ e }</option> : false;
        }).filter( (e, i) => i !== 0 );

        const listOfPosters = posters.map( poster => {
            return (
                <li key={ poster.id }>
                    <div className="poster">
                        {/* <div>{ poster.name }</div>
                        <div>{ poster.description }</div>
                        <div>{ poster.price }</div>
                        <div>{ poster.productcategory }</div>
                        <div>{ poster.dateposted }</div> */}
                        <div className="thumbnail">
                            <img src={ poster.imageurl } alt={ poster.name }/>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div className="posters">
                <div className="posters-container">
                    {/* <div>POSTERS</div> */}

                    <div className="new-poster">
                        <div>New Poster</div>
                        <input placeholder="Name" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                        <input placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }/>
                        <input placeholder="Price" onChange={ (e) => this.handleChange('price', e.target.value) }/>
                        <input placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <select name="categories" onChange={ (e) => this.handleChange("category", e.target.value) }>
                            { categories }
                        </select>
                        <button className="btn" onClick={ () => this.addPoster(name, description, price, category, image) }>Save</button>
                    </div>

                    <ul className="posters-list">
                        { listOfPosters.length > 0 ? listOfPosters : <li>No posters created</li> }
                    </ul>

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posters );