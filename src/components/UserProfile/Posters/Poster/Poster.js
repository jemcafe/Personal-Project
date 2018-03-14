import React, { Component } from 'react';
import './Poster.css';
import axios from 'axios';

import { connect } from 'react-redux';

class Poster extends Component {
    constructor () {
        super();
        this.state = {
            isBigger: false
        }
    }

    toggleCloseUp = () => {
        this.setState(prevState => ({ isBigger: !prevState.isBigger }));
    }

    render () {
        const { poster } = this.props;
        console.log( 'Image is bigger', this.state.isBigger );

        return (
            <li key={ poster.id }>
                <div className="poster">

                    <div className="thumbnail" onClick={this.toggleCloseUp}>
                        <div className="highlight overlay-fade">
                            <div className="poster-name">{ poster.name }</div>
                        </div>
                        <img src={ poster.imageurl } alt={ poster.name }/>
                    </div>

                    { this.state.isBigger &&
                    <div className="close-up">
                        <div className="overlay" onClick={this.toggleCloseUp}></div>
                        <img src={ poster.imageurl } alt={ poster.name }/>
                    </div>
                    }
                    
                </div>
            </li>
        )
    }
}

export default Poster;