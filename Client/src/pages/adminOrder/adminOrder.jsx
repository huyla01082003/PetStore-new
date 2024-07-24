import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';

import './adminOrder.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNavigation } from '../../utils/navigate';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import { deleteAllCart, getAllCart } from '../../services/cartService';
import { createOrder, getAllOrder } from '../../services/orderService';
import { createOrderDetail } from '../../services/orderDetailService';
import NavbarAdmin from '../../components/navbarAdmin/navbarAdmin';


class AdminOrder extends Component {
    state = {
        listOrder: []
    }

    componentDidMount() {
        this.fetchOrder();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.admin !== this.props.admin) {
            if (this.props.admin === null) {
                this.props.navigate('/admin', { replace: true });
                console.log('aa')
            }
        }
    }


    fetchOrder = async () => {
        try {
            let orderData = await getAllOrder().then(res => {
                return res.data.orders
            });
            this.setState({
                listOrder: orderData
            })
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        const { listOrder } = this.state;
        return (
            <div className="admin">
                <NavbarAdmin />
                <div className='admin_order_content'>
                    <div className="title">
                        <h1>Order</h1>
                    </div>
                    <div className='admin_order_container'>
                        {
                            listOrder.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: '#f3f3f3' }} className='admin_order_item' key={item.id}>
                                        <div className='admin_order_info_container'>
                                            <div className='admin_id_container'>
                                                <h2>ID</h2>
                                                <span style={{ fontWeight: '700' }}>{item.id}</span>
                                            </div>
                                            <div className='admin_order_info'>
                                                <span style={{ fontWeight: '700' }}>{item.User.fullname}</span>
                                                <span>{item.User.email}</span>
                                            </div>
                                        </div>
                                        <span>{item.total} VND</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        );

    }
}

const mapStateToProps = (state) => ({
    admin: store.getState().adminReducer.admin
});

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AdminOrder));
