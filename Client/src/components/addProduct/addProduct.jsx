import React, { Component } from 'react';
import './addProduct.scss'

import { storage } from "../../utils/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { createProduct } from '../../services/productService';


class AddProduct extends Component {
    state = {
        name: '',
        category: '',
        image: '',
        price: ''
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'price' && !/^\d*$/.test(value)) {
            return;
        }
        this.setState({ [name]: value });
    };

    handleImageChange = async (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            await this.handleUpload(image);
        }
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { name, category, image, price } = this.state;
            const newProduct = await createProduct(name, category, image, price);
            if (newProduct) {
                alert('Add product success');
                this.setState({
                    name: '',
                    category: '',
                    image: '',
                    price: ''
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    componentWillUnmount() {
        this.props.fetchProduct();
    }

    handleUpload = (imageUpLoad) => {
        console.log(imageUpLoad)
        if (imageUpLoad === null) {
            return
        }
        const imageRef = ref(storage, `images/${imageUpLoad.name + v4()}`);
        const uploadTask = uploadBytesResumable(imageRef, imageUpLoad);

        uploadTask.on(
            'state_changed',
            (snapshot) => {

            },
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url)
                    this.setState({ image: url });

                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }
        );
    }

    handleDeleteImage = () => {
        const { image } = this.state;
        if (image) {
            const imageRef = storage.refFromURL(image);
            imageRef.delete()
                .then(() => {
                    this.setState({ image: '' });
                    console.log('Image deleted successfully');
                })
                .catch(error => {
                    console.log('Error deleting image: ', error);
                });
        }
    };
    render() {
        const { name, category, image, price } = this.state;

        return (
            <div className="create-product">
                <h2>Create New Product</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={category}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={this.handleImageChange}
                            ref={this.fileInput}
                            required
                        />
                        {image && (
                            <div>
                                <img src={image} alt="Uploaded" width="100" />
                                <button type="button" onClick={this.handleDeleteImage}>Delete Image</button>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={this.handleInputChange}
                            required
                            pattern="\d*"
                            title="Please enter a valid number"
                        />
                    </div>
                    <button type="submit">Create Product</button>
                </form>
            </div>
        );
    }
}

export default AddProduct;
