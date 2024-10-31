import { Notyf } from "notyf";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function EditWorkout({ workout, fetchData }) {
    const notyf = new Notyf();

    const [name, setName] = useState(workout.name);
    const [description, setDescription] = useState(workout.description);
    const [duration, setDuration] = useState(workout.duration); // Assuming the price was replaced by duration

    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => {
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const editWorkout = (e) => {
        e.preventDefault();
    
        // Flag to check if the notification is already shown
        let notificationShown = false;
    
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workout._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name,
                description,
                duration: parseFloat(duration) // Change from price to duration
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            if (data.success) {
                if (!notificationShown) {
                    notyf.success('Successfully Updated');
                    notificationShown = true; // Mark notification as shown
                }
                closeEdit();
                fetchData(); // Refresh workout data
            } else {
                if (!notificationShown) {
                    notyf.error(data.message || 'Something went wrong');
                    notificationShown = true; // Mark notification as shown
                }
            }
        })
        .catch(err => {
            console.error('Error updating workout:', err);
            if (!notificationShown) {
                notyf.error('Error updating workout');
                notificationShown = true; // Mark notification as shown
            }
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={openEdit}>Edit</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={editWorkout}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="workoutName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                required 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                            />
                        <Form.Group controlId="workoutDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control 
                                type="number" 
                                required 
                                value={duration} 
                                onChange={e => setDuration(e.target.value)} 
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
