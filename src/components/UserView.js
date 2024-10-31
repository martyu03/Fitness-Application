// src/components/UserView.js
import React from 'react';
import { Row } from 'react-bootstrap';
import WorkoutCard from './WorkoutsCard'; // Assuming you have a WorkoutCard component

const UserView = ({ workoutsData }) => {
    if (!Array.isArray(workoutsData) || workoutsData.length === 0) {
        return <p>No workouts available.</p>;
    }

    return (
        <Row>
            {workoutsData.map(workout => (
                <WorkoutCard key={workout._id} workoutProp={workout} />
            ))}
        </Row>
    );
}

export default UserView;
