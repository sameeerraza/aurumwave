import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import AuthContext from "../../context/AuthContext";

import "./Order.styles.css";
import OrderCard from "../../components/OrderCard/OrderCard";

const Order = () => {
  const { authTokens, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${String(authTokens.access)}`,
            },
          }
        );
        const data = response.data;
        setOrders(data);
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div>
      <Header />
      <main className="order__container fcc">
        <h3
          style={{ marginBottom: "5rem" }}
        >
          {user.name || user.username}’s order history        </h3>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="order__orders-container fcc">
            {!orders || orders.length === 0 ? (
              <div style={{ margin: '10rem', textAlign: 'center' }}>
                <h3
                  style={{ marginBottom: "5rem" }}
                >
                  No orders available     </h3>
              </div>
            ) : (
              orders.map((order, index) => <OrderCard key={index} {...order} />)
            )}
          </div>

        )}
      </main>
      <Footer />
    </div>
  );
};

export default Order;
