import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {
                    purchases.map(purchase => (
                        <li key={purchase.id}>
                            {
                                purchase.cart.products.map(product => (
                                    <li>
                                        <h3>Product: {product.title}</h3>
                                        <h3>Price: $ {product.price}</h3>
                                        <h3>Purchase Date: {product.createdAt}</h3>
                                        {/* <img
                                            src={product?.productImgs[0]}
                                            className="img-fluid"
                                            alt=""
                                        />*/}
                                    </li>
                                ))
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;