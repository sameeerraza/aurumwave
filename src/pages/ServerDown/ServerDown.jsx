import images from "../../assets/images";

import "./ServerDown.styles.css";

const ServerDown = () => {
  const { serverDown } = images;

  return (
    <div className="server-down__container fc">
      <h3 style={{ padding: "2.5rem" }}>Server is down</h3>
      <div className="server-down__line"></div>
      <div className="fcc">
        <img src={serverDown} className="server-down__image" alt="" />
        <h5>Unavailabe at the time</h5>
      </div>
    </div>
  );
};

export default ServerDown;
