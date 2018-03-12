import React, { Component } from 'react';
import './Poster.css';
import { connect } from 'react-redux';

class Poster extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: this.props.poster.name,
            description: this.props.poster.description,
            price: this.props.poster.price,
            postercategoryid: this.props.poster.postercategoryid,
            imageurl: this.props.poster.imageurl,
            editMode: false
        }
    }

    handleChange ( property, value ) {
        if ( property === 'price' && value.length < 8 ) {
            console.log( 'Price', value.length, value );
            this.setState({ [property]: value });
        } else if ( property !== 'price' ) {
            this.setState({ [property]: value });
        }
    }

    toggleEdit = () => {
        this.setState(prevState => ({ editMode: !prevState.editMode }));
    }

    saveEdit = () => {
        const { name, description, price, postercategoryid, imageurl } = this.state;
        this.props.editPoster(this.props.poster.id, name, description, price, postercategoryid, imageurl);
        this.toggleEdit();
    }

    render () {
        const { name, description, price, postercategoryid, imageurl, editMode } = this.state;
        const { poster, posterCategories, deletePoster } = this.props;
        
        return (
            <li className="poster">

                { editMode &&
                <div className="edit-overlay">
                    <div className="edit">
                        <div className="container">
                            <img src={ imageurl } alt="Poster"/>
                            <div>
                                <h4>Image</h4>
                                <input className="input" value={ imageurl } placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
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
                                    $&nbsp;<input className="input" value={ price } placeholder="Price" onChange={ (e) => this.handleChange('price', e.target.value) }/>&nbsp;.99
                                </div>
                            </div>
                            <div>
                                <h4>Category</h4>
                                <select value={ postercategoryid } name="categories" onChange={ (e) => this.handleChange('postercategoryid', e.target.value) }>
                                    { posterCategories }
                                </select>
                            </div>
                            <div className="btns">
                                <button className="btn gray-btn" onClick={ this.toggleEdit }>Close</button>
                                <button className="btn" onClick={ this.saveEdit }>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                }

                <div className="thumbnail">
                    <div className="overlay fade">
                        <div className="poster-name">{ poster.name }</div>
                        <button className="btn" onClick={ this.toggleEdit }>Edit</button>
                        <div className="trash-icon" onClick={ () => deletePoster(poster.id) }><i className="fas fa-trash"></i></div>
                    </div>
                    <img src={ poster.imageurl } alt={ poster.name }/>
                </div>
                        
            </li>
        )
    }
}

export default connect(state => state)(Poster);