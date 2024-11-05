// components/WorkoutsCard.js
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WorkoutsCard({ workoutsProp, onDeleteWorkout, onUpdateWorkout }) {
    if (!workoutsProp) {
        return <div>No workout data available</div>; 
    }

    console.log('Workout data:', workoutsProp);

    const { name, duration, dateAdded, status, _id } = workoutsProp;

    const handleDelete = () => {
        if (onDeleteWorkout) {
            onDeleteWorkout(_id); // Call the passed delete function with the workout ID
        }
    };

    const handleUpdate = () => {
        if (onUpdateWorkout) {
            onUpdateWorkout(_id); // Call the passed update function with the workout ID
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Duration:</Card.Subtitle>
                <Card.Text>{duration}</Card.Text>
                <Card.Subtitle>Date Added:</Card.Subtitle>
                <Card.Text>{dateAdded}</Card.Text>
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text>{status}</Card.Text>
                <Link className="btn btn-primary" to={`/workouts/${_id}`}>Details</Link>
                <Button variant="danger" onClick={handleDelete} className="mt-2">
                    Delete
                </Button>
                <Button variant="warning" onClick={handleUpdate} className="mt-2 ms-2">
                    Update
                </Button>
            </Card.Body>
        </Card>
    );
}
