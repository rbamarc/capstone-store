import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const username = userData.username;

    const { cart } = useCart();
    const itemCount = cart.length;

    function handleLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userCart');
        navigate('/');
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" className='text-white'>Capston Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                    {/* Display user info and cart if logged in */}
                    {token ? (
                        <>
                            <Navbar.Text className="me-3">
                                Welcome, <Link to="/profile" className='text-white'>{username}</Link>
                            </Navbar.Text>
                            <Link className="nav-link text-white me-3" to="/cart">Cart ({itemCount})</Link>
                            <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                        </>
                    ) : (
                        <Button onClick={() => navigate('/login')} variant="outline-primary">Login</Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
