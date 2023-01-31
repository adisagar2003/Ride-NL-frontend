import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProtectedRouteForNotLogged from "./Pages/ProtectedRoute";
import SignIn from "./Pages/SignIn";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<HomePage />} />

        <Route
          path="/signIn"
          element={
            <ProtectedRouteForNotLogged>
              <SignIn />{" "}
            </ProtectedRouteForNotLogged>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
