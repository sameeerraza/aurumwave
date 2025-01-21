import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

import Input from "../../components/Input/Input";

import "./Footer.styles.css";

const Footer = ({ isHomepage }) => {
  let styles = {
    footer: {
      backgroundColor: "var(--white-75-color)",
      color: "var(--black-75-color)",
      borderTop: "0.5px solid var(--black-75-color)",
    },
    names: {
      color: "var(--black-75-color)",
    },
  };

  if (isHomepage) {
    styles = {};
  }

  return (
    <footer className="fc" style={styles?.footer}>
      <div>
        <span className="footer-comapny-name" style={styles?.names}>
          AurumWave
        </span>
        <span>Copyright © 2023 AurumWave</span> <span>All rights reserved</span>
        <div
          className="fc"
          style={{
            paddingTop: "1em",
            justifyContent: "flex-start",
            gap: "2em",
          }}
        >
          <BsFacebook size="1.25em" />
          <BsInstagram size="1.25em" />
          <BsTwitter size="1.25em" />
        </div>
      </div>
      <div>
        <h5 style={styles?.names}>Links</h5>
        <Link to="/cart">Cart</Link>
        <Link to="/products">Browse</Link>
        <Link to="/orders">History</Link>
        <Link to="/about-us">About Us</Link>
      </div>
      <div>
        <span>Lahore, Pakistan</span>
        <span>+923077424234</span>
        <span>info@aurumwave.com</span>
      </div>
      <div>
        <h5 style={styles?.names}>Get updates</h5>
        <Input
          type="search"
          placeholder="Enter email"
          name="email"
          style={{
            width: "15rem",
            backgroundColor: "var(--primary-bg-white-color)",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
