import { useState } from 'react';
import Navbar from './Navbar';  // Your Navbar component
import ProductList from './ProductList'; // Your ProductList component

function MainLayout() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <Navbar onSearchChange={setSearchTerm} />
            <ProductList filter={searchTerm} />
        </div>
    );
}

export default MainLayout;
