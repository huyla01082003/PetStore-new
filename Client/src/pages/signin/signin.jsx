import React from "react";

import './signin.scss'

import signin_image from '../../assets/images/signin.png'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { handleLogin } from "../../services/userService";
import { changeLogginState, signin } from "../../redux/slices/userSlice";

import { withNavigation } from "../../utils/navigate";
import { connect } from "react-redux";

class SignIn extends React.Component {
    state = {
        style1: 'notfocus',
        style2: 'notfocus',
        email: '',
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

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
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

            let data = await handleLogin(this.state.email, this.state.password).then(res => {
                return res.data;
            });


            if (data && data.errCode == 0 && data.user.isAdmin == 0) {
                alert('Signin success');
                this.props.signin({
                    userId: data.user.id,
                    email: data.user.email,
                    fullname: data.user.fullname
                })
                this.props.changeLogginState(true);
                 this.props.navigate("/");

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
            <div className="signin_container">
                <div className="signin">
                    <img className="signin_image" src={signin_image}></img>
                    <div className="signin_content">
                        <img className="logo_signin" src={logo}></img>
                        <div className={`input_container ${style1}`}>
                            <input
                                placeholder="Email"
                                onBlur={() => this.changeNotFocus1()}
                                onMouseDown={() => this.changeFocus1()}
                                value={this.state.userSignin}
                                onChange={(event) => this.handleChangeEmail(event)}
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
                            <FontAwesomeIcon onClick={() => this.toggleShowPassword()} icon={this.state.showPassword ? faEyeSlash : faEye} style={{ color: "E7366B", cursor: "pointer" }} />
                        </div>
                        <div className="signin_button" onClick={(e) => this.handleSignin(e)}>
                            Sign In
                        </div>
                        <div className="other_title">
                            <span className="line"></span>
                            <span className="text">Or</span>
                        </div>
                        <span className="register_link_container">Don't have account ? <Link to="/register" className="register_link">Register</Link></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignIn));
