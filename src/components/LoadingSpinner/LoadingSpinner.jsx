import { MutatingDots } from "react-loader-spinner";

import "./LoadingSpinner.styles.css";

const LoadingSpinner = () => {
  return (
    <div
      className="loading-spinner__container fc"
      // style={{ padding: "150rem 0" }}
    >
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="var(--secondary-bg-color)"
        secondaryColor="var(--primary-bg-color)"
        radius="8"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass="mutating-dots-wrapper"
      />
    </div>
  );
};

export default LoadingSpinner;
