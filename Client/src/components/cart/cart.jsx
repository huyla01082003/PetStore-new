import React from "react";
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from "react-router-dom";
import './cart.scss'
import { changeLogginState, signout } from "../../redux/slices/userSlice";
import { connect } from "react-redux";

import avatar from '../../assets/images/avatar.png'
import { store } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteCart, getAllCart } from "../../services/cartService";
import { withNavigation } from "../../utils/navigate";


class Cart extends React.Component {
    state = {
        total: 0,
        listCart: [],
        isDisable: false
    }

    componentDidMount() {
        this.setState({
            cartStatus: true
        })
    }

    componentWillUnmount() {
        this.setState({
            cartStatus: false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cartStatus !== this.state.cartStatus) {
            this.fetchCart(this.props.user.userId);
        }
    }

    fetchCart = async (userId) => {
        try {
            let cartData = await getAllCart(userId).then(res => {
                return res.data.carts
            });
            let total = 0;
            Object.keys(cartData).forEach(id => {
                total += cartData[id].Product.price
            });

            if (cartData.length === 0) {
                this.setState({
                    isDisable: true
                })
            } else {
                this.setState({
                    isDisable: false
                })
            }

            this.setState({
                listCart: cartData ? cartData : [],
                total: total
            })
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteCart = async (userId, productId) => {
        try {
            await deleteCart(userId, productId);
            this.fetchCart(userId);
        } catch (e) {
            console.log(e)
        }
    }

    handleCheckout = () => {
        this.props.navigate('/checkout')
    }

    render() {
        const { total, listCart, isDisable } = this.state;
        console.log(isDisable)
        return (
            <div className="cart">
                <div className='cart_content'>
                    <h1>Cart</h1>
                    <div className='cart_product_container'>
                        {
                            listCart.map((item, index) => {
                                return (
                                    <div className='cart_product_item' key={item.id}>
                                        <img src={item.Product.image} alt="" />
                                        <div className='cart_product_info'>
                                            <span className='cart_product_title'>{item.Product.name}</span>
                                            {
                                                item.Product.price === 0
                                                    ?
                                                    <span className='cart_product_price'>Free</span>
                                                    :
                                                    <span className='cart_product_price'>{item.Product.price} VND</span>
                                            }
                                        </div>
                                        <FontAwesomeIcon onClick={() => this.handleDeleteCart(this.props.user.userId, item.Product.id)} icon={faTrashCan} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='button_checkout_container'>
                        <span>Total: <span className='total-text'>{total} VND</span> </span>
                        <button onClick={() => this.handleCheckout()} disabled={isDisable}>Checkout</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Cart));