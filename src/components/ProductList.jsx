import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
    const [products, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`)
                
                const data = await response.json()
                setProduct(data)
            } catch (error) {
                console.error('there was a problem with the fetch operation:', error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [])
    
    return (
        <div>
            <h1>Product List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (     
                products.map((product) => (
                    <ProductCard key={product.id} product={ product} />
                ))      
            )}
        </div>
    )
}

export default ProductList