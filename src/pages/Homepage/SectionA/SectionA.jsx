import "./SectionA.styles.css";
import images from "../../../assets/images";
import Button from "../../../components/Button/Button";

const SectionA = () => {
  const { sectionALeft, sectionARight } = images;

  return (
    <section
      className="home fc"
      style={{ backgroundColor: "#F3F4F6", gap: "2.5rem", width: "100%" }}
    >
      <img src={sectionALeft} alt="AI" />
      <div
        className="fc home__sectionA-texts"
        style={{ flexDirection: "column", gap: ".5rem" }}
      >
        <h4>Be the best you!</h4>
        <p style={{ textAlign: "center" }}>
        Discover exquisite gold pieces that highlight your individuality. Browse our exclusive collection and find your perfect match.
        </p>
        <Button
          link="/products"
          text="Shop Now"
          style={{
            color: " var(--tertiary-bg-color)",
            backgroundColor: " var(--primary-bg-color)",
            marginTop: "1rem",
          }}
        />
      </div>
      <img src={sectionARight} alt="" />
    </section>
  );
};

export default SectionA;
