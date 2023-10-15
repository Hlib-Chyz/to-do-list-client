import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./common/api/AuthAPI";
import Home from "./home";
import Login from "./login";
import NotFound from "./not-found";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!getToken()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const HomeRoute = () => {
  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
};

export const ToDoRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
