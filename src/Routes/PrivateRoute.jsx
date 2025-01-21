import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );

  // <Route
  //     {...rest}
  //     element={user ? children : <Navigate to="/login" />}
  // />
};

export default PrivateRoute;
