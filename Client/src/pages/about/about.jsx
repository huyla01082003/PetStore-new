import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';

import './about.scss'

import about_background from '../../assets/images/about_background.png';
import about_background2 from '../../assets/images/about_background2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import facebook_icon from '../../assets/images/facebook_icon.png';
import instagram_icon from '../../assets/images/instagram_icon.png';
import zalo_icon from '../../assets/images/zalo_icon.png';

class About extends Component {
    render() {
        return (
            <div className='about_container'>
                <Navbar />
                <div className='about_content'>
                    <h1 className='about_header'>About Our Petsaholic</h1>
                    <p className='about_text'>
                        Welcome to our Petsaholic! We are passionate about connecting pets with loving families. Our mission is to provide healthy, happy pets to our customers and offer all the support you need to ensure a happy and healthy life for your new family member.
                    </p>
                    <img src={about_background} alt="" />
                    <h2 className='about_subheader'>Our Mission</h2>
                    <p className='about_text'>
                        We believe every pet deserves a loving home. Our goal is to promote responsible pet ownership and help you find the perfect companion that fits your lifestyle and needs.
                    </p>
                    <img src={about_background2} alt="" />
                    <h2 className='about_subheader'>Contact Us</h2>
                    <p className='about_text'>
                        If you have any questions, feel free to reach out to us:
                    </p>
                    <ul className='about_list'>
                        <li>Email: contact@petshop.com</li>
                        <li>Phone: +123 456 7890</li>
                        <li>Address: 123 Pet Street, Pet City, PC 12345</li>
                    </ul>
                    <div className='line_container'>
                        <span className='line'></span>
                        <span className='line_text'>Or</span>
                    </div>
                    <ul className='about_social_list'>
                        <li><img src={facebook_icon} alt="" /></li>
                        <li><img src={instagram_icon} alt="" /></li>
                        <li><img src={zalo_icon} alt="" /></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;