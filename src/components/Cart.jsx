import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState({ products: [] });
    const [productDetails, setProductDetails] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const storedCart = localStorage.getItem('userCart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const responses = await Promise.all(cart.products.map(p => fetch(`http://fakestoreapi.com/products/${p.productId}`)));
                const productsData = await Promise.all(responses.map(res => res.json()));
                setProductDetails(productsData);
            } catch (error) {
                console.error('Failed to fetch product details', error);
            }
        };

        if (cart.products.length) {
            fetchProductDetails();
        }
    }, [cart]);

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cart.products.map((product, index) => (
                    <li key={index}>
                        <img src={productDetails[index]?.image} alt={productDetails[index]?.title} width="100" />
                        Product Name: {productDetails[index]?.title},
                        Quantity: {product.quantity},
                        Price: ${productDetails[index]?.price},
                        Total: ${productDetails[index]?.price * product.quantity}
                    </li>
                ))}
            </ul>
            <Button onClick={()=> navigate('/checkout')} variant='primary'>checkout</Button>
            <Button onClick={() => navigate('/')} variant="primary">Back</Button>
        </div>
    );
}

export default Cart;