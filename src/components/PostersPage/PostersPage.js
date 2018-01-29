import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContentSlider from '../ContentSlider/ContentSlider';
import ItemPage from '../ItemPage/ItemPage';

class PostersPage extends Component {

    render () {
        return (
            <div className="posters-page">
                <div className="posters-page-container">
                    <h3>Posters</h3>

                    {/* <Route exact path="/games" render={ () => {
                        return <ContentSlider 
                                    images={ ['https://static.gamespot.com/uploads/scale_super/1552/15524586/3246448-066597.jpg',
                                                'https://img.youtube.com/vi/hRWoz5c_GFo/maxresdefault.jpg',
                                                'https://www.zelda.com/breath-of-the-wild/assets/icons/BOTW-Share_icon.jpg',
                                                'https://cdn4.dualshockers.com/wp-content/uploads/2018/01/MonsterHunterWorld-5-1.jpg'] } /> 
                    } } /> */}

                    <Route exact path="/posters/:name" component={ ItemPage } />

                </div>
            </div>
        )
    }
}

export default PostersPage;