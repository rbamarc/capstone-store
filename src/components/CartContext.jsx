import { createContext, useContext, useState, useEffect } from 'react';
import UserContext from './userContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;  
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('userCart');
        return savedCart ? JSON.parse(savedCart) : {
            id: null,
            userId: null,
            date: null,
            products: []
        };
    });
    
    const { id: userId } = useContext(UserContext);

    useEffect(() => {
        if (userId && !cart.id) {
            fetchUserCart(userId);
        }
    }, [userId, cart.id]);

    const fetchUserCart = async (userId) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/carts`);
            const allCarts = await response.json();
            const userCart = allCarts.find(c => c.userId === userId);

            if (userCart) {
                setCart(userCart);
                localStorage.setItem('userCart', JSON.stringify(userCart));
            }
        } catch (error) {
            console.error("Failed to fetch carts:", error);
        }
    };

    useEffect(() => {
        if (cart.userId) {
            localStorage.setItem('userCart', JSON.stringify(cart));
        }
    }, [cart]);

    const updateProductQuantity = async (product, quantity) => {
        const updatedProducts = cart.products.map(p =>
            p.productId === product.id ? { ...p, quantity } : p
        );

    
        setCart(prevCart => ({ ...prevCart, products: updatedProducts }));

    
        try {
            const response = await fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    userId: userId,
                    products: updatedProducts
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const updatedCart = await response.json();
            setCart(updatedCart);
            localStorage.setItem('userCart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error("Failed to update product quantity:", error);
        }
    };

    const addProductToCart = async (product, quantity = 1) => {
        
        const updatedProducts = [...cart.products];
        const productIndex = updatedProducts.findIndex(p => p.productId === product.id);
        
        if (productIndex > -1) {
            updatedProducts[productIndex].quantity += quantity;
        } else {
            updatedProducts.push({ productId: product.id, quantity });
        }

        setCart(prevCart => ({ ...prevCart, products: updatedProducts }));

        
        try {
            let response;
            if (cart.id) {
                response = await fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        userId: userId,
                        products: updatedProducts
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await fetch(`https://fakestoreapi.com/carts`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        date: new Date().toISOString().slice(0, 10),
                        products: updatedProducts
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            
            const data = await response.json();
            setCart(data);
            localStorage.setItem('userCart', JSON.stringify(data));  
        } catch (error) {
            console.error("Failed to add product to cart:", error);
        }
    };

    const value = {
        cart,
        addProductToCart,
        updateProductQuantity
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;