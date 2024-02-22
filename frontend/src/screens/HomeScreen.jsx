import React from 'react';
import { Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber = 1, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
  return (
    <>
      {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) :
        (
          <>
            {!keyword ? (
              <ProductCarousel />
            ) : (
              <Link to='/' className='btn btn-primary my-4'>
                Go Back
              </Link>
            )}
            <h1 className='mt-5'>Latest Products</h1>
            <Row>
              {data.products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductItem product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={data?.pages} page={pageNumber} keyword={keyword ? keyword : ""} />
          </>
        )
      }
    </>
  );
};

export default HomeScreen;