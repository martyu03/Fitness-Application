// components/ProductCard.js
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
    if (!productProp) {
        return <div>No product data available</div>; // Fallback UI
    }

    const { name, description, price, _id } = productProp;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP {price}</Card.Text>
                <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    );
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};
