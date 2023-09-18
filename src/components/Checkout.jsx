import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function Checkout() {
    const navigate = useNavigate()
    const gifURL = "https://media.tenor.com/suRA-3MIp8UAAAAd/cleaning-money-squidward.gif"

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: '18rem', textAlign: 'center', padding: '20px' }}>
                <Card.Img variant="top" src={gifURL} alt="Checkout Gif" style={{ marginBottom: '15px' }} />
                <Card.Body>
                    <Button variant="primary" onClick={()=>navigate('/')}>Back</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Checkout;
