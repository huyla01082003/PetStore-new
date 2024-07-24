import React from "react";
import Navbar from "../../components/navbar/navbar";

import './shopDetail.scss'
import { getAllProduct, getProductByID } from "../../services/productService";
import { Link } from "react-router-dom";

import facebook_icon from '../../assets/images/facebook_icon.png';
import instagram_icon from '../../assets/images/instagram_icon.png';
import zalo_icon from '../../assets/images/zalo_icon.png';

import withRouter from "../../utils/with-router";
import { connect } from "react-redux";
import { store } from "../../redux/store";
import { createCart } from "../../services/cartService";
import { withNavigation } from "../../utils/navigate";

class ShopDetail extends React.Component {
    state = {
        product: {}
    }
    componentDidMount() {
        this.fetchProductById(this.props.router.params.id);
    }

    fetchProductById = async (id) => {
        let productData = await getProductByID(id).then(res => {
            return res.data.product
        });
        this.setState({
            product: productData ? productData : {}
        })
    }

    handleAddCart = async (productId) => {
        if (this.props.user === null) {
            this.props.navigate('/signin');
        } else {
            try {
                await createCart(this.props.user.userId, productId);
                alert('Add success')
            } catch (e) {
                console.log(e)
            }
        }

    }

    render() {
        const { product } = this.state;
        console.log(product)
        return (
            <div className="shop_detail_container">
                <Navbar />
                <div className="shop_detail">
                    <div className="shop_detail_content">
                        <img src={product.image} alt="" />
                        <div className="shop_detail_info">
                            <span className="product_name">{product.name}</span>
                            <span className="product_price">{product.price} VND</span>
                            <span className="product_other_info">Product ID: <span>C{product.id}</span></span>
                            <span className="product_other_info">Genre: <Link>{product.category}</Link></span>
                            <div className="add_cart_button" onClick={() => this.handleAddCart(product.id)}>
                                Add To Cart
                            </div>
                            <div className="product_extension">
                                <div style={{ backgroundColor: 'rgb(255, 15, 95)' }} className="product_extension_header">Included Documents</div>
                                <ul>
                                    <li>Electronic Warranty Card</li>
                                    <li>Purebred Commitment</li>
                                    <li>Health Monitoring Booklet</li>
                                    <li>Guidebook for Care and Training</li>
                                </ul>
                            </div>
                            <div className="product_extension">
                                <div style={{ backgroundColor: 'black' }} className="product_extension_header">Discuss more about pets</div>
                                <div className="product_chat_container">
                                    <img src={facebook_icon} alt="" />
                                    <img src={instagram_icon} alt="" />
                                    <img src={zalo_icon} alt="" />
                                </div>
                            </div>
                        </div>
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
};


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(withRouter(ShopDetail)));