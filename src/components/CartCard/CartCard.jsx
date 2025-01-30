import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";


import AuthContext from "../../context/AuthContext";
import Button from "../Button/Button";

import data from "../../assets/data";
import images from "../../assets/images";

import "./CartCard.styles.css";
import CartContext from "../../context/CartContext";

const CartCard = ({
    product }
) => {

    console.log(product, "product");


    const { defaultRequest } = images;
    const { removeFromCart, addToCart, minusFromCart } = useContext(CartContext);



    return (
        <div className="cart-card fc">
            <ToastContainer />

            {product.image ? (
                <img src={product.image} alt={product.title} />
            ) : (
                <img src={defaultRequest} alt="default" />
            )}

            <Link to={`/products/${product.id}`} className="fcc" style={{ gap: ".5rem" }}>
                <h5 style={{ marginBottom: "1rem" }}>{product.title}</h5>

                <div className="fc" style={{ gap: ".5rem" }}>
                    <p>Quantity: {product.quantity}</p>
                </div>
            </Link>
            <RiSubtractFill style={{
                color: "var(--primary-bg-color)",

            }}
                onClick={() => minusFromCart(product)}

            />
            <MdDeleteOutline
                size={25}
                style={{
                    color: "var(--primary-bg-color)"
                }}
                onClick={() => removeFromCart(product.id)}
            />
            <IoMdAdd style={{
                color: "var(--primary-bg-color)"
            }}

                onClick={() => addToCart(product)}

            />
        </div>
    );
};

export default CartCard;
