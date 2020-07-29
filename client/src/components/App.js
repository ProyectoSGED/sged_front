import React from "react";
import { Route, Redirect } from "react-router-dom";
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

const App = () => {
  return (
    <div className="app-container">
      <div className="container-fluid">
        <div>
          <Header />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/shapes" exact component={SelectShapeScreen} />
          <Route path="/shapes/list" exact component={ShapeScreen} />
          <Route path="/contact" exact component={ContactScreen} />
          <Route
            path="/signin"
            exact
            render={() =>
              localStorage.getItem("user") ? (
                <Redirect to="/" />
              ) : (
                <SigninScreen />
              )
            }
          />
          <Route path="/admin/users/list" exact component={UsersListsScreen} />
          <Route
            path="/admin/users/create"
            exact
            component={UserCreateScreen}
          />
          <Route path="/admin/users/update" exact component={UserEditScreen} />
          <Route
            path="/admin/shapes/create"
            exact
            component={ShapeCreateScreen}
          />
        </div>
      </div>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
