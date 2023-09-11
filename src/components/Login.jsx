import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    }

    const handleLogin = async () => {
        const response = await fetch('http://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (data.token) {
            localStorage.setItem('authToken', data.token)
            console.log(data)
            // localStorage.setItem('username', data.name.firstName)
            navigate('/')  
        } else {
            alert('Login failed. Please check your credentials.')
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <Form>
                <Form.Group controlId='loginUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Username'
                        name="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                
                <Form.Group controlId='loginPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Enter Password'
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button onClick={handleLogin}>Login</Button>
                <Link to="/register">Don't have an account? Register</Link>
            </Form>
        </div>
    )
}

export default Login