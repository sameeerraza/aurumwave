import Footer from "../../containers/Footer/Footer";
import Header from "../../containers/Header/Header";
import CenterText from "../../components/CenterText/CenterText";

const NotFound = () => {
  return (
    <div>
      <Header />
      <CenterText
        text="No page found."
      />
      <Footer />
    </div>
  );
};

export default NotFound;
