import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductItem = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <Card className='my-3 p-3 rounded'>
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title as="div" className='product-title'><strong>{product.name}</strong></Card.Title>
          <Card.Text as="div" className='mb-2'><Rating value={product.rating} text={`${product.numReviews} reviewed`} /></Card.Text>
          <Card.Text as="h4">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>

  );
};

export default ProductItem;