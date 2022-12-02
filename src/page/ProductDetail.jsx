import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../../../../ecommerce/src/store/slices/products.slice";


const ProductDetail = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);

    const productsList = useSelector(state => state.products);

    const productsId = productsList.find(productsItem => productsItem.id === Number(id));
    const relatedProducts = productsList.filter(productsItem =>
        productsItem.category.id === productsId.category.id &&
        productsItem.id !== productsId.id

    )

    console.log(relatedProducts);

    return (
        <div>
            <Row>
                {/*img del product*/}
                <Col lg={9}>

                    <img
                        src={productsId?.productImgs[0]}
                        className="img-fluid"
                        alt="" />
                    <Row xs={3} md={3} lg={3}>
                        <Col>
                            <Card.Img
                                className="my-3"
                                variant="top"
                                src={productsId?.productImgs[0]}
                                style={{ height: 100, objectFit: "contain", cursor: "pointer" }}
                            />
                        </Col>
                        <Col>
                            <Card.Img
                                className="my-3"
                                variant="top"
                                src={productsId?.productImgs[1]}
                                style={{ height: 100, objectFit: "contain", cursor: "pointer" }}
                            />
                        </Col>
                        <Col>
                            <Card.Img
                                className="my-3"
                                variant="top"
                                src={productsId?.productImgs[2]}
                                style={{ height: 100, objectFit: "contain", cursor: "pointer" }}
                            />
                        </Col>

                    </Row>

                </Col>

                {/*description of product*/}
                <Col lg={3}>
                    <h1>{productsId?.title}</h1>
                    <p>{productsId?.description}</p>
                    <Card style={{ borderStyle: "none" }}>
                        <Row>
                            <Col>
                                <Card.Text>
                                    <p className="text-muted">Price</p>
                                    <h4>$ {productsId?.price}</h4>
                                </Card.Text>
                            </Col>

                            <Col>
                                <Card.Text>
                                    <p className="text-muted">Quantity</p>

                                </Card.Text>
                            </Col>
                        </Row>

                    </Card>
                </Col>

                {/*relate article*/}

                <Card.Text>
                    <h3>Related Article </h3>
                </Card.Text>
                <Row xs={1} md={2} lg={3} className="g-4">

                    {relatedProducts.map(productsItem => (
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
                                            <h4>$ {productsItem?.price}</h4>
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Row>

        </div>
    )
};

export default ProductDetail;