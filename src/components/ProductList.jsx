import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList({ filter = "" }) {  // Added filter prop with a default value of an empty string
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`);
                
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('there was a problem with the fetch operation:', error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="main-content">
            <h1>Product List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (     
                filteredProducts.map((product) => (  // Render the filtered products
                    <ProductCard key={product.id} product={product} />
                ))      
            )}
        </div>
    );
}

export default ProductList;