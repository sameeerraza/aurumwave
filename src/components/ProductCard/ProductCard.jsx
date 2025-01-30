import { Link } from "react-router-dom";

import images from "../../assets/images";

import "./ProductCard.styles.css";

const ProductCard = ({ id, description, title, price, category, image }) => {
  const imgUrl = `${process.env.REACT_APP_DOMAIN_URL}${image}`;
  const { defaultProduct } = images;

  const truncateDescription = (text, maxLength = 50) => {
    const trimmedText = text.trim();
  
    if (trimmedText.length > maxLength) {
      return trimmedText.substring(0, maxLength).trim() + '... ';
    }
    return trimmedText + ' - ';
  };
  
  return (
    <Link to={`/products/${id}`} className="product-card fc">
      <div className="fcc" style={{ justifyContent: "start", width: "100%" }}>
        <h5>{title}</h5>
      </div>
      <div className="fc" style={{ justifyContent: "start", width: "100%" }}>
      <p>{truncateDescription(description)}${price}</p>
      </div>
      {image ? (
        <img src={imgUrl} alt={title} />
      ) : (
        <img src={defaultProduct} alt="default" />
      )}
      <p style={{ fontWeight: "700", marginTop: "1em" }}>
        {category}
      </p>
    </Link>
  );
};

export default ProductCard;
