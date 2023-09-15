import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FilterOffCanvas from './FilterOffCanvas';
import { Button } from "react-bootstrap";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [selectedCategories, setSelectedCategories] = useState([]); 
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

    let displayedProducts = products;

    if (searchTerm) {
        displayedProducts = displayedProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    if (selectedCategories.length) {
        displayedProducts = displayedProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }

    return (
    <div className="main-content grid-container">
        <div></div> 
        
        <div>
            <h1>Product List</h1>
            <Button onClick={() => setShowOffCanvas(true)} variant='primary'>Filter Products</Button>
            <FilterOffCanvas 
                show={showOffCanvas} 
                onHide={() => setShowOffCanvas(false)} 
                onCategorySelect={(categories) => {
                    setSelectedCategories(categories);
                }} 
                onSearchApply={(search) => {
                    setSearchTerm(search);
                }}
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="products-grid">
                    {displayedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>

        <div></div> 
    </div>
);


}

export default ProductList;
