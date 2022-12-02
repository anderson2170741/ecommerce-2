import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsThunk, filterHeadlineThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    const [categoriesList, setCategoriesList] = useState([]);
    const [inputSearch, setIputSearch] = useState("");

    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategoriesList(res.data.data.categories));

    }, [])

    console.log(categoriesList);

    return (
        <div>
            <Row>
                {/*Categoria*/}
                <Col lg={3}>
                    <ListGroup>
                        {
                            categoriesList.map(category => (
                                <ListGroup.Item
                                    onClick={() => dispatch(filterProductsThunk(category.id))}
                                    style={{ cursor: "pointer" }}
                                    key={category.id}
                                >
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>

                </Col>

                {/*Products*/}
                <Col lg={9}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setIputSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(filterHeadlineThunk(inputSearch))}
                        >
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products.map(productsItem => (
                            <Col key={productsItem.id}>
                                <Card>
                                    <Link to={`/products/${productsItem.id}`} style={{ textDecoration: "none" }}>
                                        <Card.Img
                                            className="my-3"
                                            variant="top"
                                            src={productsItem.productImgs[0]}
                                            style={{ height: 200, objectFit: "contain" }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{productsItem?.title}</Card.Title>
                                            <Card.Text>
                                                <p className="text-muted">Price</p>
                                            </Card.Text>
                                            <Card.Subtitle>
                                                <h4>$ {productsItem?.price}</h4>
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

        </div>
    );
};

export default Home;