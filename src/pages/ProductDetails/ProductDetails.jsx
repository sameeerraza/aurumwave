import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";

import data from "../../assets/data";
import images from "../../assets/images";

import "./ProductDetails.styles.css";

const ProductDetails = () => {
  const { toastOptions } = data;
  const { defaultProduct } = images;

  const { id: product_id } = useParams();
  const navigate = useNavigate();

  const { authTokens } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setRequet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const updateSuccessNavigateAlert = (text) =>
    toast.success(text, {
      onClose: () => navigate("/"),
      ...toastOptions,
    });

  useEffect(() => {
    const usefetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN_URL}/products/${product_id}`,
          {
            headers: {
              Authorization: `Bearer ${String(authTokens.access)}`,
            },
          }
        );
        const data = response.data;
        setRequet(data);
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    };

    usefetchProductDetails();
  }, []);

  // const addToCart = async () => {
  //   try {
  //     setIsLoading(true);
  //     await axios.post(
  //       `${process.env.REACT_APP_API_DOMAIN_URL}/orders`,
  //       { product_id: product_id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${String(authTokens.access)}`,
  //         },
  //       }
  //     );
  //     updateSuccessNavigateAlert("Order confirmed.");

  //     // navigate("/");
  //   } catch (error) {
  //     setErrors(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <main className="product-details__main fc">
          <ToastContainer />

          <h3>{product.title}</h3>
          <div className="product-details__container fc">
            <div className="product-details__img-container fc">
              {product?.image ? (
                <img src={product.image} alt={product.title} />
              ) : (
                <img src={defaultProduct} alt="default" />
              )}
            </div>
            <div className="product-details__main-texts fc">
              <div>
                <h5>Description</h5>
                <p>{product.description}</p>
              </div>


              <div>
                <h5>Product Price</h5>
                <p>$ {product.price}</p>
              </div>


              <Button
                text="Add to cart"
                style={{
                  backgroundColor: "var(--primary-bg-color)",
                  color: "var(--white-black-text-color)",
                  marginTop: "2em",
                }}
                onClick={() => addToCart(product)}
              />
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
