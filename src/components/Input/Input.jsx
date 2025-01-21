import "./Input.styles.css";

const Input = ({ heading, details, ...props }) => {
  return (
    <div className="input-field fc">
      {heading && <h6>{heading}</h6>}
      <input {...props} />
      {details && <span>{details}</span>}
    </div>
  );
};

export default Input;
