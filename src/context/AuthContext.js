import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import ServerDown from "../pages/ServerDown/ServerDown";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [loginErrors, setLoginErrors] = useState(null);
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      }
    );
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens({ access: data.access, refresh: data.refresh });
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      setLoginErrors(data.errors);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let updateToken = async (refresh) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_DOMAIN_URL}/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: authTokens?.refresh }),
        }
      );

      let data = await response.json();

      if (refresh) setAuthTokens({ ...authTokens, refresh });

      if (response.status === 200 || response.data === "token_not_valid") {
        setAuthTokens({ ...authTokens, access: data.access });
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(authTokens));

        if (loading) {
          setLoading(false);
        }
      } else {
        logoutUser();
      }
    } catch (error) {
      setErrors(error)
      setLoading(false);

      // logoutUser();
    }
  };

  let contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    loginErrors,
  };

  useEffect(() => {
    if (loading) {
      const refresh = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

      updateToken(refresh);
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken(null);
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {errors ? <ServerDown loading={loading} /> : children}
      {/* {loading ? null : children} */}
    </AuthContext.Provider>
  );
};
