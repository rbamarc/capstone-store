import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar() {
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
                    <button onClick={handleLogout}>Logout</button>
                    <Link to='/cart'>Cart ({itemCount})</Link>
                </span>
            ) : (
                <button onClick={() => navigate('/login')}>Login</button>
            )}
        </div>
    );
}

export default Navbar;
