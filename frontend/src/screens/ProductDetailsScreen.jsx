import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { Row, Col, Card, ListGroup, Image, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";


const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <>
      {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) :
        (
          <Row className="my-5">
            <Col md={7}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={5}>
              <ListGroup>
                <ListGroup.Item>
                  {product.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviewed`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
              <Card className="my-3">
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>${product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className="align-items-center">
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="d-grid">
                    <Button type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add To Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      }
    </>
  );
};

export default ProductDetailsScreen;