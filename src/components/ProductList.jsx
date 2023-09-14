import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FilterOffCanvas from './FilterOffCanvas';
import { Button } from "react-bootstrap";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const filteredProducts = selectedCategory ? 
        products.filter(product => product.category === selectedCategory) : products;

    return (
        <div className="main-content">
            <h1>Product List</h1>
            <Button onClick={() => setShowOffCanvas(true)} variant='primary'>Filter Products</Button>

            <FilterOffCanvas 
                show={showOffCanvas} 
                onHide={() => setShowOffCanvas(false)} 
                onCategorySelect={(category) => {
                    setSelectedCategory(category);
                    setShowOffCanvas(false);
                }} 
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))      
            )}
        </div>
    );
}

export default ProductList;
