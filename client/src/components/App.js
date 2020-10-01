import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
import Header from "./Header";
import Footer from "./Footer";

import HomeScreen from "../screens/HomeScreen";
import SelectShapeScreen from "../screens/SelectShapeScreen";
import ShapeScreen from "../screens/ShapeScreen";
import ContactScreen from "../screens/ContactScreen";
import SigninScreen from "../screens/SigninScreen";
import UsersListsScreen from "../screens/UsersListsScreen";
import UserCreateScreen from "../screens/UserCreateScreen";
import UserEditScreen from "../screens/UserEditScreen";
import ShapeCreateScreen from "../screens/ShapeCreateScreen";
import ShapeUpdateScreen from "../screens/ShapeUpdateScreen";
import MapScreen from "../screens/MapScreen";
import ShapeListScreen from "../screens/ShapeListScreen";
import MapPolicyScreen from "../screens/MapPolicyScreen";

import { Context as SessionContext } from "../context/SessionContext";
import AlertDialog from "./AlertDialog";

const App = () => {
  const [showAlert, setShowAlert] = useState(false);

  const currentPath = useLocation();

  const { profile, token } = localStorage.getItem("session")
    ? JSON.parse(localStorage.getItem("session"))
    : "";

  function checkSessionToken() {
    if (token) {
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            localStorage.removeItem("session");
            setShowAlert(true);
          }
        }
      });
    }
  }

  useEffect(() => {
    checkSessionToken();
  }, [currentPath]);

  return (
    <div className="app-container">
      <div className="container-fluid">
        <div>
          {showAlert ? (
            <AlertDialog
              message="Debe volver a iniciar sesión"
              title="Sesión expirada"
            />
          ) : null}
          <Header />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/contact" exact component={ContactScreen} />
          <Route path="/map" exact component={MapScreen} />
          <Route path="/shapes" exact component={SelectShapeScreen} />
          <Route path="/shapes/list" exact component={ShapeScreen} />
          <Route path="/map/policy" exact component={MapPolicyScreen} />
          <Route
            path="/signin"
            exact
            render={() =>
              localStorage.getItem("session") ? (
                <Redirect to="/" />
              ) : (
                <SigninScreen />
              )
            }
          />

          {profile === "ADMINISTRADOR" || profile === "EDITOR" ? (
            <div>
              {profile === "ADMINISTRADOR" ? (
                <div>
                  <Route
                    path="/admin/users/list"
                    exact
                    component={UsersListsScreen}
                  />
                  <Route
                    path="/admin/users/create"
                    exact
                    component={UserCreateScreen}
                  />
                  <Route
                    path="/admin/users/update"
                    exact
                    component={UserEditScreen}
                  />
                  <Route
                    path="/admin/shapes/create"
                    exact
                    component={ShapeCreateScreen}
                  />
                </div>
              ) : (
                <Redirect to="/" />
              )}
              <Route
                path="/admin/shapes/list"
                exact
                component={ShapeListScreen}
              />
              <Route
                path="/admin/shape/update"
                exact
                component={ShapeUpdateScreen}
              />
            </div>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      </div>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
