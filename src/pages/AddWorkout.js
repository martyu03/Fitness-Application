// pages/AddWorkouts.js
import { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
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
    const [showModal, setShowModal] = useState(false); 

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
            if (data.message === 'Workout added successfully') {
                notyf.success('Workout Added');
                setWorkoutName('');
                setDuration('');
                setRedirect(true);
                setShowModal(false); // Close the modal after success
            } else if (data.message === 'Workout already exists') {
                notyf.error('Workout Already Exists');
                setWorkoutName('');
                setDuration('');
            } else {
                notyf.error('Unsuccessful Workout Creation');
                setWorkoutName('');
                setDuration('');
            }
        });
    }

    // Removed the admin check
    // If redirecting after successful addition
    if (redirect) {
        return <Navigate to="/workouts" />;
    }

    return (
        <>
            {/* Button to trigger modal */}
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Workout
            </Button>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter duration (e.g., 30 mins)"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="text-center mt-3">
                            {isActive ? (
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            ) : (
                                <Button variant="danger" type="submit" disabled>
                                    Submit
                                </Button>
                            )}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
