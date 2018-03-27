import React, { Component } from 'react';
import './Header.css';
import Aux from '../../hoc/Aux';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { logout, updateCartItems, getProductCategories } from '../../redux/ducks/reducer';
// Components
import SearchBar from './SearchBar/SearchBar';

class Header extends Component {
    constructor () {
        super();
        this.state = { 
            showMenu: false 
        }
    }

    componentDidMount () {
        // If a user is logged in, their cart data is requested
        if ( this.props.user.username ) {
            axios.get('/api/cart').then( cart => {
                this.props.updateCartItems( cart.data );
            }).catch(err => console.log(err));
        }
    }

    toggleMenu = () => {
        // Menu toggle control for the responsive header menu
        this.setState(prevState => ({ showMenu: !prevState.showMenu }));
    }

    logout = () => {
        // The session is ended and the cart is empty
        axios.post(`/api/logout`).then( user => {
            this.props.logout( user.data );
            this.props.updateCartItems( [] );
        }).catch(err => console.log(err));
    }

    render () {
        const { user, cartItems } = this.props;
        const { showMenu } = this.state;

        // The total of amount of items in the cart
        const cartQuantity = cartItems.reduce((acc, item) => acc += item.quantity, 0);
        
        return (
            <header className="main-header">
                {/* <div className="header-bkgd-overlay position"></div> */}
                <div className="container position">

                    <div className="header-1">
                        <Link to="/"><div className="title">Creation Basin</div></Link>
                        <SearchBar match={this.props.match} history={this.props.history}/>
                        <div className="nav">
                            <Link to="/" className="link">Home</Link>
                            <Link to="/games" className="link">Games</Link>
                            <Link to="/books" className="link">Books</Link>
                            <Link to="/posters" className="link">Posters</Link>
                            { // The signin and sign up links change if a user is logged in
                            !user.username ? (
                                <Aux>
                                    <Link to="/login" className="link">Sign in</Link>
                                    <Link to="/register" className="link">Sign up</Link>
                                </Aux>
                            ) : (
                                <div className="user-dropdown link">
                                    <Link to={`/${user.username}`} className="user-droplink">
                                        <div className="avatar" style={{background: `center / cover no-repeat url(${user.avatar})`}}></div>
                                        <div className="arrow-icon"><i className="fas fa-angle-down"></i></div>
                                    </Link>
                                    <div className="content">
                                        <div className="user-nav">
                                            <Link to={`/${user.username}`} className="link">My Profile</Link>
                                            <Link to={`/useraccount/posters`} className="link">My Posters</Link>
                                            <Link to={`/useraccount/cart`} className="link">Cart ({ cartQuantity })</Link>
                                            <Link to={`/useraccount/settings`} className="link">Settings</Link>
                                            <Link to="/login" className="link" onClick={ this.logout }>
                                                <FaSignOut className="fa-sign-out" size={20} color="#b1a4b3" /> Signout
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </div>
                    </div>

                    <div className="header-2">
                        <Link to="/"><div className="title">Creation Basin</div></Link>
                        <div className="nav-dropdown">
                            { !showMenu ? (
                            <div className="menu-icon nav-droplink" onClick={ this.toggleMenu }><i className="fas fa-bars"></i></div>
                            ) : (
                            <Aux> 
                                <div className="menu-icon nav-droplink" onClick={ this.toggleMenu }><i className="fas fa-times"></i></div>
                                <div className="content">
                                    <SearchBar match={this.props.match} history={this.props.history} toggleMenu={this.toggleMenu} />
                                    <div className="nav">
                                        <Link to="/" className="link" onClick={ this.toggleMenu }>Home</Link>
                                        <Link to="/games" className="link" onClick={ this.toggleMenu }>Games</Link>
                                        <Link to="/books" className="link" onClick={ this.toggleMenu }>Books</Link>
                                        <Link to="/posters" className="link" onClick={ this.toggleMenu }>Posters</Link>
                                        { // The links change if a user is logged in 
                                        !user.username ? (
                                            <Aux>
                                                <Link to="/login" className="link" onClick={ this.toggleMenu }>Sign in</Link>
                                                <Link to="/register" className="link" onClick={ this.toggleMenu }>Sign up</Link>
                                            </Aux>
                                        ) : (
                                            <Aux>
                                                <Link to={`/${user.username}`} className="link">My Profile</Link>
                                                <Link to={`/useraccount/posters`} className="link" onClick={ this.toggleMenu }>My Posters</Link>
                                                <Link to={`/useraccount/cart`} className="link" onClick={ this.toggleMenu }>Cart ({ cartQuantity })</Link>
                                                <Link to={`/useraccount/settings`} className="link" onClick={ this.toggleMenu }>Settings</Link>
                                                <Link to="/login" className="link" onClick={ this.logout }>
                                                    <FaSignOut className="fa-sign-out" size={20} color="#b1a4b3" /> Signout
                                                </Link>
                                            </Aux>
                                        ) }
                                    </div>
                                </div>
                                <div className="menu-underlay" onClick={ this.toggleMenu }></div>
                            </Aux> 
                            ) }
                        </div>
                    </div>

                </div>
            </header>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        cartItems: state.cartItems,
    };
};

const mapDispatchToProps = {
    logout: logout,
    updateCartItems: updateCartItems,
    getProductCategories: getProductCategories
};

export default connect( mapStateToProps , mapDispatchToProps )( Header );