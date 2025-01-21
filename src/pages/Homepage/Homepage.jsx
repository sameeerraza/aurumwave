import React, { useContext } from "react";

import AuthContext from "../../context/AuthContext";

import Footer from "../../containers/Footer/Footer";
import Header from "../../containers/Header/Header";

import Hero from "./Hero/Hero";
import SectionA from "./SectionA/SectionA";
import FeatureSection from "./FeatureSection/FeatureSection";
import AcceptRequestFeature from "./AcceptRequestFeature/AcceptRequestFeature";

const Homepage = () => {
  let { user } = useContext(AuthContext);

  return (
    <>
      <Header isHomepage={true} />
      <div
        style={{
          backgroundColor: "var(--primary-bg-color)",
          paddingBottom: "10rem",
        }}
      >
        <Hero />
        <SectionA />
        <FeatureSection />
        {/* <AcceptRequestFeature /> */}

      </div>
      <Footer isHomepage={true} />
    </>
  );
};

export default Homepage;
