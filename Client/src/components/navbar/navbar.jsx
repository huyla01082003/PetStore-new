import React from "react";
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from "react-router-dom";
import './navbar.scss'
import { changeLogginState, signout } from "../../redux/slices/userSlice";
import { connect } from "react-redux";

import avatar from '../../assets/images/avatar.png'
import { store } from "../../redux/store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import Cart from "../cart/cart";


class Navbar extends React.Component {
    state = {
        cartStatus: false
    }
    handleLogout = () => {
        this.props.signout();
        this.props.changeLogginState(false);
        window.location.reload();
    }

    handleClickCart = () => {
        this.setState({
            cartStatus: !this.state.cartStatus
        })
    }
    render() {
        const { cartStatus } = this.state;
        return (
            <div className="navbar_container">
                <div className="navbar">
                    {
                        cartStatus === true &&
                        <div className="cart_container">
                            <Cart cartStatus={cartStatus} />
                        </div>
                    }
                    <Link to='/'><img className="logo" src={logo}></img></Link>
                    <div className="menu_container">
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/about'>About Us</NavLink>
                        <NavLink to='/shop'>Shop</NavLink>
                        <NavLink to='/blog'>Blog</NavLink>
                    </div>
                    {
                        !this.props.user
                            ? <Link to='/signin' className="signin_button">Sign In</Link>
                            :
                            <div className="signout_container">
                                <div className="nav_info_container">
                                    <img src={avatar} />
                                    <span>Hi, {this.props.user.fullname}</span>
                                </div>
                                {
                                    cartStatus === false
                                        ? <FontAwesomeIcon onClick={() => this.handleClickCart()} icon={faCartShopping} />
                                        : <FontAwesomeIcon onClick={() => this.handleClickCart()} icon={faXmark} />
                                }
                                <div className="signin_button" onClick={() => this.handleLogout()}>Sign Out</div>

                            </div>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: store.getState().userReducer.user
});

const mapDispatchToProps = {
    signout,
    changeLogginState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);