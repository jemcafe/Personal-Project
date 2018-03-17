import React, { Component } from 'react';
import './PostersPage.css'

import Header from '../Header/Header';
import ContentSlider from '../ContentSlider/ContentSlider';

class PostersPage extends Component {
    render () {
        return (
            <div className="posters-page">
                <Header match={this.props.match} />
                <div className="container panel">
                    <h3>Posters</h3>

                    <ContentSlider 
                        images={[
                            'https://cdnb.artstation.com/p/assets/images/images/007/889/865/large/jem-brown-kisame-01-screenshot-smla.jpg?1509157762',
                            'https://cdna.artstation.com/p/assets/images/images/007/588/014/large/jem-brown-20170909-120941-edited-b-sml3b.jpg?1507148669',
                            'https://cdna.artstation.com/p/assets/images/images/007/291/402/large/jem-brown-garra-screenshot-03b-700x700.jpg?1505110523',
                            'https://i.pinimg.com/736x/24/d7/ec/24d7ec8bb462a9568a900a22ca57aba4--horses-beautiful-wild-pretty-horses.jpg'
                        ]}
                    />

                </div>
            </div>
        )
    }
}

export default PostersPage;