import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
    <div style={{ backgroundColor: '#4a4a4a' }} className="text-white p-4">
        <Container>
            <Row>
                <Col md="8">
                    <h3>Capstone Store</h3>
                </Col>
                <Col md="4" className="d-flex flex-column align-items-end">
                    <Link to="/" className="text-white mb-2">About</Link>
                    <Link to="/" className="text-white mb-2">Contact</Link>
                    <Link to="/" className="text-white">Privacy Policy</Link>
                </Col>
            </Row>
        </Container>
    </div>
);
}

export default Footer;