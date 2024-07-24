import React from "react";
import Navbar from "../../components/navbar/navbar";

import category_cat from '../../assets/images/category_cat.png';
import category_dog from '../../assets/images/category_dog.png';

import './shop.scss'
import { getAllProduct } from "../../services/productService";
import { Link } from "react-router-dom";

class Shop extends React.Component {
    state = {
        listProduct: []
    }
    componentDidMount() {
        this.fetchProduct();
    }

    fetchProduct = async () => {
        let productData = await getAllProduct().then(res => {
            return res.data.products
        });
        this.setState({
            listProduct: productData ? productData : []
        })
    }

    render() {
        const { listProduct } = this.state;
        return (
            <div className="shop_container">
                <Navbar />
                <div className="shop_content">
                    <div className="shop_content_header">
                        <div className="shop_content_header_info">
                            <span>Our pet collection are the best</span>
                            <div className="shop_button">Shop now</div>
                        </div>
                    </div>
                    <h1 style={{ marginTop: '50px', textAlign: 'center' }}>Category</h1>
                    <div className="category_container">
                        <div className="category_item">
                            <img src={category_cat}></img>
                            <div className="category_button">Cat Products</div>
                        </div>
                        <div className="category_item">
                            <img src={category_dog}></img>
                            <div className="category_button">Dog Products</div>
                        </div>
                    </div>
                    <h1 style={{ marginTop: '50px', textAlign: 'center' }}>Our pets</h1>
                    <div className="product_container">
                        {listProduct.map((item, index) => {
                            return (
                                <Link to={item.id.toString()} className="product_item" key={item.id}>
                                    <img src={item.image} className="product_image" alt="" />
                                    <span className="product_name">{item.name} C{item.id}</span>
                                    <span className="product_price">{item.price} VND</span>
                                </Link>
                            )
                        })}

                    </div>
                </div>

            </div>
        )
    }

}

export default Shop;