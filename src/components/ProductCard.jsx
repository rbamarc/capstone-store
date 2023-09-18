import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card 
        className='product-card' 
        style={{ 
            width: '12rem', 
            margin: '2rem', 
            padding: '1rem', 
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // This is the shadow
        }}
    >
      <Card.Img 
        variant="top" 
        src={product.image} 
        style={{ 
            width: '150px', 
            height: '150px', 
            objectFit: 'cover', 
            transition: 'transform 0.3s ease-in-out' 
        }} 
        className="product-image"
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        
        <Card.Text>
          ${product.price}
        </Card.Text>
        <Link to={`/products/${product.id}`}>
          <Button variant='primary'>View Details</Button>
        </Link>
        
      </Card.Body>
    </Card>
);
}

export default ProductCard;
