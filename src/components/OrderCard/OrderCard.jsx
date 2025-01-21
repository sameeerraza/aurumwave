import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import Button from "../Button/Button";

import data from "../../assets/data";
import images from "../../assets/images";

import "./OrderCard.styles.css";

const OrderCard = ({
  id,
  title,
  image,
  requestee,
  created_at,
  score,
  status,
}) => {
  const { defaultRequest } = images;

  const [currentStatus, setStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { toastOptions } = data;
  const { authTokens } = useContext(AuthContext);

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

  const imgUrl = `${process.env.REACT_APP_DOMAIN_URL}/media/${image}`;

  const handleStatus = (event) => {
    setStatus(event.value);
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_DOMAIN_URL}/orders/${id}`,
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

      if (currentStatus == 2) {
        deleteOrder();
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_API_DOMAIN_URL}/orders/${id}`,
        { status: currentStatus },
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
    <div className="order-card fc">
      <ToastContainer />

      {image ? (
        <img src={imgUrl} alt={title} />
      ) : (
        <img src={defaultRequest} alt="default" />
      )}

      <Link to={`/orders/${id}`} className="fcc" style={{ gap: ".5rem" }}>
        <h5 style={{ marginBottom: "1rem" }}>{title}</h5>

        <div className="fc" style={{ gap: ".5rem" }}>
          <h6 style={{ fontWeight: "400" }}>Request by: </h6>
          <p>{requestee}</p>
        </div>
        <div className="fc" style={{ gap: ".5rem" }}>
          <h6 style={{ fontWeight: "400" }}>Score: </h6>
          <p>{score}</p>
        </div>
        <div className="fc" style={{ gap: ".5rem" }}>
          <p>{created_at}</p>
        </div>
      </Link>
      <div className="fcc" style={{ gap: "1rem" }}>
        <Dropdown
          options={options}
          onChange={handleStatus}
          value={options.find((option) => option.value === currentStatus)}
          arrowClassName="drop-down-arrow"
          controlClassName="order-details__drop-down-control"
        />
        <Button
          text="Update"
          style={{
            backgroundColor: "var(--primary-bg-color)",
            color: "var(--white-black-text-color)",
            padding: ".75em 2em",
          }}
          onClick={UpdateOrder}
        />
      </div>
    </div>
  );
};

export default OrderCard;
