import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';

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
            <h1 className="mb-4">Your Cart</h1>

            {cart.products.map((product, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <div className="d-flex">
                            <img src={productDetails[index]?.image} alt={productDetails[index]?.title} width="100" className="mr-4"/>
                            <div className="flex-grow-1">
                                <Card.Title>{productDetails[index]?.title}</Card.Title>
                                <Card.Text>Price: ${productDetails[index]?.price}</Card.Text>
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control 
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) => updateQuantity(product.productId, e.target.value)}
                                    style={{ width: '80px', display: 'inline-block', marginRight: '15px' }}
                                />
                                <Button variant="danger" onClick={() => deleteFromCart(product.productId)}>Remove</Button>
                            </div>
                            <div className="ml-auto">
                                <Card.Text>Total: ${productDetails[index]?.price * product.quantity}</Card.Text>
                            </div>
                        </div>
                    </Card.Body>
                    <hr/>
                </Card>
            ))}

            <div className="d-flex justify-content-between mt-4">
                <Button onClick={() => navigate('/')} variant="primary">Back</Button>
                <Button onClick={()=> navigate('/checkout')} variant='primary'>Checkout</Button>
            </div>
        </div>
    );
}

export default Cart;