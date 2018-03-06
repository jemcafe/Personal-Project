import React, { Component } from 'react';
import './Poster.css';
import axios from 'axios';
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
        this.setState({ [property]: value });
    }

    toggleEdit = () => {
        this.setState(prevState => ({ editMode: !prevState.editMode }));
    }

    saveEdit = () => {
        const { name, description, price, postercategoryid, imageurl } = this.state
        
        axios.put(`/api/poster/${this.props.poster.id}/edit`, { 
            name, description, price, postercategoryid, imageurl 
        }).then( poster => {

            this.setState({
                name: poster.data[0].name,
                description: poster.data[0].description,
                price: poster.data[0].price,
                postercategoryid: poster.data[0].postercategoryId,
                imageurl: poster.data[0].imageurl,
            });

        }).catch(err => console.log(err));
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
                                <input className="input" defaultValue={ imageurl } placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                            </div>
                            <div>
                                <h4>Title</h4>
                                <input className="input" defaultValue={ name } placeholder="Title" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                            </div>
                            <div>
                                <h4>Description</h4>
                                <input className="input" defaultValue={ description } placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }/>
                            </div>
                            <div>
                                <h4>Price</h4>
                                <div className="price">
                                    $&nbsp;<input className="input" defaultValue={ price } placeholder="Price" onChange={ (e) => this.handleChange('price', e.target.value) }/>
                                </div>
                            </div>
                            <div>
                                <h4>Category</h4>
                                <select value={ postercategoryid } name="categories" onChange={ (e) => this.handleChange('postercategoryid', e.target.value) }>
                                    { posterCategories }
                                </select>
                            </div>
                            <button className="btn" onClick={ this.saveEdit }>Save</button>
                            <div className="close-icon" onClick={ this.toggleEdit }>
                                <i className="fas fa-times"></i>
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