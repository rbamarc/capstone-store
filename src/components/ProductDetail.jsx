import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { addProductToCart } = useCart()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetch(`https://fakestoreapi.com/products/${id}`)
                const response = await data.json()
                setProduct(response)
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }
        getProduct()
    }, [id])

    if(error) return <p>Error loading product details!</p>
    if(!product) return <p>Loading</p>

    const handleAddToCart = () => {
        addProductToCart(product, 1);
        alert(`${product.title} added to cart!`);
    }
    
    return (
        <Card style={{ width: '80%', margin: '30px auto' }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                     ${product.price}
                </Card.Text>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <div className="button-container">
                    <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
                    <Button onClick={() => navigate('/')} variant="primary">Back</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductDetail;