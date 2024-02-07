// Create a new file for ProductDetailPage component (ProductDetailPage.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetailPage = ({ match }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${match.params.id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [match.params.id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
            <img src={product.image} alt={product.title} className="mb-4" />
            <p className="text-lg mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
                <div className="text-2xl text-orange-500 font-extrabold">
                    {product.price}€
                </div>
                <div className="text-md text-blue-800 font-extrabold">
                    Avis : {product.rating.rate} / 5
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
