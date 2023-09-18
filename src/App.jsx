import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import CustomNavbar from './components/CustomNavBar';
import { CartProvider } from './components/CartContext';
import UserProvider from './components/UserProvider';
import { useState, useEffect } from 'react';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
    const [initialUser, setInitialUser] = useState();

    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setInitialUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <UserProvider>
                <CartProvider>
                    <CustomNavbar />
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                    <Footer/>
                </CartProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
