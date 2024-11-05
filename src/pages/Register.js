// pages/Register.js
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Ensure you import Notyf's CSS for styles

export default function Register() {
    const notyf = new Notyf();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false); 

    useEffect(() => {
        if (email.includes('@') && password.length >= 8 && password === confirmPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);

            if (data.message === "Registered Successfully") {
                // Clear form fields on success
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                notyf.success('Registration successful');
                navigate('/login');
            } else {
                // Handle specific backend messages
                notyf.error(data.message || 'Something went wrong');
            }
        })
        .catch(error => notyf.error(error.message || 'Network error'));
    }

    return (
        <Form onSubmit={registerUser}>
            <h1 className="my-5 text-center">Register</h1>

            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter Email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    required 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                />
            </Form.Group>

            <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
                Submit
            </Button>
        </Form>
    );
}
