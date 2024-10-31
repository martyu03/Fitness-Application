import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { Notyf } from "notyf";

export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [details, setDetails] = useState({});
    const notyf = new Notyf();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch user details');
                }
                return res.json();
            })
            .then(data => {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                });
                setDetails({
                    email: data.user.email,
                    // mobileNo is removed
                });
            })
            .catch(error => {
                notyf.error("Failed to fetch user details: " + error.message);
            });
        } else {
            notyf.error("No token found, please log in.");
        }
    }, [setUser, notyf]);

    // Redirect if user is not logged in
    if (user.id === null) {
        return <Navigate to="/workouts" />;
    }

    return (
        <>
            <Row className="bg-primary text-white p-4 mt-4">
                <Col>
                    <h1>Profile</h1>
                    <p>{details.email}</p> 
                    <hr className="border-white" />
                    <h3>Contacts</h3>
                    <ul>
                        <li>Email: {details.email}</li>
                    </ul>
                </Col>
            </Row>
        </>
    );
}
