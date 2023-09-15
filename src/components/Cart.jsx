import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
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

    const deleteFromCart = (productId) => {
        const updatedCart = cart.products.filter(p => p.productId !== productId);
        setCart({ products: updatedCart });
        localStorage.setItem('userCart', JSON.stringify({ products: updatedCart }));
    }

    const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.products.map(p => p.productId === productId ? { ...p, quantity: Number(quantity) } : p);
        setCart({ products: updatedCart });
        localStorage.setItem('userCart', JSON.stringify({ products: updatedCart }));
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cart.products.map((product, index) => (
                    <li key={index}>
                        <img src={productDetails[index]?.image} alt={productDetails[index]?.title} width="100" />
                        Product Name: {productDetails[index]?.title},
                        Quantity: 
                        <Form.Control 
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => updateQuantity(product.productId, e.target.value)}
                        />,
                        Price: ${productDetails[index]?.price},
                        Total: ${productDetails[index]?.price * product.quantity}
                        <Button variant="danger" onClick={() => deleteFromCart(product.productId)}>Remove</Button>
                    </li>
                ))}
            </ul>
            <Button onClick={()=> navigate('/checkout')} variant='primary'>Checkout</Button>
            <Button onClick={() => navigate('/')} variant="primary">Back</Button>
        </div>
    );
}

export default Cart;
