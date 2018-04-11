import React from 'react';
import './PageNotFound.css';
// Components
// import Header from '../Header/Header';

function PageNotFound (props) {
    return (
        <div className="page-not-found">
            {/* <Header match={props.match} history={props.history} /> */}
            <div className="container">

                <h1 style={{fontWeight:'normal',letterSpacing:'1px',wordSpacing:'2px',color: '#7b727c'}}>
                    WHERE ARE YOU?
                </h1>

            </div>
        </div>
    )
}

export default PageNotFound;