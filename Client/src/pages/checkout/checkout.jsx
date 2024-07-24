import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';

import './checkout.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNavigation } from '../../utils/navigate';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import { deleteAllCart, getAllCart } from '../../services/cartService';
import { createOrder } from '../../services/orderService';
import { createOrderDetail } from '../../services/orderDetailService';


class Checkout extends Component {
    state = {
        cardNumber: '',
        expiration: '',
        cvv: '',
        total: 0,
        listCart: []
    }

    componentDidMount() {
        this.fetchCart(this.props.user.userId)
    }

    handleCardNumberChange = (event) => {
        this.setState({
            cardNumber: event.target.value
        })
    }

    handleExpirationrChange = (event) => {
        this.setState({
            expiration: event.target.value
        })
    }

    handleCvvChange = (event) => {
        this.setState({
            cvv: event.target.value
        })
    }

    handleSubmit = async (e, userId, total) => {
        e.preventDefault();
        const order = await createOrder(userId, total);
        const { listCart } = this.state;
        Object.keys(listCart).forEach(id => {
            this.addOrderDetail(order.data.order.id, listCart[id].Product.id)
        });
        alert(`Check out success. Your credit card number is ${this.state.cardNumber} with ${this.state.total} VND`);
        this.deleteCart();
        this.props.navigate('/');
        window.location.reload();

    };

    deleteCart = async () => {
        try {
            await deleteAllCart(this.props.user.userId);
        } catch (e) {
            alert(e.response.data.error);
        }
    };

    addOrderDetail = async (orderId, productId) => {
        try {
            await createOrderDetail(orderId, productId);
        } catch (e) {
            console.log(e);
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

            this.setState({
                listCart: cartData ? cartData : [],
                total: total
            })
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        const { cardNumber, expiration, cvv, total, listCart } = this.state;
        return (
            <div className="checkout">
                <Navbar />
                <div className="checkout_container">
                    <div className="order_summary">
                        <h2>Order Summary</h2>
                        <div className='order_item_container'>
                            {
                                listCart.map(item => (
                                    <div className="order_item" key={item.id}>
                                        <img src={item.Product.image} />
                                        <div>
                                            <p>{item.Product.name}</p>
                                            <p>{item.Product.price} VND</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="order_total">
                            <p>Total:</p>
                            <p>{total} VND</p>
                        </div>
                    </div>
                    <div className="payment_method">
                        <h2>Payment Method</h2>
                        <div className="credit_card_details">
                            <h3>Credit Card</h3>
                            <form onSubmit={(e) => this.handleSubmit(e, this.props.user.userId, total)}>
                                <div className="form_group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => this.handleCardNumberChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form_group">
                                    <label>Expiration Date</label>
                                    <input
                                        type="text"
                                        value={expiration}
                                        onChange={(e) => this.handleExpirationrChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form_group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        value={cvv}
                                        onChange={(e) => this.handleCvvChange(e)}
                                        required
                                    />
                                </div>
                                <p className="terms_text">
                                    By clicking "Place Order" below, I represent that I am over 18 and an authorized user of this payment method, I agree to the <a href="#">End User License Agreement</a>.
                                </p>
                                <button type="submit" className="btn_place_order">Place Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    user: store.getState().userReducer.user
});

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Checkout));
