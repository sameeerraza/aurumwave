import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import PrivateRoute from "./Routes/PrivateRoute";
import OrderPrivateRoute from "./Routes/OrderPrivateRoute";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BrowseProducts from "./pages/BrowseProducts/BrowseProducts";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Account from "./pages/Account/Account";
import NotFound from "./pages/NotFound/NotFound";
import Order from "./pages/Order/Order";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import AboutUs from "./pages/AboutUs/AboutUs";

import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route exact path="/orders" element={<OrderPrivateRoute />}>
                <Route exact path="" element={<Order />} />
                <Route exact path="/orders/:id" element={<OrderDetails />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="" element={<Homepage />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/account" element={<Account />} />
                <Route path="/products">
                  <Route path="" element={<BrowseProducts />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                </Route>
                <Route exact path="/about-us" element={<AboutUs />} />
              </Route>
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/register" />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
