import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';

import './adminProduct.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNavigation } from '../../utils/navigate';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import { deleteAllCart, getAllCart } from '../../services/cartService';
import { createOrder } from '../../services/orderService';
import { createOrderDetail } from '../../services/orderDetailService';
import NavbarAdmin from '../../components/navbarAdmin/navbarAdmin';
import { getAllProduct } from '../../services/productService';

import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AddProduct from '../../components/addProduct/addProduct';
class AdminProduct extends Component {
    state = {
        listProduct: [],
        isAddProductClick: false
    }

    componentDidMount() {
        this.fetchProduct();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.admin !== this.props.admin) {
            if (this.props.admin === null) {
                this.props.navigate('/admin', { replace: true });
                console.log('aa')
            }
        }
    }


    fetchProduct = async () => {
        let productData = await getAllProduct().then(res => {
            return res.data.products
        });
        console.log(productData)
        this.setState({
            listProduct: productData ? productData : []
        })
    }

    handleAddProductClick = () => {
        this.setState({
            isAddProductClick: !this.state.isAddProductClick
        })
    }

    render() {
        const { listProduct, isAddProductClick } = this.state;
        return (
            <div className="admin">
                {
                    isAddProductClick === true &&
                    <div className='add_product_container'>
                        <FontAwesomeIcon onClick={() => this.handleAddProductClick()} icon={faXmark} />
                        <AddProduct fetchProduct={this.fetchProduct} />
                    </div>
                }
                <NavbarAdmin />
                <div className='admin_product_content'>
                    <div className="title">
                        <h1>Product</h1>
                        <span onClick={() => this.handleAddProductClick()}><FontAwesomeIcon icon={faPlus} />Add Product</span>
                    </div>
                    <div className='admin_product_container'>
                        {
                            listProduct.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: '#f3f3f3' }} className='admin_product_item' key={item.id}>
                                        <div className='admin_product_info_container'>
                                            <img src={item.image} alt="" />
                                            <div className='admin_product_info'>
                                                <span style={{ fontWeight: '700' }}>{item.name}</span>
                                                <span>{item.category}</span>
                                            </div>
                                        </div>

                                        <span>{item.price} VND</span>
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


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AdminProduct));
