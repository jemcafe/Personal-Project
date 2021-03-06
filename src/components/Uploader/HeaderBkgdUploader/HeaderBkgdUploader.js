import React, { Component } from 'react';
import './HeaderBkgdUploader.css'
import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';

class HeaderBkgdUploader extends Component {
    constructor () {
        super();
        this.state = { 
            files: []
         }
    }

    onDrop = (files) => {
        this.setState({ files });
    }

    render () {
        return (
            <div className="header-bkgd-uploader">
                <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
                    {/* <div className="plus-icon"><i className="fas fa-plus"></i></div>&nbsp; */}
                    Change header background
                </Dropzone>
                <h4>Dropped Files</h4>
                <ul>{ this.state.files.map(e => <li>{e.name} - {e.size} bytes</li>) }</ul>
            </div>
        )
    }
}

export default connect( state => state )( HeaderBkgdUploader );