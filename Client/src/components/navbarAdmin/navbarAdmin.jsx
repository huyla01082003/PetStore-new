import React from "react";
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from "react-router-dom";
import './navbarAdmin.scss'
import { changeLogginState, signout } from "../../redux/slices/adminSlice";
import { connect } from "react-redux";

import avatar from '../../assets/images/avatar.png'
import { store } from "../../redux/store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPieChart, faBarsProgress, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import Cart from "../cart/cart";


class NavbarAdmin extends React.Component {
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
            <div className="navbar_admin_container">
                <img className="logo" src={logo}></img>
                <div className="menu_container">
                    <span>Menu</span>
                    <NavLink to="/admin/dashboard" className="menu_item">
                        <FontAwesomeIcon icon={faPieChart} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/product" className="menu_item">
                        <FontAwesomeIcon icon={faBarsProgress} />
                        Product management
                    </NavLink>
                    <NavLink to="/admin/order" className="menu_item">
                        <FontAwesomeIcon icon={faClipboard} />
                        Order management
                    </NavLink>
                    <div className="menu_item" onClick={() => this.handleLogout()}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Đăng xuất
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: store.getState().userReducer.user,
    admin: store.getState().adminReducer.admin
});

const mapDispatchToProps = {
    signout,
    changeLogginState,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarAdmin);