import BasicInfo from './BasicInfo'
import PersonalInfo from './PersonalInfo'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { useState } from 'react'

function Register() {
    const [step, setStep] = useState(1)
    const [result, setResult] = useState([])
    const navigate = useNavigate()
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });


    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        street: '',
        number: '',
        city: '',
        zip: '',
        phone: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const proceedToNextStep = () => setStep(prevStep => prevStep + 1)

    async function onSubmitForm() {

        const { 
            email, username, password, confirmPassword,
            firstName, lastName, street, number, city, zip, phone 
        } = formData;
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;  
        }
        try {
            const response = await fetch(`http://fakestoreapi.com/users`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    email, username, password,
                    name: { firstname: firstName, lastname: lastName },
                    address: { city, street, number, zipcode: zip },
                    phone
                })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            if (response.ok) {  
                setAlert({ show: true, type: 'success', message: 'Registration successful!' });
            } else {
                const errorMessage = await response.text();  
                setAlert({ show: true, type: 'danger', message: errorMessage || 'Registration failed. Please try again.' });
            }

            if (response.ok) {
                setAlert({ show: true, type: 'success', message: 'Registration successful!' });
    
                setTimeout(() => {
                    navigate('/products');  
                }, 1500);
}
            setResult(data);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error.message);
        
        }
    }

    return (
        <div>
            {step === 1 && <BasicInfo formData={formData} handleInputChange={handleInputChange} nextStep={proceedToNextStep} />}
            {step === 2 && <PersonalInfo formData={formData} handleInputChange={handleInputChange} onSubmit={onSubmitForm} />}
        </div>
    )
}

export default Register