import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    

    

    useEffect(() => {
        const getProduct = async () => {
        try {
            const data = await fetch(`https://fakestoreapi.com/products/${id}`)
            const response = await data.json()
            setProduct(response)
        } catch (error) {
            console.log(error)
        }
        
    }
        getProduct()
    }, [id])
    
    if(!product) return <p>Loading</p>
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
                <Button variant="primary">Add to Cart</Button>
                <Button onClick={()=> navigate('/') } variant="primary">Back</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductDetail