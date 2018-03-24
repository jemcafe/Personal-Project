import React, { Component } from 'react';
import './UserAccount.css';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../redux/ducks/reducer';

// Components
import Header from '../Header/Header';
import Posters from './Posters/Posters';
// import Following from './Follows/Following';
// import Followers from './Follows/Followers';
import Cart from './Cart/Cart';
import Settings from './Settings/Settings';

class UserAccount extends Component {

    componentDidMount () {
        axios.get(`/api/user`).then( user => {
            this.props.getUser( user.data );
            if ( !this.props.user.username ) {
                this.props.history.push('/login');
            }
        }).catch(err => console.log(err));
    }

    deleteAccount = () => {
        // delete account
        // axios.delete(`/api/delete-account`).then( res => {
        //     if ( res.status.response === 200 ) {
        //         this.props.history.push('/login');
        //     }
        // }).catch(err => console.log(err));
    }

    render () {
        return (
            <div className="useraccount">
                <Header match={this.props.match} />
                <div className="container panel">

                    <Switch>
                        <Route path={`/useraccount/posters`} component={ Posters } />
                        {/* <Route path={`/useraccount/following`} component={ Following } /> */}
                        {/* <Route path={`/useraccount/following`} component={ Followers } /> */}
                        <Route path={`/useraccount/cart`} component={ Cart } />
                        <Route path={`/useraccount/settings`} render={() => <Settings deleteAccount={this.deleteAccount} /> } />
                    </Switch>

                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    getUser: getUser
}
export default connect( mapStateToProps, mapDispatchToProps )( UserAccount );