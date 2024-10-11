import React from "react";
import { Route } from "react-router-dom";
import Home from "../../components/pages/Home";
import MasterLayout from "../../components/pages/layout/MasterLayout";

const siteRoutes = () => (
  <Route path="/" element={<MasterLayout />}>
    <Route index path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
  </Route>
);

export default siteRoutes;
