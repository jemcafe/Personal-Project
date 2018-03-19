import React, { Component } from 'react';
import './Poster.css';

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
        const { isBigger } = this.state;
        const { poster } = this.props;

        return (
            <li key={ poster.id }>
                <div className="poster">

                    <div className="thumbnail" onClick={this.toggleCloseUp}>
                        <div className="overlay overlay-fade">
                            <div className="poster-name">{ poster.name }</div>
                        </div>
                        <img src={ poster.imageurl } alt={ poster.name }/>
                    </div>

                    { isBigger &&
                    <div className="close-up">
                        <div className="overlay" onClick={this.toggleCloseUp}></div>
                        <img src={ poster.imageurl } alt={ poster.name }/>
                    </div> }
                    
                </div>
            </li>
        )
    }
}

export default Poster;