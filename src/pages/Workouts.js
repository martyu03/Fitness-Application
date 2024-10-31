// src/pages/Workouts.js
import { useState, useEffect, useContext } from 'react';
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import UserView from '../components/UserView';
import '../App.css'; 

export default function Workouts() {
    const { user } = useContext(UserContext);

    const [workouts, setWorkouts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [workoutName, setWorkoutName] = useState('');

    // Fetch active workouts
    const fetchWorkouts = () => {
    const fetchURL = `${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`;

    fetch(fetchURL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Adjust this based on your API response structure
            console.log('Fetched workouts:', data);
            setWorkouts(data.workouts || []); // Assuming workouts are nested under `workouts`
        })
        .catch(err => {
            console.error("Failed to fetch workouts:", err);
        });
};


    useEffect(() => {
        console.log('Current user:', user); // Log user context
        if (user) {
            fetchWorkouts();
        }
    }, [user]);

    // Search workouts by name
    const handleSearchByName = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/search-by-name`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: workoutName })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSearchResults(data);
            } else {
                console.error('Error searching for workouts:', data.message);
            }
        } catch (error) {
            console.error('Error searching for workouts by name:', error);
        }
    };

    // Clear search results
    const handleClear = () => {
        setWorkoutName('');
        setSearchResults([]);
    };

    return (
        <Container className="extreme-workouts-page">
            <div className="extreme-overlay"></div>
            <div className="extreme-content">
                <h2 className="extreme-header">Workout Search</h2>
                <Form>
                    <Form.Group controlId="workoutName">
                        <Form.Label>Workout Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            placeholder="Enter workout name"
                        />
                    </Form.Group>
                    <Button onClick={handleSearchByName} className="mt-3 me-2 extreme-search-button">
                        Search by Name
                    </Button>
                    <Button onClick={handleClear} className="mt-3 extreme-clear-button">
                        Clear
                    </Button>
                </Form>

                <h3 className="mt-4 extreme-header">Search Results</h3>
                {searchResults.length > 0 ? (
                    <ListGroup>
                        {searchResults.map((workout) => (
                            <ListGroup.Item key={workout._id} className="extreme-list-item">
                                <h5>{workout.name}</h5>
                                <p>Duration: {workout.duration} minutes</p>
                                <p>{workout.description}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No workouts found.</p>
                )}

                <Row>
                    <Col xs={12} className="mb-4">
                        <h1 className="text-center extreme-header">Our Workouts</h1>
                    </Col>
                </Row>
                <UserView workoutsData={workouts} />
            </div>
        </Container>
    );
}
