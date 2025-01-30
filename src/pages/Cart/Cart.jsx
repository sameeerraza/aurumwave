import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";

import AuthContext from "../../context/AuthContext";
import Footer from "../../containers/Footer/Footer";
import Header from "../../containers/Header/Header";
import CartContext from "../../context/CartContext";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";
import CenterText from "../../components/CenterText/CenterText";

import "./Cart.styles.css";
import images from "../../assets/images";
import data from "../../assets/data"
import OrderCard from "../../components/OrderCard/OrderCard";
import CartCard from "../../components/CartCard/CartCard";


const CartPlan = () => {
  let { user, authTokens } = useContext(AuthContext);
  const { cart, removeFromCart, clearCart } = useContext(CartContext);


  const { cartBG } = images
  const { toastOptions } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [updateErrors, setUpdateErrors] = useState(null);
  const navigate = useNavigate();

  const updateErrorAlert = (text) => toast.error(text, toastOptions)
  const updateSuccessAlert = (text) => toast.success(text, toastOptions)
  const updateSuccessNavigateAlert = (text) => toast.success(text, {
    onClose: () => navigate("/"),
    ...toastOptions
  })
  const updateErrorNavigateAlert = (text) => toast.error(text, {
    onClose: () => navigate("/"),
    ...toastOptions
  })


  const checkout = async () => {

    const cartItems = cart.map((item) => item.id);
    console.log(cartItems, "cartItems");
    

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN_URL}/orders`, {'product_ids': cartItems},
        {
          headers: {
            Authorization: `Bearer ${String(authTokens.access)}`,
          },
        }
      );
      // updateSuccessAlert("Succesfully updated")

      if (response.status === 201) navigate("/")


      clearCart()

    } catch (error) {

      if (error?.response?.status === 410) updateErrorNavigateAlert(error?.response?.data?.error)
      else {
        updateErrorAlert(error?.response?.data?.error)
        setUpdateErrors(error?.response?.data?.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoadingSpinner />
      ) : (

        cart?.length === 0 ? (

          <div className="cart">

            <CenterText text='Add a product view one' buttonText='Add' buttonURL='/products' />
          </div>) : (
          <div className="cart fcc">

            <h2>Cart</h2>

            <div className="cart__items fcc">
              {cart.map((item) => (
                <CartCard product={item} />
              ))}
            </div>

            <div className="cart__actions fc">
              <Button text="Clear Cart" onClick={clearCart} style={{
                backgroundColor: "transparent",
                border: "1px solid  var(--secondary-placehoder-color)",
                color: "var(--secondary-bg-color)",
              }} />
              <Button text="Checkout" onClick={checkout} />
            </div>
          </div>)


      )}
      <ToastContainer />

      <Footer />
    </>
  );
};

export default CartPlan;
