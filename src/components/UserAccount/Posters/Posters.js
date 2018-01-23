import React, { Component } from 'react';
import axios from 'axios';

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
    }

    render () {
        const { posters } = this.state;

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

                    <ul className="posters-list">
                        { listOfPosters.length > 0 ? listOfPosters : <li>No posters created</li> }
                    </ul>

                    <div className="new-poster">
                        <div>New Poster</div>
                        <input placeholder="Name" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                        <input placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }/>
                        <input placeholder="Price" onChange={ (e) => this.handleChange('price', e.target.value) }/>
                        <input placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <select onChange={ (e) => this.handleChange('cateogry', e.target.value) }>
                            <option value={ 'Digital Art' }>Digital Art</option>
                            <option value={ 'Traditional Art' }>Traditional Art</option>
                            <option value={ 'Photography' }>Photography</option>
                        </select>
                    </div>

                </div>
            </div>
        )
    }
}

export default Posters;