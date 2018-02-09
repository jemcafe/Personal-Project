import React, { Component } from 'react';
import './Posters.css';
import axios from 'axios';

import { connect } from 'react-redux';

class Posters extends Component {
    constructor () {
        super();
        this.state = {
            posters: []
        }
    }

    componentDidMount () {
        axios.get(`/api/posters/${this.props.profileUser.id}`).then( res => {
            this.setState({ posters: res.data });
        }).catch( err => console.log(err) );
    }

    render () {
        const { posters} = this.state;

        const listOfPosters = posters.map( poster => {
            return <li key={ poster.id }>
                        <div className="poster">

                            <div className="thumbnail">
                                <div className="highlight fade">
                                    <div className="poster-name">{ poster.name }</div>
                                </div>
                                <img src={ poster.imageurl } alt={ poster.name }/>
                            </div>
                            
                        </div>
                    </li>
        });

        return (
            <div className="posters">
                <div className="posters-container">
                    {/* <h4>POSTERS</h4> */}

                    { listOfPosters.length > 0 ? 
                    <ul className="posters-list">{ listOfPosters }</ul> : 
                    <h5>No posters created</h5> }

                </div>
            </div>
        )
    }
}

export default connect( state => state )( Posters );