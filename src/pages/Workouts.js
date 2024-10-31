import { useState, useEffect, useContext } from 'react';
import { Form, Button, ListGroup, Container, Row, Col, Modal } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import UserView from '../components/UserView';
import { Notyf } from 'notyf';
import '../App.css';

export default function Workouts() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    const [workouts, setWorkouts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [workoutName, setWorkoutName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newWorkoutName, setNewWorkoutName] = useState('');
    const [newDuration, setNewDuration] = useState('');

    // Fetch active workouts
    const fetchWorkouts = () => {
        const fetchURL = `${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`;
        fetch(fetchURL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => res.json())
            .then(data => {
                setWorkouts(data.workouts || []);
            })
            .catch(err => console.error("Failed to fetch workouts:", err));
    };

    useEffect(() => {
        if (user) {
            fetchWorkouts();
        }
    }, [user]);

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

    const handleAddWorkout = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: newWorkoutName,
                duration: newDuration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    notyf.success('Workout Added');
                    setNewWorkoutName('');
                    setNewDuration('');
                    setShowModal(false);
                    fetchWorkouts();
                } else {
                    notyf.error('Unsuccessful Workout Creation');
                }
            });
    };

    const handleClear = () => {
        setWorkoutName('');
        setSearchResults([]);
    };

    return (
    <Container className="halloween-theme">
        <div className="halloween-overlay"></div>
        <div className="extreme-content">
            <h1 className="halloween-header text-center">Workout Search - Halloween Special 🎃</h1>
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
                <Button onClick={handleSearchByName} className="mt-3 me-2 halloween-button">
                    Search by Name
                </Button>
                <Button onClick={handleClear} className="mt-3 halloween-button">
                    Clear
                </Button>
            </Form>

            <h1 className="halloween-header mt-4 text-center">Search Results</h1>
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
                <Col xs={12} className="mb-4 text-center">
                    <h1 className="halloween-header">My Workouts</h1>
                    <Button variant="primary" className="halloween-button" onClick={() => setShowModal(true)}>
                        Add Workout
                    </Button>
                </Col>
            </Row>
            <UserView workoutsData={workouts} />

            {/* Add Workout Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddWorkout}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout name"
                                value={newWorkoutName}
                                onChange={(e) => setNewWorkoutName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter duration (e.g., 30 mins)"
                                value={newDuration}
                                onChange={(e) => setNewDuration(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="text-center mt-4">
                            <Button variant="primary" type="submit" className="halloween-button" disabled={!newWorkoutName || !newDuration}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    </Container>
);

}