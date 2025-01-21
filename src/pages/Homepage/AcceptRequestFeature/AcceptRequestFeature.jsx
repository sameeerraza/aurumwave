import Button from "../../../components/Button/Button";

import images from "../../../assets/images";

const AcceptRequestFeature = () => {
  const { acceptRequestFeature } = images;

  return (
    <section
      className="home fc"
      style={{ gap: "10em", backgroundColor: "#F3F4F6" }}
    >
      <img
        style={{ flex: "2", height: "60em", width: "40em" }}
        src={acceptRequestFeature}
        alt="RequestFeature"
      />
      <div className="home__features-headings">
        <h3 style={{ color: " var(--black-75-text-color)" }}>Accept a request</h3>
        <p style={{ textAlign: "center" }}>
          Earn money by delvering the requests of the users to the destination
          you are already going.
        </p>
        <Button
          link="/products"
          text="Accept"
          style={{
            marginTop: "1rem",
            backgroundColor: "transparent",
            color: "var(--black-text-color)",
            border: "1px solid var(--black-text-color)",
          }}
        />
      </div>
    </section>
  );
};

export default AcceptRequestFeature;
