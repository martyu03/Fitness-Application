// src/components/AppNavbar.js/
import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../App.css';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar className="extreme-navbar" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="extreme-brand">
                    Workout Booking
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact="true" className="extreme-link">Home</Nav.Link>
                        {localStorage.getItem('token') ? (
                            <>
                                <Nav.Link as={NavLink} to="/workouts" exact="true" className="extreme-link">My Workouts</Nav.Link>
                                <Nav.Link as={NavLink} to="/profile" className="extreme-link">Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/addWorkout" exact="true" className="extreme-link">Add Workout</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className="extreme-link">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="extreme-link">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="extreme-link">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
