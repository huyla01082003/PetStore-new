import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';

import './admin.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNavigation } from '../../utils/navigate';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import { deleteAllCart, getAllCart } from '../../services/cartService';
import { createOrder, getAllOrder, getOrderByUserID } from '../../services/orderService';
import { createOrderDetail } from '../../services/orderDetailService';
import NavbarAdmin from '../../components/navbarAdmin/navbarAdmin';


class Admin extends Component {
    state = {
        revenue: 0,
        revenueByUser: []
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
            let revenue = 0;
            Object.keys(orderData).forEach(id => {
                revenue += orderData[id].total
            });

            let revenueByUser = {};

            orderData.forEach(order => {
                const userId = order.user_id;
                const User = order.User
                if (!revenueByUser[userId]) {
                    revenueByUser[userId] = {
                        User: User,
                        userId: userId,
                        totalRevenue: 0,
                        orders: []
                    };
                }
                revenueByUser[userId].totalRevenue += order.total;
                revenueByUser[userId].orders.push(order);
            });

            let revenueArray = Object.values(revenueByUser);

            this.setState({
                revenue: revenue,
                revenueByUser: revenueArray
            })


        } catch (e) {
            console.log(e)
        }
    }


    render() {
        const { revenue, revenueByUser } = this.state;
        console.log(revenueByUser)
        return (
            <div className="admin">
                <NavbarAdmin />
                <div className='admin_container'>
                    <h1>Dashboard</h1>
                    <h2>Revenue</h2>
                    <span className='revenue'>{revenue} VND</span>
                    <h2>Customer</h2>
                    <div className='user_revenue_container'>
                        <div className='user_revenue_item'>
                            <span style={{ color: '#E7366B', fontWeight: '700' }}>Info</span>
                            <span style={{ color: '#E7366B', fontWeight: '700' }}>Revenue</span>
                        </div>
                        {
                            revenueByUser.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: '#f3f3f3' }} className='user_revenue_item' key={item.id}>
                                        <div className='user_revenue_info'>
                                            <span style={{ fontWeight: '700' }}>{item.User.fullname}</span>
                                            <span>{item.User.email}</span>
                                        </div>
                                        <span>{item.totalRevenue} VND</span>
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


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Admin));
