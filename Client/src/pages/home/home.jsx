import React from "react";
import Navbar from "../../components/navbar/navbar";

import './home.scss'

import introduction_image from '../../assets/images/introduction_image.png'
import background1 from '../../assets/images/background1.png'
import background2 from '../../assets/images/background2.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getNewestProduct } from "../../services/productService";

class Home extends React.Component {
    state = {
        listProduct: []
    }
    componentDidMount() {
        this.fetchNewestProduct();
    }

    fetchNewestProduct = async () => {
        try {
            let productData = await getNewestProduct().then(res => {
                return res.data.products
            });
            this.setState({
                listProduct: productData ? productData : []
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { listProduct } = this.state;
        return (
            <div className="home">
                <Navbar />
                <div className="home_content">
                    <div className="home_introduction">
                        <div className="home_introduction_content">
                            <span className="home_introduction_title">We give you all quality pets</span>
                            <span>Choose a pet for yourself right now</span>
                            <Link to='/shop' className="store_button">Choose a pet  <FontAwesomeIcon icon={faPaw} /></Link>

                        </div>
                        <img src={introduction_image} className="home_introduction_image" />
                    </div>
                    <h1 style={{ marginTop: '100px', fontWeight: '700' }}>Newest Pets</h1>
                    <div className="best_seller_container">
                        {
                            listProduct.map((item, index) => {
                                return (
                                    <Link to={'/shop/' + item.id.toString()} className="best_seller_item">
                                        <img src={item.image} className="best_seller_image" alt="" />
                                        <span className="best_seller_name">{item.name}</span>
                                        <span className="best_seller_price">{item.price} VND</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className="other_content">
                        <img src={background1} alt="" />
                        <div className="other_content_info">
                            <span className="other_content_title">Your pet will love us</span>
                            <span>At our pet clothing store we offer the latest styles and trends to keep your furry friend looking fashionable. Our selection of unique and stylish clothes are sure to bring a smile to both you and your pet! So come on over -- your pet will love us!</span>
                            <div className="store_button">Learn More</div>
                        </div>
                    </div>
                    <div className="other_content2">
                        <img src={background2} alt="" />
                        <div className="other_content_info">
                            <span className="other_content_title">Pets are our passion</span>
                            <span>Pets are our passion! We offer a wide selection of quality pet clothing to keep your furry family members looking their best. From designer apparel to everyday wear, we have the perfect outfit for your pet's unique style. Shop now and find the perfect look for your beloved companion.</span>
                            <div className="store_button">Learn More</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;