import React from "react";

import './adminLogin.scss'

import admin_image from '../../assets/images/admin_background.png'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { handleAdminLogin, handleLogin } from "../../services/userService";
import { changeLogginState, signin } from "../../redux/slices/adminSlice";

import { withNavigation } from "../../utils/navigate";
import { connect } from "react-redux";

class AdminLogin extends React.Component {
    state = {
        style1: 'notfocus',
        style2: 'notfocus',
        adminLogin: '',
        password: '',
        showPassword: false
    }
    changeFocus1 = () => {
        this.setState({
            style1: 'focus1'
        })
    }

    changeFocus2 = () => {
        this.setState({
            style2: 'focus2'
        })
    }


    changeNotFocus1 = () => {
        this.setState({
            style1: 'notfocus',
        })
    }

    changeNotFocus2 = () => {
        this.setState({
            style2: 'notfocus'
        })
    }

    handleChangeadminLogin = (event) => {
        this.setState({
            adminLogin: event.target.value
        })
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSignin = async (e) => {
        e.preventDefault();
        try {

            let data = await handleAdminLogin(this.state.adminLogin, this.state.password).then(res => {
                return res.data;
            });

            if (data && data.errCode == 0) {
                alert('Signin success');
                this.props.signin({
                    adminId: data.admin.id,
                    adminLogin: data.admin.adminLogin,
                })
                this.props.changeLogginState(true);
                this.props.navigate("/admin/dashboard");

            }
            else if (data && data.errCode !== 0) {
                alert(data.message);
            }
            else if (data.user.isAdmin !== 0) {
                alert('This is admin account');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    alert(e.response.data.message);
                }
            }
        }
    }

    toggleShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    }

    render() {
        let { style1, style2 } = this.state;
        return (
            <div className="adminLogin_container">
                <div className="adminLogin">
                    <img className="adminLogin_image" src={admin_image}></img>
                    <div className="adminLogin_content">
                        <img className="logo_adminLogin" src={logo}></img>
                        <div className={`input_container ${style1}`}>
                            <input
                                placeholder="Admin Account"
                                onBlur={() => this.changeNotFocus1()}
                                onMouseDown={() => this.changeFocus1()}
                                value={this.state.userSignin}
                                onChange={(event) => this.handleChangeadminLogin(event)}
                            />
                        </div>
                        <div className={`input_container ${style2}`}>
                            <input
                                placeholder="Password"
                                onBlur={() => this.changeNotFocus2()}
                                onMouseDown={() => this.changeFocus2()}
                                value={this.state.password}
                                onChange={(event) => this.handleChangePassword(event)}
                                type={this.state.showPassword ? "text" : "password"}
                            />
                            <FontAwesomeIcon onClick={() => this.toggleShowPassword()} icon={this.state.showPassword ? faEyeSlash : faEye} style={{ color: "black", cursor: "pointer" }} />
                        </div>
                        <div className="adminLogin_button" onClick={(e) => this.handleSignin(e)}>
                            Sign In
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    signin,
    changeLogginState
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AdminLogin));
