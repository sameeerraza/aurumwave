import { Link } from "react-router-dom";
import "./Button.Styles.css";

const Button = ({ link, ...props }) => {
  return (
    <button {...props} className="button">
      {link ? <Link to={link} style={props.linkStyle}>{props.text}</Link> : <>{props.text}</>}
    </button>
  );
};

export default Button;
