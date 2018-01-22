import React, { Component } from 'react';

class Posters extends Component {
    constructor () {
        super();
        this.state = {
            userInput: '',
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    render () {
        return (
            <div className="posters">
                <div className="posters-container">
                    <div>POSTERS</div>
                    
                    <div className="new-poster">
                        <div>New Poster</div>
                        <input placeholder="Name" onChange={ (e) => this.handleChange('name', e.target.value) }/>
                        <input placeholder="Description" onChange={ (e) => this.handleChange('description', e.target.value) }/>
                        <input placeholder="Price" onChange={ (e) => this.handleChange('price', e.target.value) }/>
                        <input placeholder="Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <select>
                            <option>Digital Art</option>
                            <option>Traditional Art</option>
                            <option>Photography</option>
                        </select>
                    </div>

                    <ul className="posters-list">

                    </ul>

                </div>
            </div>
        )
    }
}

export default Posters;