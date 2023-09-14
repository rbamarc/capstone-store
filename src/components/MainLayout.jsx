import { useState } from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList';

function MainLayout() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <header>
                <Navbar onSearchChange={setSearchTerm} />
            </header>
            <main>
                <ProductList filter={searchTerm} />
            </main>
        </div>
    );
}

export default MainLayout;