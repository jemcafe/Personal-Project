import React, { Component } from 'react';
import './Poster.css';
import { connect } from 'react-redux';

class Poster extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: props.poster.name,
            description: props.poster.description,
            price: props.poster.price,
            poster_category_id: props.poster.poster_category_id,
            image_url: props.poster.image_url,
            editMode: false
        }
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

    toggleEdit = () => {
        const { name, description, price, poster_category_id, image_url } = this.props.poster;
        this.setState(prevState => ({
            name,
            description,
            price,
            poster_category_id,
            image_url,
            editMode: !prevState.editMode 
        }));
    }

    saveEdit = () => {
        const { name, description, price, poster_category_id, image_url } = this.state;
        const { editPoster, poster } = this.props;
        editPoster(poster.id, name, description, price, poster_category_id, image_url);
        this.toggleEdit();
    }

    render () {
        const { name, description, price, poster_category_id, image_url, editMode } = this.state;
        const { poster, posterCategories, deletePoster } = this.props;
        
        return (
            <li className="poster">

                { editMode &&
                <div className="edit-overlay">
                    <div className="edit">
                        <div className="container">
                            <img src={ poster.image_url } alt="Poster"/>
                            <div>
                                <h4>Image</h4>
                                <input className="input" value={ image_url } placeholder="Image (url)" onChange={ (e) => this.handleChange('image_url', e.target.value) }/>
                            </div>
                            <div>
                                <h4>Title</h4>
                                <input className="input" value={ name } placeholder="Title" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                            </div>
                            <div>
                                <h4>Description</h4>
                                <textarea className="input" rows="5" value={ description } placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }></textarea>
                            </div>
                            <div>
                                <h4>Price</h4>
                                <div className="price">
                                    $&nbsp;<input className="input" value={ price } placeholder="Price" onChange={ (e) => this.handlePriceChange(e.target.value) }/>
                                </div>
                            </div>
                            <div>
                                <h4>Category</h4>
                                <select value={ poster_category_id } name="categories" onChange={ (e) => this.handleChange('poster_category_id', e.target.value) }>
                                    { posterCategories }
                                </select>
                            </div>
                            <div className="btns">
                                <button className="gray-btn" onClick={ this.toggleEdit }>Close</button>
                                <button className="red-btn" onClick={ this.saveEdit }>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                }

                <div className="thumbnail" style={{background: `center / cover no-repeat url(${poster.image_url})`}}>
                    <div className="overlay overlay-fade">
                        <div className="poster-name">
                            { poster.name.length > 36 ? `${poster.name.slice(0,36).trim()}...` : poster.name }
                        </div>
                        <button className="red-btn" onClick={ this.toggleEdit }>Edit</button>
                        <div className="trash-icon" onClick={ () => deletePoster(poster.id) }><i className="fas fa-trash"></i></div>
                    </div>
                </div>
                        
            </li>
        )
    }
}

export default connect(state => state)(Poster);