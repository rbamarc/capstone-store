import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Navbar({onSearchChange}) {
    const navigate = useNavigate()
    const token = localStorage.getItem('authToken')

    
    const userData = JSON.parse(localStorage.getItem('userData')) || {}

    
    const username = userData.username

    const { cart } = useCart()
    const itemCount = cart.length

    function handleLogout() {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userCart')
        navigate('/');
    }

    return (
        <div className="navbar">
            {token ? (
                <span>
                    Welcome, {username}!
                    <Button onClick={handleLogout} variant='primary'>Logout</Button>
                    <Link to='/cart'>Cart ({itemCount})</Link>
                    <input
                        type="text"
                        placeholder='Search'
                        onChange={e => onSearchChange(e.target.value)}
                    />
                </span>
            ) : (
                <Button onClick={() => navigate('/login')} variant='primary'>Login</Button>
            )}
        </div>
    );
}

export default Navbar;
