
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken')
    const username = localStorage.getItem('username') 

    function handleLogout() {
        localStorage.removeItem('authToken')
        localStorage.removeItem('username')

        navigate('/')
    }

    return (
        <div className="navbar">
            {token ? (
                <span>
                    Welcome, {username}!
                    <button onClick={handleLogout}>Logout</button>
                </span>
            ) : (
                <button onClick={() => navigate('/login')}>Login</button>
            )}
        </div>
    );
}

export default Navbar;