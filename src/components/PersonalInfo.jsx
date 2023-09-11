import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PersonalInfo({ formData, handleInputChange, onSubmit }) {
    return (
        <div>
            <h1>Personal Information</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group as={Col} md='4' controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Phone number'
                            name='phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md='4' controlId='street'>
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Street'
                            name='street'
                            value={formData.street}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md='4' controlId='aptNumber'>
                        <Form.Label>Apartment Number</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Apartment number'
                            name='number'
                            value={formData.number}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            required
                            name='city'
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Zip" 
                            required 
                            name='zip'
                            value={formData.zip}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Button onClick={onSubmit}>Complete Registration</Button>
            </Form>
        </div>
    );
}

export default PersonalInfo;