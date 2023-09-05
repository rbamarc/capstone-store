import { Card, Button } from 'react-bootstrap';

function ProductCard({ product }) {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Card.Text>
          ${product.price}
        </Card.Text>
        {/* Optionally, you can also add a "Buy" or "Add to Cart" button */}
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
