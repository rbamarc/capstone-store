import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { CartProvider } from './components/CartContext';
import UserProvider from './components/UserProvider';
import { useState, useEffect } from 'react';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout';


function App() {
  const [initialUser, setInitialUser] = useState()
  
  useEffect(() => {
    const storedUser = localStorage.getItem('userData')
    if (storedUser) {
      setInitialUser(JSON.parse(storedUser))
    }
  }, [])
  
  return (
    <Router>
      <UserProvider>
      <CartProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
        </CartProvider>
        </UserProvider>
    </Router>
  );
}

export default App;