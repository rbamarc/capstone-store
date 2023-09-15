
import { Button, Form } from 'react-bootstrap';

function BasicInfo({ formData, handleInputChange, nextStep }) {
    return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
        <h1 className="text-center mb-4">Basic Information</h1>
        <Form>
            <Form.Group controlId='formBasicEmail' className="mb-3">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='Enter email' 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </Form.Group>
            
            <Form.Group controlId='formBasicUsername' className="mb-3">
                <Form.Label>Enter Username</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter Username' 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </Form.Group>
            
            <Form.Group controlId='formBasicPassword' className="mb-3">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter Password' 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </Form.Group>
            
            <Form.Group controlId='formBasicConfirmPassword' className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Confirm Password' 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" onClick={nextStep}>Next</Button>
            </div>
        </Form>
    </div>
);
}

export default BasicInfo;