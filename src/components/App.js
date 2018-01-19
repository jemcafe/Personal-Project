import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getUser } from '../redux/ducks/reducer';
import axios from 'axios';

import routes from '../router';

import MainHeader from './MainHeader/MainHeader';

class App extends Component {

    componentDidMount () {
        // Check if the user is logged in
        axios.get('/api/user').then( res => {
            console.log( res.data );
            this.props.getUser( res.data );
        }).catch( err => console.log(err) );
    }
    
    render() {
        return (
            <div className="App">

                <MainHeader />

                <main className="main">
                    <div className="main-container panel">

                        { routes }

                    </div>
                </main>
                
                <footer className="footer">
                    <div className="footer-container panel">

                        <div>&copy; 2018 My Site</div>

                    </div>
                </footer>

            </div>
        );
    }
}

// const mapStateToProps = ( state ) => {
//     return { user: state.user };
// };

const mapDispatchToProps = {
    getUser: getUser
};

export default connect( null , mapDispatchToProps, null, { pure: false } )( App );
