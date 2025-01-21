import "./FeatureSection.styles.css";
import images from "../../../assets/images";
import Button from "../../../components/Button/Button";

const FeatureSection = () => {
  const { requestFeatureSection } = images;

  return (
    <section className="home fc" style={{ gap: "10em" }}>
      <div className="home__features-headings">
        <h3 style={{ color: " var(--secondary-placehoder-color)" }}>AI Search</h3>
        <p style={{ color: " var(--tertiary-bg-color)", textAlign: "center" }}>
        Looking for something unique? Let us know what you're searching for, and our AI will help you find the perfect piece tailored to your desires.
        </p>
        <Button
          link="/products"
          text="Search"
          style={{
            marginTop: "1rem",
          }}
          linkStyle={{
            color: "var(--secondary-link-text-color)",
          }} 
        />
      </div>
      <img
        style={{ flex: "2", height: "60em", width: "40em" }}
        src={requestFeatureSection}
        alt="RequestFeature"
      />
    </section>
  );
};

export default FeatureSection;
