import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import PersonalInfo from './components/PersonalInfo';
import BasicInfo from './components/BasicInfo';

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Products = () => <h1>Products Page</h1>;

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/users/register" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;