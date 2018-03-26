import React, { Component } from 'react';
import './GamesPage.css';

import Header from '../Header/Header';
import ContentSlider from '../ContentSlider/ContentSlider';

class GamesPage extends Component {
    render () {
        return (
            <div className="games-page">
                <Header match={this.props.match} history={this.props.history} />
                <div className="container panel">
                    <h3>Games</h3>

                    <ContentSlider 
                        images={[
                            'https://static.gamespot.com/uploads/scale_super/1552/15524586/3246448-066597.jpg',
                            'https://img.youtube.com/vi/hRWoz5c_GFo/maxresdefault.jpg',
                            'https://www.zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg',
                            'https://cdn4.dualshockers.com/wp-content/uploads/2018/01/MonsterHunterWorld-5-1.jpg'
                        ]} />

                </div>
            </div>
        )
    }
}

export default GamesPage;