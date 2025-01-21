import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";

import data from "../../assets/data";
import images from "../../assets/images";

import "./OrderDetails.styles.css";

const OrderDetails = () => {
  const { toastOptions } = data;
  const { defaultRequest } = images;

  const { id: order_id } = useParams();
  const navigate = useNavigate();

  const { authTokens } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [request, setRequet] = useState(null);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  
  // if status changed?
  const [unStatus, setUnStatus] = useState(0)

  const options = [
    { value: 0, label: "Pending" },
    { value: 1, label: "Accepted" },
    { value: 2, label: "Delivered" },
  ];

  const updateSuccessNavigateAlert = (text) =>
    toast.success(text, {
      onClose: () => navigate("/"),
      ...toastOptions,
    });
  const errorAlert = (text) => toast.error(text, toastOptions)


  useEffect(() => {
    const usefetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN_URL}/orders/${order_id}`,
          {
            headers: {
              Authorization: `Bearer ${String(authTokens.access)}`,
            },
          }
        );
        const data = response.data;
        setOrder(data);
        setRequet(data.request);
        setStatus(data.status);
        setUnStatus(data.status)
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    };

    usefetchOrderDetails();
  }, []);

  const handleStatus = (event) => {
    if (event.value < status) {
      setStatus(unStatus)
      errorAlert("Invalid option!")
      return;
    }

    setStatus(event.value);
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_DOMAIN_URL}/orders/${order_id}`,
        {
          headers: {
            Authorization: `Bearer ${String(authTokens.access)}`,
          },
        }
      );
      updateSuccessNavigateAlert("Order Completed.");
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const UpdateOrder = async () => {
    try {
      setIsLoading(true);

      if (status <= unStatus) {
        setStatus(unStatus)
        errorAlert("Invalid option!")
        return;
      }

      if (status == 2) {
        deleteOrder();
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_API_DOMAIN_URL}/orders/${order_id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${String(authTokens.access)}`,
          },
        }
      );
      updateSuccessNavigateAlert("Order Updated.");
    } catch (error) {
      setErrors(error);
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
        <main className="order-details__main fc">
          <ToastContainer />

          <h3>{request.title}</h3>
          <div className="order-details__container fc">
            <div className="order-details__img-container fc">
              {request?.image ? (
                <img src={request.image} alt={request.title} />
              ) : (
                <img src={defaultRequest} alt="default" />
              )}
            </div>
            <div className="order-details__main-texts fc">
              <div>
                <h5>Requested by</h5>
                <p>{request.user}</p>
              </div>
              <div>
                <h5>Description</h5>
                <p>{request.description}</p>
              </div>
              <div>
                <h5>Destination</h5>

                <p>
                  {request.address}, {request.city}, {request.country}
                </p>
              </div>
              <div>
                <h5>Product Price</h5>
                <p>$ {request.price}</p>
              </div>
              <div>
                <h5>Estimated profit</h5>
                <p>$ {request.estimated_profit}</p>
              </div>
              <div>
                <h5>Receiver phone number</h5>
                <p>{request.phone_number}</p>
              </div>
              <div>
                <h5>Score</h5>
                <p>{order.score}</p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <h5>Created at</h5>
                <p>{order.created_at}</p>
              </div>
              <Dropdown
                options={options}
                onChange={handleStatus}
                value={options.find((option) => option.value === status)}
                arrowClassName="drop-down-arrow"
                controlClassName="order-details__drop-down-control"
              />
              <Button
                text="Update"
                style={{
                  backgroundColor: "var(--primary-bg-color)",
                  color: "var(--white-black-text-color)",
                }}
                onClick={UpdateOrder}
              />
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default OrderDetails;
