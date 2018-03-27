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

                    <div className="thumbnail" onClick={this.toggleCloseUp} style={{background: `center / cover no-repeat url(${poster.image_url})`}}>
                        <div className="overlay overlay-fade">
                            <div className="poster-name">{ poster.name }</div>
                        </div>
                    </div>

                    { isBigger &&
                    <div className="close-up">
                        <div className="overlay" onClick={this.toggleCloseUp}></div>
                        <div className="image">
                            <div className="close-icon">
                                <i className="fas fa-times" onClick={this.toggleCloseUp} style={{cursor: 'pointer'}}></i>
                            </div>
                            <img src={ poster.image_url } alt={ poster.name }/>
                        </div>
                    </div> }
                    
                </div>
            </li>
        )
    }
}

export default Poster;