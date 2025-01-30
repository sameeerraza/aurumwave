import React, { useState, useEffect, useContext } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Input from "../../components/Input/Input";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { LuBrainCircuit } from "react-icons/lu"; // Import the desired icon

import "./BrowseProducts.styles.css";
import Button from "../../components/Button/Button";

const Products = ({ paramsUrl }) => {
  const { authTokens, user } = useContext(AuthContext);

  const [products, setRequets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const usefetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN_URL}/products?${paramsUrl}`,
          {
            headers: {
              Authorization: `Bearer ${String(authTokens.access)}`,
            },
          }
        );
        const data = response.data;
        setRequets(data);
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    };

    usefetchAllProducts();
  }, [paramsUrl]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (

        <div className="fc products-container">
          {!products || products.length === 0 ? (
            <div style={{ margin: '10rem auto', textAlign: 'center' }}>
              <h3
              // style={{ marginBottom: "5rem" }}
              >
                No products available     </h3>
            </div>
          ) : (
            products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))
          )}
          {/* </div>



        <div className="fc products-container">
          {products &&
            products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
        </div> */}
        </div>)}
    </>
  );
};



const BrowseProducts = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [productParamsUrl, setProductParamsUrl] = useState("");
  const options = [
    { value: "", label: "None" },
    { value: "-price", label: "High to low price" },
    { value: "price", label: "Low to high price" },
    { value: "-created_at", label: "Newest" },
    { value: "created_at", label: "Oldest" },
  ];
  const [isAiSearch, setIsAiSearch] = useState(false);

  console.log(isAiSearch, "isAiSearch");


  const handleSearch = (event) => {
    setSearch(event.target.value);
    setProductParamsUrl(`?search=${event.target.value}`);

    if (sortBy != "")
      setProductParamsUrl(`search=${event.target.value}&ordering=${sortBy}&advance=${isAiSearch}`);
    else setProductParamsUrl(`search=${event.target.value}&advance=${isAiSearch}`);
  };

  const handleSortChange = (event) => {
    setSortBy(event.value);

    if (search != "")
      setProductParamsUrl(`search=${search}&ordering=${event.value}&advance=${isAiSearch}`);
    else setProductParamsUrl(`ordering=${event.value}&advance=${isAiSearch}`);
  };

  const handleAdvanceChange = () => {


    if (search != "")
      setProductParamsUrl(`search=${search}&advance=${!isAiSearch}`);
    else setProductParamsUrl(`advance=${!isAiSearch}`);
  };

  return (
    <>
      <Header />

      <main className="browse-products fc">
        <h3>Jewellery</h3>
        <div
          className="fc"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <Dropdown
            options={options}
            onChange={handleSortChange}
            value={options.find((option) => option.value === sortBy)}
            arrowClassName="browse-products-arrow"
            controlClassName="browse-products__drop-down-control asd"
          />

          <div className="fc" style={{ gap: "1rem" }}>

            <Input
              id="search"
              type="search"
              placeholder="Search"
              name="password"
              value={search}
              onChange={handleSearch}
            />

            <LuBrainCircuit
              size={30}
              onClick={() => {
                setIsAiSearch(!isAiSearch)
                handleAdvanceChange()
              }
              }
              style={{
                padding: "8px", // p-2
                borderRadius: "50%", // rounded-full
                transition: "all 0.3s ease", // transition-all duration-300
                backgroundColor: isAiSearch ? "var(--primary-bg-color)" : "transparent", // bg-blue-500 or bg-gray-200
                color: isAiSearch ? "var(--primary-bg-white-color)" : "var(--primary-bg-color)", // text-white or text-gray-700
              }}
            />
          </div>


        </div>

        <Products paramsUrl={productParamsUrl} />
      </main>

      <Footer />
    </>
  );
};

export default BrowseProducts;
