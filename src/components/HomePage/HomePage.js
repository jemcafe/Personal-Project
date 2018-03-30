import React, { Component } from 'react';
import './Home.css';

import Header from '../Header/Header';
import ContentSlider from '../ContentSlider/ContentSlider';

class HomePage extends Component {
    render () {
        return (
            <div className="home-page">
                <Header match={this.props.match} history={this.props.history} />
                <div className="container panel">
                    {/* <h1>( Latest Content )</h1> */}
                    <ContentSlider 
                        images={[
                            'https://i.ytimg.com/vi/9dQTgndDbhc/maxresdefault.jpg',
                            'https://static.gamespot.com/uploads/scale_super/1552/15524586/3246448-066597.jpg',
                            'https://cdnb.artstation.com/p/assets/images/images/007/889/865/large/jem-brown-kisame-01-screenshot-smla.jpg?1509157762',
                            'http://img1.ak.crunchyroll.com/i/spire2/e405c8c17ef60eb2b1e1fe5f7e8b45b91491626797_full.jpg'
                        ]} />

                    <div className="info">
                        <div className="news" style={{flex: '1', boxSizing: 'border-box'}}>
                            <h3>Latest</h3>
                            <ul>
                                <li style={{display: 'flex', padding: '10px'}}>
                                    <img style={{maxHeight: '100px'}} src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gamerant.com%2Fwp-content%2Fuploads%2Ffinal-fantasy-15-first-40-minutes-gameplay.jpg.optimal.jpg&f=1" alt="pic"/>
                                    <p style={{padding: '0 10px', textAlign: 'left'}}>
                                        Ipsum donec eros a rutrum nisl elementum, maecenas id fusce wisi urna diam nunc. Montes parturient ornare eleifend vel.
                                    </p>
                                </li>
                                <li style={{display: 'flex', padding: '10px'}}>
                                    <img style={{maxHeight: '100px'}} src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gamerant.com%2Fwp-content%2Fuploads%2Ffinal-fantasy-15-first-40-minutes-gameplay.jpg.optimal.jpg&f=1" alt="pic"/>
                                    <p style={{padding: '0 10px', textAlign: 'left'}}>
                                        Ipsum donec eros a rutrum nisl elementum, maecenas id fusce wisi urna diam nunc. Montes parturient ornare eleifend vel.
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="news" style={{flex: '1', boxSizing: 'border-box'}}>
                            <h3>Exclusive</h3>
                            <ul>
                                <li style={{display: 'flex', padding: '10px'}}>
                                    <img style={{maxHeight: '100px'}} src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gamerant.com%2Fwp-content%2Fuploads%2Ffinal-fantasy-15-first-40-minutes-gameplay.jpg.optimal.jpg&f=1" alt="pic"/>
                                    <p style={{padding: '0 10px', textAlign: 'left'}}>
                                        Ipsum donec eros a rutrum nisl elementum, maecenas id fusce wisi urna diam nunc. Montes parturient ornare eleifend vel.
                                    </p>
                                </li>
                                <li style={{display: 'flex', padding: '10px'}}>
                                    <img style={{maxHeight: '100px'}} src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gamerant.com%2Fwp-content%2Fuploads%2Ffinal-fantasy-15-first-40-minutes-gameplay.jpg.optimal.jpg&f=1" alt="pic"/>
                                    <p style={{padding: '0 10px', textAlign: 'left'}}>
                                        Ipsum donec eros a rutrum nisl elementum, maecenas id fusce wisi urna diam nunc. Montes parturient ornare eleifend vel.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default HomePage;