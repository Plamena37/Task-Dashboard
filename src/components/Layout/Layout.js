import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
