import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import MasterLayout from "./components/layout/MasterLayout";
import Login from "./components/pages/authentication/Login";
import { useSelector } from "react-redux";

const App = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <Route path="/home" element={<MasterLayout />} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </>
        )}
        <Route
          path="*"
          exact
          element={<Navigate to={isLoggedIn ? "/home" : "/"} />}
        />
      </Routes>
    </>
  );
};

export default App;
