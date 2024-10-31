// components/ProductCard.js
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WorkoutsCard({ workoutsProp }) {
    if (!workoutsProp) {
        return <div>No product data available</div>; 
    }

    console.log('Workout data:', workoutsProp);

    const { name, duration, dateAdded, status, _id } = workoutsProp;

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
            </Card.Body>
        </Card>
    );
}

