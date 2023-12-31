import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';


function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()
    
    
    const { user, setUser } = useContext(UserContext)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    };

    const handleLogin = async () => {
        try {
            
            const loginResponse = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })

            const loginData = await loginResponse.json()

            if (loginData.token) {
                localStorage.setItem('authToken', loginData.token)

                const usersResponse = await fetch('https://fakestoreapi.com/users')
                const users = await usersResponse.json()

                const loggedInUser = users.find(u => u.username === credentials.username)

                if (loggedInUser) {
                    localStorage.setItem('userData', JSON.stringify(loggedInUser))
                    setUser(loggedInUser)

                    const userId = loggedInUser.id
                    const cartsResponse = await fetch('https://fakestoreapi.com/carts')
                    const allCarts = await cartsResponse.json()
                    const userCart = allCarts.find(cart => cart.userId === userId)
                    console.log(userCart)
                    if (userCart) {
                        localStorage.setItem('userCart', JSON.stringify(userCart))
                    } else {
                        localStorage.setItem('userCart', JSON.stringify({ products: [] }))
                    }
                
                    navigate('/')
                } else {
                    alert('User details not found. Please try again.')
                }
            } else {
                alert('Login failed. Please check your credentials.')
            }
        } catch (error) {
            console.error("Error during login or fetching user details:", error)
            alert('An error occurred. Please try again.')
        }
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="text-center mb-4">Login</h1>
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

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" onClick={handleLogin}>Login</Button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="/register">Don't have an account? Register</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;