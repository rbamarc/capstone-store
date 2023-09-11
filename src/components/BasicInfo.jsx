import React from 'react';
import { Button, Form } from 'react-bootstrap';

function BasicInfo({ formData, handleInputChange, nextStep }) {
    return (
        <div>
            <h1>Basic Information</h1>
            <Form>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label>Enter Email</Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='Enter email' 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </Form.Group>
            
            <Form.Group controlId='formBasicUsername'>
                <Form.Label>Enter Username</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter Username' 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </Form.Group>
            
            <Form.Group controlId='formBasicPassword'>
                <Form.Label>Enter Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter Password' 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </Form.Group>
            
            <Form.Group controlId='formBasicConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Confirm Password' 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Button onClick={nextStep}>Next</Button>
        </Form>
        </div>
    )
}

export default BasicInfo;