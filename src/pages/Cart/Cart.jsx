import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";

import AuthContext from "../../context/AuthContext";
import Footer from "../../containers/Footer/Footer";
import Header from "../../containers/Header/Header";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";
import CenterText from "../../components/CenterText/CenterText";

import "./Cart.styles.css";
import images from "../../assets/images";
import data from "../../assets/data"


const CartPlan = () => {
  let { user, authTokens } = useContext(AuthContext);

  const { cartBG } = images
  const { toastOptions } = data;

  const [todayMeals, setTodayMeals] = useState();
  const [schedule, setSchedule] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [updateData, setUpdateData] = useState(null);
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

  useEffect(() => {
    const fetchCurrentCart = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN_URL}/cart`,
          {
            headers: {
              Authorization: `Bearer ${String(authTokens.access)}`,
            },
          }
        );
        const data = response.data;
        setTodayMeals(data.cart);
        setSchedule(data.schedule);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentCart();
  }, [updateData, authTokens.access]);

  const updateCart = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_API_DOMAIN_URL}/cart`, {},
        {
          headers: {
            Authorization: `Bearer ${String(authTokens.access)}`,
          },
        }
      );
      updateSuccessAlert("Succesfully updated")

      if (response.status === 202) updateSuccessNavigateAlert(response.data?.message)

      setUpdateData(response.data)

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

        <div className="cart">

        <CenterText text='Add a product view one' buttonText='Add' buttonURL='/products' />
        </div> 

      )}
      <ToastContainer />

      <Footer />
    </>
  );
};

export default CartPlan;
