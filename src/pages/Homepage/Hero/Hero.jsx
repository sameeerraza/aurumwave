import Button from "../../../components/Button/Button";

import images from "../../../assets/images";

import "./Hero.styles.css";

const Hero = () => {
  const { heroVector, heroFirst, heroSecond, heroThird } = images;

  return (
    <section className="home fc">
      <div className="hero__texts">
        <h2>A Collection of Gold, Curated Just for You</h2>
        <p style={{ color: " var(--tertiary-bg-color)" }}>
          Discover the elegance and allure of gold with AurumWave. Our platform offers a unique shopping experience where you can explore a diverse range of gold products, from stunning jewelry pieces to investment-grade bullion, all with just a few clicks.
        </p>
        <div className="fc hero__buttons">
          <Button text="Get Started" link={"/products"} linkStyle={{
            color: "var(--secondary-link-text-color)",
          }} />
          {/* <Button
            link={"/products"}
            text="Visit Shops"
            style={{
              backgroundColor: "transparent",
              border: "1px solid  var(--secondary-placehoder-color)",
              color: "var(--secondary-bg-color)",
            }}
          /> */}
        </div>
      </div>
      <div className="home__hero-imgs fc">
        <img src={heroVector} alt="" />
        <img src={heroFirst} alt="" />
        <img src={heroSecond} alt="" />
        <img src={heroThird} alt="" />
      </div>
    </section>
  );
};

export default Hero;
