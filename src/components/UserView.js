// src/components/UserView.js
import React from 'react';
import WorkoutsCard from './WorkoutsCard';
import { Row, Col } from 'react-bootstrap';

export default function UserView({ workoutsData }) {
    if (!workoutsData || workoutsData.length === 0) {
        return <div>No workouts available</div>; 
    }

    return (
        <Row>
            {workoutsData.map((workout) => (
                <Col key={workout._id} sm={12} md={6} lg={4} className="mb-4">
                    <WorkoutsCard workoutsProp={workout} />
                </Col>
            ))}
        </Row>
    );
}

