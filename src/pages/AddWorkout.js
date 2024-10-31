// pages/AddWorkout.js
import { useState, useEffect, useContext } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function AddWorkout() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);
    const [workoutName, setWorkoutName] = useState('');
    const [duration, setDuration] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (workoutName && duration) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [workoutName, duration]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: workoutName,
                duration: duration
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data) {
                notyf.success('Workout Added');
                setWorkoutName('');
                setDuration('');
                setRedirect(true);
            } else {
                notyf.error('Unsuccessful Workout Creation');
            }
        });
    }

    if (redirect) {
        return <Navigate to="/workouts" />;
    }

    return (
        <Container className="my-4">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2 className="text-center mb-4">Add Workout</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout name"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter duration (e.g., 30 mins)"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="text-center mt-4">
                            <Button variant="primary" type="submit" disabled={!isActive}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
