import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Checkout() {
    const navigate = useNavigate()
    const gifURL = "https://media.tenor.com/suRA-3MIp8UAAAAd/cleaning-money-squidward.gif"

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={gifURL} alt="Checkout Gif" />
            <Button variant="primary" onClick={navigate('/')}>Back</Button>
        </div>
    );
}

export default Checkout;
