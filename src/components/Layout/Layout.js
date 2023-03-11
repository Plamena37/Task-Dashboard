import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
